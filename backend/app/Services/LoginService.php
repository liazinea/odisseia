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
        if($this->autenticar($loginDTO)){

        }

        throw new \Exception('Email ou senhas incorretos');
    }

    public function autenticar(LoginDTO $loginDTO):bool
    {
        return $this->loginRepository->autenticar($loginDTO->toArray());
    }

    public function geraToken()
    {
    }
}
