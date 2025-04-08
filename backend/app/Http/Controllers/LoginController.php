<?php

namespace App\Http\Controllers;

use App\DTOs\LoginDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Exception;
use Illuminate\Http\JsonResponse;
use App\Services\LoginService;
use Illuminate\Http\Request;

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
                    ),
                'usuario' => Auth::user()    
            ],200);
       } catch(Exception $e){
            return response()->json([
                'message'=>$e->getMessage(),
            ], 400);
       }
    }

    public function logout(Request $request):JsonResponse
    {
        $this->loginService->logout($request->user());

        return response()->json([
            'message'=>'Logout feito com sucesso'
        ], 200);
    }
}
