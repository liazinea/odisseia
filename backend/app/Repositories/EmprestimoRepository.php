<?php

namespace App\Repositories;

use App\DTOs\EmprestimoDTO;
use App\Models\Emprestimo;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;

class EmprestimoRepository implements EmprestimoRepositoryInterface
{
    public function renovaEmprestimo(Emprestimo $emprestimo):bool
    {
        $emprestimo->emp_quantRenovacao++;
        $novaDataFim = Carbon::parse($emprestimo->emp_data_fim)->addMonth();
        $emprestimo->emp_data_fim = $novaDataFim;

        return $emprestimo->save();
    }
    public function atualizaEmprestimo(int $estadoAtual, Emprestimo $emprestimo):bool
    {
        $emprestimo->emp_status = $estadoAtual;
        return $emprestimo->save();
    }
    public function buscarTodos():Collection
    {
        return Emprestimo::where('emp_status_ativo', '=', 1)->with(['aluno', 'livro'])->get();
    }
    public function verificaSeAlunoTemEmprestimo(int $idAluno): bool
    {
        return Emprestimo::where('usu_id', '=', $idAluno)->exists();
    }

    public function criaEmprestimo(EmprestimoDTO $emprestimoDTO): Emprestimo
    {
        return Emprestimo::create($emprestimoDTO->toArray());
    }
}
