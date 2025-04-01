<?php

namespace App\Repositories;

interface LoginRepositoryInterface
{
    public function autenticar(array $credencials): bool;
    public function geraTokenAluno(Auth $usuarioAutenticado):string;
    public function geraTokenProfessorSalaDeLeitura(Auth $usuarioAutenticado):string;
}
