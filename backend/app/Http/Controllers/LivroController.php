<?php

namespace App\Http\Controllers;

use App\DTOs\LivroDTO;
use App\Http\Requests\CreateLivroRequest;
use App\Http\Resources\LivroResource;
use App\Services\LivroService;
use Exception;

class LivroController extends Controller
{
    public function __construct(
        protected LivroService $livroService,
    )
    {}
    public function store(CreateLivroRequest $request)
    {
        try {
            $data = $request->validated();

            if($request->hasFile('liv_capa')){
                $capa = $this->livroService->salvarCapa($request->input('liv_capa'));
                $data['liv_capa'] = $capa;
            }

            $livroDTO = new LivroDTO(
                isbn: $data['liv_isbn'],
                numRegistro: $data['liv_numRegistro'],
                titulo: $data['liv_nome'],
                numPaginas: $data['liv_qtdPaginas'],
                dataPubli: $data['liv_dataPublicacao'],
                edicao: $data['liv_edicao'],
                editoraId: $data['edi_id'],
                classificacaoIndicativa: $data['liv_classificacaoIndicativa'],
                localizacao: $data['liv_localizacao'],
                sinopse: $data['liv_sinopse'],
                capa: $data['liv_capa'],
                autores: $data['liv_autores'],
                generos: $data['liv_generos']
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
