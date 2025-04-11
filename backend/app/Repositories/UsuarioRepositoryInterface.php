<?php

namespace App\Repositories;

use App\DTOs\UsuarioDTO;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Collection;

interface UsuarioRepositoryInterface
{
    public function buscaTodos():Collection;
    public function buscaTodosComPesquisa(string $campo, string $valor):Collection;
    public function salvar(UsuarioDTO $usuario):Usuario;
}
