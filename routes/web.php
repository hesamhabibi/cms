<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// Language switcher - sets a cookie and redirects back
Route::post('/locale/{locale}', function (string $locale) {
    abort_unless(in_array($locale, ['en', 'fa'], true), 404);

    return back()->withCookie(cookie('locale', $locale, 60 * 24 * 365)); // 1 year
})->name('locale.set');
