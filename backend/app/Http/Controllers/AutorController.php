<?php

namespace App\Http\Controllers;

use App\DTOs\AutorDTO;
use App\Http\Requests\CriaAutorRequest;
use App\Http\Resources\AutorCollection;
use App\Models\Autor;
use App\Services\AutorService;
use Exception;
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

    public function nomes():JsonResponse
    {
        return response()->json(Autor::where('aut_status_ativo', '=', 1)->pluck('aut_nome'), 200);
    }

    public function store(CriaAutorRequest $request):JsonResponse
    {
        $autor = $request->validated();
        $autorDTO = new AutorDTO(
            nome: $autor['aut_nome']
        );
        $autorCadastrado = $this->autorService->salvar($autorDTO);

        return response()->json([
            'message'=> 'Autor adicionado com sucesso',
        ], 200);
    }

    public function delete(Autor $autor):JsonResponse
    {
        try{
            $this->autorService->deletar($autor);

            return response()->json([
                'message'=>'Autor deletado com sucesso'
            ], 200);
        }catch(Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ], 400);
        }
    }

     public function update(Autor $autor, CriaAutorRequest $request):JsonResponse
    {
        try{
            $this->autorService->atualizar($autor, new AutorDTO($request->validated('aut_nome')));
            return response()->json([
                'message' =>'Autor atualizado com sucesso.'
            ], 200);
        }catch(Exception $e){
            return response()->json([
                'message'=> $e->getMessage()
            ], 400);
        }
    }
}
