<?php

namespace App\Repositories;

use App\DTOs\GeneroDTO;
use App\Models\Genero;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Collection;

class UsuarioRepository implements UsuarioRepositoryInterface
{
    public function buscaTodos():Collection
    {
        return Usuario::all();
    }
    public function buscaTodosComPesquisa(string $campo, string $valor):Collection
    {
        return Usuario::where($campo, 'like', "%".$valor."%")
        ->where('usu_status', '=', 1)
        ->get();
    }
   
}