import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
// import types removed for JS

export default ({ children, breadcrumbs, ...props }) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
    </AppLayoutTemplate>
);
