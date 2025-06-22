<?php

namespace App\Services;

use App\DTOs\LoginDTO;
use App\Models\Emprestimo;
use App\Models\Usuario;
use App\Repositories\LoginRepositoryInterface;
use App\Repositories\UsuarioRepositoryInterface;
use Auth;
use Carbon\Carbon;

class LoginService
{
    public function __construct(
        protected LoginRepositoryInterface $loginRepository,
        protected UsuarioRepositoryInterface $usuarioRepository,
    ) {}

    public function login(LoginDTO $loginDTO): string
    {
        if ($this->autenticar($loginDTO)) {
            return $this->geraToken(Auth::user());
        }

        throw new \Exception('Email ou senhas incorretos');
    }

    public function logout(Usuario $usuarioAutenticado): bool
    {
        return $this->loginRepository->logout($usuarioAutenticado);
    }

    public function autenticar(LoginDTO $loginDTO): bool
    {
        return $this->loginRepository->autenticar($loginDTO->toArray());
    }

    public function geraToken(Usuario $usuarioAutenticado): string
    {
       if($usuarioAutenticado->usu_status != 0){
        if ($usuarioAutenticado->usu_nivel == 0) {
            $emprestimosVencidos = Emprestimo::where('emp_status', '=', 2)->where('emp_dataFim', '<', Carbon::now())->where('usu_id', '=', $usuarioAutenticado->usu_id)->get();
            if ($emprestimosVencidos->count() > 0) {
                $usuarioAutenticado->usu_status = 3;
                $usuarioAutenticado->save();
            }
            return $this->loginRepository->geraTokenAluno($usuarioAutenticado);
        }
        return $this->loginRepository->geraTokenProfessorSalaDeLeitura($usuarioAutenticado);
       }
       throw new \Exception('Erro ao logar');
    }
}
