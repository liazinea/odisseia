<?php

namespace App\Repositories;

use Auth;

class LoginRepository implements LoginRepositoryInterface
{
    public function autenticar(array $credenciais):bool
    {
        return Auth::attempt($credenciais);
    }

    public function geraTokenAluno(Auth $alunoAutenticado):string
    {
        return $alunoAutenticado->createToken('auth_token', ['aluno'])->plainTextToken;
    }

    public function geraTokenProfessorSalaDeLeitura(Auth $professorAutenticado):string
    {
        return $professorAutenticado->createToken('auth_token', ['professor'])->plainTextToken;
    }
}
