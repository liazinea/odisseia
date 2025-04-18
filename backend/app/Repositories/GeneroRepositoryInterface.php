<?php

namespace App\Repositories;

use App\DTOs\GeneroDTO;
use App\Models\Genero;
use App\Models\Livro;
use Illuminate\Database\Eloquent\Collection;

interface GeneroRepositoryInterface
{
    public function buscarTodos():null|Collection;
    public function buscaComNome(string $param):null|Genero|Collection;
    public function buscaPeloNome(string $nome):Genero|null;
    public function salvar(GeneroDTO $generoDTO):Genero;
    public function deletar(Genero $genero):bool;
    public function atualizar(Genero $genero, GeneroDTO $generoDTO):bool;
}