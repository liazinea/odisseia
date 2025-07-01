<?php

namespace App\Services;

use App\DTOs\EmprestimoDTO;
use App\Models\Emprestimo;
use App\Models\Livro;
use App\Repositories\EmprestimoRepository;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class EmprestimoService
{
    public function __construct(
        protected EmprestimoRepository $emprestimoRepository,
        protected UsuarioService $usuarioService,
        protected LivroService $livroService,
    ) {}

    public function buscarTodos(): Collection
    {
        return $this->emprestimoRepository->buscarTodos();
    }
    public function criaEmprestimo(int $idAluno, int $idLivro, int $status = 1): Emprestimo
    {
        $aluno = $this->usuarioService->buscaPorId($idAluno);
        if ($aluno->usu_status == 3) {
            throw new Exception('Usuário penalizado, assim não podendo criar uma reserva/empréstimo');
        }
        $livro = $this->buscarLivroDisponivelOuLancarExcecao($idLivro);

        if (Emprestimo::where('liv_id', $livro->liv_id)
            ->whereNotIn('emp_status', [0, 3])
            ->exists()
        ) {
            throw new Exception('Livro já emprestado');
        }



        if (!$this->verificaSeAlunoTemEmprestimo($idAluno)) {
            $emprestimoDTO = new EmprestimoDTO(
                dataInicio: Carbon::now()->toDateString(),
                dataFim: Carbon::now()->addMonth()->toDateString(),
                status: $status,
                quantRenovacao: 0,
                statusAtivo: 1,
                livroId: $livro->liv_id,
                usuarioId: $aluno->usu_id
            );

            return $this->emprestimoRepository->criaEmprestimo($emprestimoDTO);
        }

        throw new Exception('O aluno já tem um empréstimo');
    }

    public function buscarLivroDisponivelOuLancarExcecao($livroOriginal)
    {
        $livroBuscado = Livro::where('liv_id', $livroOriginal)->first();
        $livroEmprestado = Emprestimo::where('liv_id', $livroBuscado->liv_id)
            ->whereNotIn('emp_status', [0, 3])
            ->exists();
        if (!$livroEmprestado) {
            return $livroBuscado;
        }

        $livroDisponivel = DB::table('liv_livro')
            ->leftJoin('emp_emprestimo', 'liv_livro.liv_id', '=', 'emp_emprestimo.liv_id')
            ->whereRaw('LOWER(liv_livro.liv_nome) = ?', [strtolower($livroBuscado->liv_nome)])
            ->where(function ($query) {
                $query->whereNull('emp_emprestimo.liv_id')
                    ->orWhereIn('emp_emprestimo.emp_status', [0, 3]);
            })
            ->where('liv_livro.liv_id', '<>', $livroBuscado->liv_id)
            ->select('liv_livro.*')
            ->first();

        if ($livroDisponivel) {

            return $livroDisponivel;
        }

        throw new Exception('Não há exemplares disponíveis deste livro no momento.');
    }


    public function atualizaEmprestimo(int $estadoAtual, Emprestimo $emprestimo): bool
    {
        if ($result = $this->emprestimoRepository->atualizaEmprestimo($estadoAtual, $emprestimo)) {
            return $result;
        }
        throw new Exception('Erro ao atualizar um empréstimo');
    }

    public function renovaEmprestimo(Emprestimo $emprestimo): bool
    {
        if ($result = $this->emprestimoRepository->renovaEmprestimo($emprestimo)) {
            return $result;
        }
        throw new Exception('Erro ao atualizar um empréstimo');
    }

    public function verificaSeAlunoTemEmprestimo(int $idAluno): bool
    {
        return $this->emprestimoRepository->verificaSeAlunoTemEmprestimo($idAluno);
    }

    public function buscarPorUsuario(int $usuarioId)
    {
        return $this->emprestimoRepository->buscarPorUsuario($usuarioId);
    }
}
