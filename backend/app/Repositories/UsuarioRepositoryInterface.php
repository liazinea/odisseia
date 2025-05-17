<?php

namespace App\Repositories;

use App\DTOs\UsuarioDTO;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Collection;

interface UsuarioRepositoryInterface
{
    public function buscaTodos():Collection;
    public function buscaPorId(int $id):Usuario;
    public function buscaTodosComPesquisa(string $campo, string $valor):Collection;
    public function checkSenha($pasword):bool;
    public function salvar(UsuarioDTO $usuario):Usuario;
    public function deletar(Usuario $usuario):bool;
    public function editar(Usuario $usuario, UsuarioDTO $usuarioDTO):bool;
}
