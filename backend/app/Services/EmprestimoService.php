<?php

namespace App\Services;

use App\DTOs\EmprestimoDTO;
use App\Models\Emprestimo;
use App\Repositories\EmprestimoRepository;
use Carbon\Carbon;
use Exception;

class EmprestimoService
{
    public function __construct(
        protected EmprestimoRepository $emprestimoRepository,
        protected UsuarioService $usuarioService,
        protected LivroService $livroService,
    )
    {}

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

    public function verificaSeAlunoTemEmprestimo(int $idAluno):bool
    {
        return $this->emprestimoRepository->verificaSeAlunoTemEmprestimo($idAluno);
    }
}
