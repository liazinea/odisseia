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
    public function deletar(Usuario $usuario): bool
    {
        $usuario->usu_status = 0;
        return $usuario->save();
    }
    public function editar(Usuario $usuario, UsuarioDTO $usuarioDTO):bool
    {
        $usuario->usu_nome = $usuarioDTO->nome;
        $usuario->usu_dataNasc = $usuarioDTO->dataNascimento;
        $usuario->email = $usuarioDTO->email;
        $usuario->password = $usuarioDTO->senha;
        $usuario->usu_nivel = $usuarioDTO->nivel;
        $usuario->usu_ra = $usuarioDTO->ra;
        $usuario->usu_status = $usuarioDTO->status;

        return $usuario->save();
    }

}
