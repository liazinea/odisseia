<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmprestimoRequest;
use App\Http\Resources\EmprestimoCollection;
use App\Models\Emprestimo;
use App\Services\EmprestimoService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class EmprestimoController extends Controller
{
    public function __construct(
        protected EmprestimoService $empretimoService,
    ) {}

    public function index(): JsonResponse
    {
        return response()->json([
            'emprestimos' => $this->empretimoService->buscarTodos(),
        ], 200);
    }
    public function store(EmprestimoRequest $request): JsonResponse
    {
        try {
            $emprestimo = $this->empretimoService
                ->criaEmprestimo($request->validated('usu_id'), $request->validated('liv_id'));
            return response()->json([
                'message' => 'Empréstimo criado com sucesso'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function atualizaEmprestimo(Emprestimo $emprestimo, Request $request): JsonResponse
    {
        try {

            $estadoAtual = $request->input('valor');
            $this->empretimoService->atualizaEmprestimo($estadoAtual, $emprestimo);

            return response()->json([
                'message' => 'Empréstimo atualizado com sucesso'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function renovaEmprestimo(Emprestimo $emprestimo): JsonResponse
    {
        try {
            $this->empretimoService->renovaEmprestimo($emprestimo);

            return response()->json([
                'message' => 'Empréstimo renovado com sucesso'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function emprestimosPorUsuario(int $usuario): JsonResponse
    {
        try {
            $emprestimos = $this->empretimoService->buscarPorUsuario($usuario);

            return response()->json([
                'emprestimos' => $emprestimos
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
