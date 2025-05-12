<?php

namespace App\Repositories;

use App\DTOs\EmprestimoDTO;
use App\Models\Emprestimo;

interface EmprestimoRepositoryInterface
{
    public function verificaSeAlunoTemEmprestimo(int $idAluno):bool;
    public function criaEmprestimo(EmprestimoDTO $emprestimoDTO):Emprestimo;
}
