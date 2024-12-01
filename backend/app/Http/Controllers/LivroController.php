<?php

namespace App\Http\Controllers;

use App\DTOs\LivroDTO;
use App\Http\Requests\CreateLivroRequest;
use App\Http\Resources\LivroCollection;
use App\Http\Resources\LivroResource;
use App\Services\AutorService;
use App\Services\EditoraService;
use App\Services\GeneroService;
use App\Services\LivroService;
use Exception;
use Illuminate\Http\JsonResponse;

class LivroController extends Controller
{
    public function __construct(
        protected LivroService $livroService,
        protected EditoraService $editoraService,
        protected GeneroService $generoService,
        protected AutorService $autorService,
    )
    {}
    public function index()
    {
        return response()->json([
            'livros' => new LivroCollection($this->livroService->buscarTodos()), 
        ], 200);
    }
    public function store(CreateLivroRequest $request)
    {
        try {
            $data = $request->validated();
            
            if($request->hasFile('liv_capa')){
                $capa = $this->livroService->salvarCapa($data['liv_capa']);
                $data['liv_capa'] = $capa;
            }
            $autores = $this->autorService->buscaPorVariosNomesOuCadastra($data['liv_autores']);
            $generos = $this->generoService->buscaPorVariosNomesOuCadastra($data['liv_generos']);
            $editora = $this->editoraService->buscaPeloNomeOuCadastra($data['liv_editora']);
            
            $livroDTO = new LivroDTO(
                isbn: $data['liv_isbn'],
                numRegistro: $data['liv_numRegistro'],
                titulo: $data['liv_nome'],
                numPaginas: $data['liv_qtdPaginas'],
                dataPubli: $data['liv_dataPubli'],
                edicao: $data['liv_edicao'],
                editoraId: $editora->edi_id,
                classIndicativa: $data['liv_classIndicativa'],
                localizacao: $data['liv_localizacao'],
                sinopse: $data['liv_sinopse'],
                capa: $data['liv_capa'],
                autores: $autores,
                generos: $generos
            );
            
            $livro = $this->livroService->salvarLivro($livroDTO);
            $livro->load(['editora', 'autores', 'generos']);

            return response()->json([
                'message'=> 'Livro adicionado com sucesso',
                'livro' => new LivroResource($livro),
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }
}
