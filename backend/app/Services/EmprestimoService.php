<?php

namespace App\Services;

use App\DTOs\EmprestimoDTO;
use App\Models\Emprestimo;
use App\Repositories\EmprestimoRepository;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Collection;

class EmprestimoService
{
    public function __construct(
        protected EmprestimoRepository $emprestimoRepository,
        protected UsuarioService $usuarioService,
        protected LivroService $livroService,
    )
    {}

    public function buscarTodos():Collection
    {
        return $this->emprestimoRepository->buscarTodos();
    }
    public function criaEmprestimo(int $idAluno, int $idLivro):Emprestimo
    {
        $aluno = $this->usuarioService->buscaPorId($idAluno);
        $livro = $this->livroService->buscaPorId($idLivro);

        if(!$this->verificaSeAlunoTemEmprestimo($idAluno)){
            $emprestimoDTO = new EmprestimoDTO(
                dataInicio: Carbon::now()->toDateString(),
                dataFim: Carbon::now()->addMonth()->toDateString(),
                status: 1,
                quantRenovacao: 0,
                statusAtivo: 1,
                livroId: $livro->liv_id,
                usuarioId: $aluno->usu_id
            );

            return $this->emprestimoRepository->criaEmprestimo($emprestimoDTO);
        }

        throw new Exception('O aluno já tem um empréstimo');
    }

    public function atualizaEmprestimo(int $estadoAtual, Emprestimo $emprestimo):bool
    {
        if($result = $this->emprestimoRepository->atualizaEmprestimo($estadoAtual, $emprestimo)){
            return $result;
        }
        throw new Exception('Erro ao atualizar um empréstimo');
    }

    public function renovaEmprestimo(Emprestimo $emprestimo):bool
    {
        if($result = $this->emprestimoRepository->renovaEmprestimo($emprestimo)){
            return $result;
        }
        throw new Exception('Erro ao atualizar um empréstimo');
    }

    public function verificaSeAlunoTemEmprestimo(int $idAluno):bool
    {
        return $this->emprestimoRepository->verificaSeAlunoTemEmprestimo($idAluno);
    }
}
