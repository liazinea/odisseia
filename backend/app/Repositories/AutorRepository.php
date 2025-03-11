<?php

namespace App\Repositories;

use App\DTOs\AutorDTO;
use App\Models\Autor;
use Illuminate\Database\Eloquent\Collection;

class AutorRepository implements AutorRepositoryInterface
{
    public function buscarTodos():null|Collection
    {
        return Autor::all();
    }
    public function buscaComPesquisa(string $param): null|Collection|Autor
    {
        return Autor::where('aut_nome', 'like', '%' . $param . '%')->get();
    }
    public function salvar(AutorDTO $autorDTO):Autor
    {
        return Autor::create($autorDTO->toArray());
    }
    
    public function buscaPeloNome(string $nome):Autor|null
    {
        return Autor::where('aut_nome', $nome)->first();
    }
}