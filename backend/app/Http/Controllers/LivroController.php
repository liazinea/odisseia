<?php

namespace App\Http\Controllers;

use App\DTOs\LivroDTO;
use App\Http\Requests\LivroRequest;
use App\Http\Resources\LivroCollection;
use App\Http\Resources\LivroResource;
use App\Models\Livro;
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
    ) {}

    public function index(): JsonResponse
    {
        return response()->json([
            'livros' => new LivroCollection($this->livroService->buscarTodos()),
        ], 200);
    }

    public function livrosPorGenero(): JsonResponse
    {
        return response()->json([
            'livros' => $this->livroService->buscaLivrosPorGenero(),
            'message' => 'ai'
        ]);
    }

    public function store(LivroRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();

            if ($request->hasFile('liv_capa')) {
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
                statusAtivo: 1,
                autores: $autores,
                generos: $generos
            );

            $livro = $this->livroService->salvarLivro($livroDTO);
            $livro->load(['editora', 'autores', 'generos']);

            return response()->json([
                'message' => 'Livro adicionado com sucesso',
                'livro' => new LivroResource($livro),
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }

    public function show(Livro $livro): JsonResponse
    {
        $livro = $this->livroService->retorna($livro);
        return response()->json([
            'livro' => new LivroResource($livro),
        ], 200);
    }

    public function delete(Livro $livro): JsonResponse
    {
        try {
            $this->livroService->deletar($livro);
            return response()->json([
                'mensagm' => 'Livro deletado com sucesso!!'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }
    public function update(Livro $livro, LivroRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();

            if ($request->hasFile('liv_capa')) {
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
                statusAtivo: 1,
                autores: $autores,
                generos: $generos
            );

            $livroAtualizado = $this->livroService->atualizar($livroDTO, $livro);
            $livroAtualizado = $this->livroService->retorna($livro);

            return response()->json([
                'message' => 'Livro atualizado com sucesso',
                'livro' => new LivroResource($livroAtualizado),
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
    }

    public function livrosMaisEmprestados(): JsonResponse
    {
        try {
            $livros = $this->livroService->livrosMaisEmprestados(3);

            return response()->json([
                'livros' => LivroResource::collection($livros),
                'message' => 'Lista dos livros mais emprestados',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'status' => 500,
            ], 500);
        }
    }

    public function quantidadePorNome(string $nome): JsonResponse
    {
        try {
            $quantidade = $this->livroService->quantidadeLivro($nome);

            return response()->json([
                'quantidade' => $quantidade,
                'nome' => $nome,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'status' => 500,
            ], 500);
        }
    }
}
