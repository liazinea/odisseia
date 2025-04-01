<?php

namespace App\Services;

use App\DTOs\LoginDTO;
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
        if($this->autenticar($loginDTO->toArray())){
            return $this->geraToken(Auth::user());
        }

        throw new \Exception('Email ou senhas incorretos');
    }

    public function autenticar(LoginDTO $loginDTO):bool
    {
        return $this->loginRepository->autenticar($loginDTO->toArray());
    }

    public function geraToken(Auth $usuarioAutenticado):string
    {
        if($usuarioAutenticado->usu_nivel == 0){
            return $this->loginRepository->geraTokenAluno($usuarioAutenticado);
        }
        return $this->loginRepository->geraTokenProfessorSalaDeLeitura($usuarioAutenticado);
    }
}
