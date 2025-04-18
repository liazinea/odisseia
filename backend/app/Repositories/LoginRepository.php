<?php

namespace App\Repositories;

use App\Models\Usuario;
use Auth;

class LoginRepository implements LoginRepositoryInterface
{
    public function autenticar(array $credenciais):bool
    {
        return Auth::attempt($credenciais);
    }

    public function logout(Usuario $usuarioAutenticado):bool
    {
        return $usuarioAutenticado->tokens()->delete();

    }
    public function geraTokenAluno(Usuario $alunoAutenticado):string
    {
        return $alunoAutenticado->createToken('auth_token', ['aluno'])->plainTextToken;
    }

    public function geraTokenProfessorSalaDeLeitura(Usuario $professorAutenticado):string
    {
        return $professorAutenticado->createToken('auth_token', ['professor'])->plainTextToken;
    }
}
