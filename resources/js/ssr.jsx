import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import { route } from 'ziggy-js';
import { initI18n } from './i18n';
import './lib/i18n-bridge';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => (title ? `${title} - ${appName}` : appName),
        resolve: (name) => resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
        setup: ({ App, props }) => {
            // Initialize i18n for SSR using shared props
            type InitialPageProps = { initialPage: { props: { __I18N__?: Record<string, unknown>; locale?: string } } };
            const shared = props && props.initialPage && props.initialPage.props ? props.initialPage.props : {};
            void initI18n(shared.__I18N__ || undefined, shared.locale || 'en');
            /* eslint-disable */
            // @ts-expect-error
            global.route = (name, params, absolute) =>
                route(name, params, absolute, {
                    // @ts-expect-error
                    ...page.props.ziggy,
                    // @ts-expect-error
                    location: new URL(page.props.ziggy.location),
                });
            /* eslint-enable */

            return <App {...props} />;
        },
    }),
);
