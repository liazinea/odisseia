<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\JsonResponse;
use Auth;
use Illuminate\Http\Request;
use App\Services\LoginService;

class LoginController extends Controller
{
    public function __construct(
        protected LoginService $loginService,
    ){}
    public function autenticar(LoginRequest $request):JsonResponse
    {
       try{
            return response()->json([
                'token'=> $this->loginService->login(
                    new LoginDTO(
                        email: $request->validated('email'),
                        password: $request->validated('password')
                    )
                )
            ],200);
       } catch(Exception $e){
            return response()->json([
                'message'=>$e->getMessage(),
            ], 400);
       }
    }
}
