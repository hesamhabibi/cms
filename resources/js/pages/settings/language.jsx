import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useTranslation } from 'react-i18next';

export default function LanguageSettings() {
    // Use i18n
    const { t, i18n } = useTranslation('common');

    // Current locale from i18n shared props
    const currentLocale = i18n.language || 'en';

    const processing = false;

    const breadcrumbs = [
        { title: t('language'), href: '/settings/language' },
    ];

    const handleLocaleChange = (newLocale) => {
        if (!newLocale || newLocale === currentLocale) return;
        const form = document.getElementById('locale-form');
        if (form) {
            form.setAttribute('action', route('locale.set', { locale: newLocale }));
            form.submit();
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('language')} />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title={t('language')}
                        description={t('language')}
                    />

                    <div className="grid gap-4">
                        <ToggleGroup
                            type="single"
                            value={currentLocale}
                            onValueChange={handleLocaleChange}
                            className="rtl:flex-row-reverse"
                        >
                            <ToggleGroupItem value="en" disabled={processing}>
                                English (LTR)
                            </ToggleGroupItem>
                            <ToggleGroupItem value="fa" disabled={processing}>
                                فارسی (RTL)
                            </ToggleGroupItem>
                        </ToggleGroup>

                        <div className="text-sm text-muted-foreground">
                            {currentLocale === 'fa'
                                ? 'جهت صفحه و تایپوگرافی بر اساس زبان فارسی به حالت راست‌به‌چپ تنظیم می‌شود.'
                                : 'Page direction and typography follow left-to-right for English.'}
                        </div>

                        {/* Hidden form is defined in resources/views/app.blade.php */}
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}


