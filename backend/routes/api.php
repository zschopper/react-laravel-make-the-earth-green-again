<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('activities', [\App\Http\Controllers\ActivityController::class, 'index']);
Route::get('entries', [\App\Http\Controllers\EntryController::class, 'index']);
Route::get('entries/{class}', [\App\Http\Controllers\EntryController::class, 'showClass']);
Route::post('entries', [\App\Http\Controllers\EntryController::class, 'store']);
