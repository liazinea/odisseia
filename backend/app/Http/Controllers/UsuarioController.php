<?php

namespace App\Http\Controllers;

use App\DTOs\UsuarioDTO;
use App\Http\Requests\UsuarioRequest;
use App\Http\Resources\UsuarioCollection;
use App\Http\Resources\UsuarioResource;
use App\Models\Usuario;
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
    }

    public function show(Usuario $usuario): JsonResponse
    {
        if($usuario->usu_status == 1){
            return response()->json([
                'usuario' => new UsuarioResource($usuario),
            ], 200);
        }
        return response()->json([
            'message'=> 'Usuário não encontrado ou desativado'
        ], 400);
    }

    public function store(UsuarioRequest $request): JsonResponse
    {
        try{
            $usuarioDTO = new UsuarioDTO(
                $request->validated('usu_nome'),
                $request->validated('usu_dataNasc'),
                $request->validated('email'),
                $request->validated('password'),
                $request->validated('usu_nivel'),
                $request->validated('usu_ra'),
                $request->validated('usu_status'),
            );

            return response()->json([
                'message'=>'Usuário criado com sucesso',
                'usuario'=> new UsuarioResource($this->usuarioService->salvar($usuarioDTO)),
            ], 201);
        }
        catch(\Exception $e){
            return response()->json([
                'message'=> $e->getMessage(),
            ], 400);
        }
    }
}
