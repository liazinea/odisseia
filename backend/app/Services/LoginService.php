<?php

namespace App\Services;

use App\DTOs\LoginDTO;
use App\Models\Usuario;
use App\Repositories\LoginRepositoryInterface;
use Auth;
class LoginService
{
    public function __construct
    (
        protected LoginRepositoryInterface $loginRepository,
    ){}

    public function login(LoginDTO $loginDTO):string
    {
        if($this->autenticar($loginDTO)){
            return $this->geraToken(Auth::user());
        }

        throw new \Exception('Email ou senhas incorretos');
    }

    public function logout(Usuario $usuarioAutenticado):bool
    {
        return $this->loginRepository->logout($usuarioAutenticado);
    }

    public function autenticar(LoginDTO $loginDTO):bool
    {
        return $this->loginRepository->autenticar($loginDTO->toArray());
    }

    public function geraToken(Usuario $usuarioAutenticado):string
    {
        if($usuarioAutenticado->usu_nivel == 0){
            return $this->loginRepository->geraTokenAluno($usuarioAutenticado);
        }
        return $this->loginRepository->geraTokenProfessorSalaDeLeitura($usuarioAutenticado);
    }
}
