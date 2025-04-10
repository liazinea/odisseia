<?php

namespace App\Services;

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
}