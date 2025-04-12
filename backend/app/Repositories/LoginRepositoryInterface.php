<?php

namespace App\Repositories;

use App\Models\Usuario;

interface LoginRepositoryInterface
{
    public function autenticar(array $credencials): bool;
    public function logout(Usuario $usuarioAutenticado):bool;
    public function geraTokenAluno(Usuario $usuarioAutenticado):string;
    public function geraTokenProfessorSalaDeLeitura(Usuario $usuarioAutenticado):string;
}
