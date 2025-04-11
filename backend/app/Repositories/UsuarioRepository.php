<?php

namespace App\Repositories;

use App\DTOs\UsuarioDTO;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Collection;

class UsuarioRepository implements UsuarioRepositoryInterface
{
    public function buscaTodos():Collection
    {
        return Usuario::where('usu_status', '=', 1)->get();
    }
    public function buscaTodosComPesquisa(string $campo, string $valor):Collection
    {
        return Usuario::where($campo, 'like', "%".$valor."%")
        ->where('usu_status', '=', 1)
        ->get();
    }

    public function salvar(UsuarioDTO $usuario):Usuario
    {
        return Usuario::create($usuario->toArray());
    }

}
