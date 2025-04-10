<?php

namespace App\Http\Controllers;

use App\Http\Resources\UsuarioCollection;
use Illuminate\Http\Request;
use App\Services\UsuarioService;
use Illuminate\Http\JsonResponse;

class UsuarioController extends Controller
{
    public function __construct(
        protected UsuarioService $usuarioService
    )
    {}

    public function index(Request $request):JsonResponse
    {
        if($request->all()){
            return response()->json([
                'usuarios'=> new UsuarioCollection($this->usuarioService->buscaTodosComPesquisa($request->all()))
            ], 200);
        }

        return response()->json([
            'usuarios'=> new UsuarioCollection($this->usuarioService->buscaTodos())
        ], 200);

        return response()->json('receba');
    }
}
