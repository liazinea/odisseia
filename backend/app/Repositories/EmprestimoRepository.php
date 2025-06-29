<?php

namespace App\Repositories;

use App\DTOs\EmprestimoDTO;
use App\Models\Emprestimo;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;

class EmprestimoRepository implements EmprestimoRepositoryInterface
{
    public function renovaEmprestimo(Emprestimo $emprestimo): bool
    {
        $emprestimo->emp_quantRenovacao++;
        $novaDataFim = Carbon::parse($emprestimo->emp_dataFim)->addMonth();
        $emprestimo->emp_dataFim = $novaDataFim;

        return $emprestimo->save();
    }
    public function atualizaEmprestimo(int $estadoAtual, Emprestimo $emprestimo): bool
    {
        $emprestimo->emp_status = $estadoAtual;
        return $emprestimo->save();
    }
    public function buscarTodos(): Collection
    {
        return Emprestimo::where('emp_status_ativo', 1)
            ->with([
                'aluno',
                'livro',
                'livro.generos',
                'livro.editora',
                'livro.autores',
            ])
            ->get();
    }
    public function verificaSeAlunoTemEmprestimo(int $idAluno): bool
    {
        return Emprestimo::where('usu_id', $idAluno)
            ->whereNotIn('emp_status', [0, 3])
            ->exists();
    }

    public function criaEmprestimo(EmprestimoDTO $emprestimoDTO): Emprestimo
    {
        return Emprestimo::create($emprestimoDTO->toArray());
    }

    public function buscarPorUsuario(int $usuarioId): Collection
    {
        return Emprestimo::where('usu_id', $usuarioId)
            ->with([
                'aluno',
                'livro',
                'livro.generos',
                'livro.editora',
                'livro.autores',
            ])
            ->get();
    }
}
