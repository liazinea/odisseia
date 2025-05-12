<?php

namespace App\Repositories;

use App\DTOs\EmprestimoDTO;
use App\Models\Emprestimo;

class EmprestimoRepository implements EmprestimoRepositoryInterface
{
    public function verificaSeAlunoTemEmprestimo(int $idAluno): bool
    {
        return Emprestimo::where('usu_id', '=', $idAluno)->exists();
    }

    public function criaEmprestimo(EmprestimoDTO $emprestimoDTO): Emprestimo
    {
        return Emprestimo::create($emprestimoDTO->toArray());
    }
}
