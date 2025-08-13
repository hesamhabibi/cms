<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class HandleLocale
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Determine locale from cookie or fallback to config
        $supported = ['en', 'fa'];
        $cookieLocale = $request->cookie('locale');
        $locale = in_array($cookieLocale, $supported, true) ? $cookieLocale : config('app.locale', 'en');

        App::setLocale($locale);

        return $next($request);
    }
}


