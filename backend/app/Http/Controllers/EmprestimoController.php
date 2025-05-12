<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmprestimoRequest;
use App\Services\EmprestimoService;
use Exception;
use Illuminate\Http\JsonResponse;

class EmprestimoController extends Controller
{
    public function __construct(
        protected EmprestimoService $empretimoService,
    ) {}
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
}
