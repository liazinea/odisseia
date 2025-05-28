<?php

namespace App\Repositories;

use App\DTOs\UsuarioDTO;
use App\Models\Usuario;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UsuarioRepository implements UsuarioRepositoryInterface
{
    public function buscaTodos():Collection
    {
        return Usuario::where('usu_status', '=', 1)
        ->where('usu_nivel', '=', 0)
        ->get();
    }

    public function buscaPorId(int $id): ?Usuario
    {
    return Usuario::where('usu_status', 1)
        ->where('usu_id', $id)
        ->with([
            'emprestimo.livro.generos',
            'emprestimo.livro.editora',
            'emprestimo.livro.autores',
            'emprestimo.aluno',
        ])
        ->first();
    }       


    public function buscaTodosComPesquisa(string $campo, string $valor):Collection
    {
        return Usuario::where($campo, 'like', "%".$valor."%")
        ->where('usu_status', '=', 1)
        ->get();
    }
    public function checkSenha($password):bool
    {
        return Hash::check($password, Auth::user()->password);
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
