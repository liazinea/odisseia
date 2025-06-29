<?php

namespace App\Repositories;

use App\DTOs\EmprestimoDTO;
use App\Models\Emprestimo;
use Illuminate\Database\Eloquent\Collection;

interface EmprestimoRepositoryInterface
{
    public function renovaEmprestimo(Emprestimo $emprestimo): bool;
    public function atualizaEmprestimo(int $estadoAtual, Emprestimo $emprestimo): bool;
    public function verificaSeAlunoTemEmprestimo(int $idAluno): bool;
    public function criaEmprestimo(EmprestimoDTO $emprestimoDTO): Emprestimo;
    public function buscarTodos(): Collection;
    public function buscarPorUsuario(int $usuarioId): Collection;
}
