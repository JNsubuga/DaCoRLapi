<?php

use App\Http\Controllers\api\AccountController;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\MemberController;
use App\Http\Controllers\api\TransactionController;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\EventsController;
use App\Http\Controllers\api\GendersController;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/users', UserController::class);

    Route::prefix('/accounts')->group(function () {
        //List Accounts
        Route::get('/', [AccountController::class, 'index']);
        Route::post('/', [AccountController::class, 'store']);
        Route::get('/{id}', [AccountController::class, 'show'])->where('id', '[0-9]+');
        Route::get('/accountMembers/{id}', [AccountController::class, 'accountMembers'])->where('id', '[0-9]+');
        Route::put('/{id}', [AccountController::class, 'update'])->where('id', '[0-9]+');
        Route::delete('/{id}', [AccountController::class, 'destroy'])->where('id', '[0-9]+');
    });

    Route::prefix('/members')->group(function () {
        //List Members
        Route::get('/', [MemberController::class, 'index']);
        Route::post('/', [MemberController::class, 'store']);
        Route::get('/{id}', [MemberController::class, 'show'])->where('id', '[0-9]+');
        Route::get('/memberTransactionDetails/{id}', [MemberController::class, 'memberTransactionDetails'])->where('id', '[0-9]+');
        Route::get('/memberAccounts/{id}', [MemberController::class, 'memberAccounts'])->where('id', '[0-9]+');
        Route::get('/memberAccountDetails/{member_id?}/{account_id?}', [MemberController::class, 'memberAccountDetails'])->where(['member_id' => '[0-9]+'], ['account_id' => '[0-9]+']);

        Route::put('/{id}', [MemberController::class, 'update']);
        Route::delete('/{id}', [MemberController::class, 'destroy']);
    });

    Route::prefix('/transactions')->group(function () {
        //List Transactions
        Route::get('/', [TransactionController::class, 'index']);
        Route::post('/', [TransactionController::class, 'store']);
        Route::get('/{id}', [TransactionController::class, 'show'])->where('id', '[0-9]+');
        Route::put('/{id}', [TransactionController::class, 'update'])->where('id', '[0-9]+');
        Route::delete('/{id}', [TransactionController::class, 'destroy'])->where('id', '[0-9]+');
    });

    Route::get('/events', [EventsController::class, 'index']);
    // Route::apiResource('/events', EventsController::class);
    Route::get('/genders', [GendersController::class, 'index']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
