<?php

namespace App\Services;

use App\DTOs\UsuarioDTO;
use App\Models\Usuario;
use App\Repositories\UsuarioRepository;
use Illuminate\Database\Eloquent\Collection;

class UsuarioService
{
    public function __construct(
        protected UsuarioRepository $usuarioRepository
    )
    {}

    public function buscaTodosComPesquisa(array $params):Collection
    {
        return $this->usuarioRepository->buscaTodosComPesquisa($params['campo'], $params['valor']);
    }

    public function buscaTodos():Collection
    {
        return $this->usuarioRepository->buscaTodos();
    }

    public function salvar(UsuarioDTO $usuarioDTO):Usuario
    {
        if($usuario = $this->usuarioRepository->salvar($usuarioDTO)) {
            return $usuario;
        }

        throw new \Exception('Erro ao salvar usuário.');
    }

    public function deletar(Usuario $usuario):bool
    {
        return $this->usuarioRepository->deletar($usuario);
    }

    public function editar(Usuario $usuario, UsuarioDTO $usuarioDTO):bool
    {
        return $this->usuarioRepository->editar($usuario,$usuarioDTO);
    }
}
