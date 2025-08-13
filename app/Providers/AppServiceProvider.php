<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Share i18n resources with the frontend
        Inertia::share('__I18N__', function () {
            $en = require base_path('lang/en/common.php');
            $fa = require base_path('lang/fa/common.php');

            return [
                'en' => ['common' => $en],
                'fa' => ['common' => $fa],
            ];
        });
    }
}
