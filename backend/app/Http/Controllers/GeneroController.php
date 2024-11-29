<?php

namespace App\Http\Controllers;

use App\Http\Resources\GeneroCollection;
use App\Services\GeneroService;
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
}
