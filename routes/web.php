<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
/*
Route::get('/', function () {
    return view('index');
});
*/

Route::get('/', 'App\Http\Controllers\HomeController@index')->name('index');
Route::post('/', 'App\Http\Controllers\HomeController@store');





Route::get('clear/cache-clear', function () {
    Log::debug('Artisan cache:clear: DONE');
   Artisan::call('cache:clear');
});

Route::get('clear/optimize', function () {
    Log::debug('Artisan optimize: DONE');
   Artisan::call('optimize');
});

Route::get('clear/view-clear', function () {
    Log::debug('Artisan view:clear: DONE');
   Artisan::call('view:clear');
});





Route::get('clear/route-clear', function () {
    Log::debug('Artisan route:clear: DONE');
   Artisan::call('route:clear');
});

Route::get('clear/route-cache', function () {
    Log::debug('Artisan route:cache: DONE');
   Artisan::call('route:cache');
});





Route::get('clear/config-clear', function () {
    Log::debug('Artisan config:clear: DONE');
   Artisan::call('config:clear');
});

Route::get('clear/config-cache', function () {
    Log::debug('Artisan config:cache: DONE');
   Artisan::call('config:cache');
});





Route::get('clear', function () {
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('config:cache');
    Artisan::call('view:clear');
    Artisan::call('route:clear');
    Artisan::call('route:cache');
});

Route::get('clear/key-generate', function () {
    Log::debug('Artisan key:generate: DONE');
   Artisan::call('key:generate');
});


Auth::routes();
Route::get('/auth', [App\Http\Controllers\AuthController::class, 'index'])->name('auth');
