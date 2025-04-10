<?php

namespace App\Repositories;

use App\Http\Resources\UsuarioCollection;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Collection;

interface UsuarioRepositoryInterface
{
    public function buscaTodos():Collection;
    public function buscaTodosComPesquisa(string $campo, string $valor):Collection;
}