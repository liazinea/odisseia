<?php

namespace App\Http\Controllers;

use App\DTOs\GeneroDTO;
use App\Http\Requests\GeneroRequest;
use App\Http\Resources\GeneroCollection;
use App\Http\Resources\GeneroResource;
use App\Models\Genero;
use App\Services\GeneroService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GeneroController extends Controller
{
    public function __construct(
        protected GeneroService $generoService,
    )
    {}

    public function index(Request $request)
    {
        $param = $request->input('genero');
        if($param){
            return response()->json([
                'generos' => new GeneroCollection($this->generoService->buscaComNome($param))
            ], 200);
        }
        return response()->json([
            'generos' => new GeneroCollection($this->generoService->buscarTodos())
        ], 200);
    }

    public function show(Genero $genero):JsonResponse
    {
        if($genero->gen_status_ativo == 1){
            return response()->json([
                'genero'=> new GeneroResource($genero),
            ], 200);
        }
        return response()->json([
            'message'=> 'Erro ao buscar gênero',
        ], 200);
    }

    public function store(GeneroRequest $request):JsonResponse
    {
        $genero = $this->generoService->salvar(new GeneroDTO($request->validated('gen_nome'), 1));
    }
}
