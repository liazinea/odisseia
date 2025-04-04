<?php

namespace App\Repositories;

use App\DTOs\AutorDTO;
use App\Models\Autor;
use Illuminate\Database\Eloquent\Collection;

interface AutorRepositoryInterface
{
    public function buscarTodos():null|Collection;
    public function buscaComPesquisa(string $param):null|Collection|Autor;
    public function buscaPeloNome(string $nome):Autor|null;
    public function salvar(AutorDTO $autorDTO):Autor;
    public function deletar(Autor $autor):bool;
}
