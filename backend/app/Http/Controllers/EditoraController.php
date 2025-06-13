<?php

namespace App\Http\Controllers;

use App\DTOs\EditoraDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\EditoraRequest;
use App\Http\Resources\EditoraCollection;
use App\Models\Editora;
use App\Services\EditoraService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EditoraController extends Controller
{
    public function __construct(
        protected EditoraService $editoraService,
    ) {}

    public function index(Request $request)
    {
        $param = $request->input('editora');
        if ($param) {
            return response()->json([
                'editoras' => new EditoraCollection($this->editoraService->buscaPeloNome($param))
            ], 200);
        }
        return response()->json([
            'editoras' => new EditoraCollection($this->editoraService->buscarTodos())
        ], 200);
    }

    public function store(EditoraRequest $request): JsonResponse
    {
        $editora = $this->editoraService->salvar(new EditoraDTO($request->validated('edi_nome'), 1));
        return response()->json([
            'message' => 'Editora criado com sucesso'
        ], 201);
    }

    public function delete(Editora $editora): JsonResponse
    {
        try {
            $this->editoraService->deletar($editora);
            return response()->json([
                'message' => 'Editora deletada com sucesso'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function update(Editora $editora, EditoraRequest $request): JsonResponse
    {
        try {
            $this->editoraService->atualizar($editora, new EditoraDTO($request->validated('edi_nome')));
            return response()->json([
                'message' => 'Editora atualizada com sucesso.'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
