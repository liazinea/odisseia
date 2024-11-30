<?php

namespace App\Http\Controllers;

use App\Http\Resources\AutorCollection;
use App\Services\AutorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AutorController extends Controller
{
    public function __construct(
        protected AutorService $autorService,
    )
    {}

    public function index(Request $request):JsonResponse
    {
        $param = $request->input('autor');
        if($param){
            return response()->json([
                'autores' => new AutorCollection($this->autorService->buscaComPesquisa($param)),
            ], 200);
        }
        return response()->json([
            'autores' => new AutorCollection($this->autorService->buscarTodos()),
        ], 200);
      
    }
}
