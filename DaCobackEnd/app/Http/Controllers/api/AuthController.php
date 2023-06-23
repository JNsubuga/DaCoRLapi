<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * 
     * @var \App\Models\User @user 
     * */
    public function Signup(SignupRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'token' => $token,
            'user' => $user
        ]);
    }
    /**
     * 
     * @var \App\Models\User @user 
     * 
     * */
    public function Login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'The Provided email or password is incorrect!!'
            ], 422);
        }

        /**@var User @user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function Logout(Request $request)
    {
        /**@var User @user */
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response('', 204);
    }
}
