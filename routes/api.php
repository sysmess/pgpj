<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\v1\RegionsController;
use App\Http\Controllers\Api\v1\RegionsDataController;

use App\Http\Controllers\Api\v1\MunicController;
use App\Http\Controllers\Api\v1\MunicDataController;
use App\Http\Controllers\Api\v1\ClassesController;
use App\Http\Controllers\Api\v1\StypesController;
use App\Http\Controllers\Api\v1\OpjController;
use App\Http\Controllers\Api\v1\PopulationController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::resource('regions', RegionsController::class);
Route::resource('regionsdata', RegionsDataController::class);

Route::resource('munic', MunicController::class);
Route::resource('municdata', MunicDataController::class);
Route::resource('classes', ClassesController::class);
Route::resource('stypes', StypesController::class);
Route::resource('opj2019', OpjController::class);
Route::resource('population', PopulationController::class);
