<?php

namespace App\Repositories;

use App\DTOs\AutorDTO;
use App\Models\Autor;
use Illuminate\Database\Eloquent\Collection;

class AutorRepository implements AutorRepositoryInterface
{
    public function buscarTodos():null|Collection
    {
        return Autor::where('aut_status_ativo', '=', 1)->get();
    }
    public function buscaComPesquisa(string $param): null|Collection|Autor
    {
        return Autor::where('aut_nome', 'like', '%' . $param . '%')
        ->where('aut_status_ativo', '=', 1)
        ->get();
    }
    public function salvar(AutorDTO $autorDTO):Autor
    {
        return Autor::create($autorDTO->toArray());
    }

    public function buscaPeloNome(string $nome):Autor|null
    {
        return Autor::where('aut_nome', $nome)
        ->where('aut_status_ativo', '=', 1)
        ->first();
    }

    public function deletar(Autor $autor): bool
    {
        $autor->aut_status_ativo = 0;
        return $autor->save();
    }

    public function atualizar(Autor $autor, AutorDTO $autorDTO):bool
    {
        return $autor->update($autorDTO->toArray());
    }
}
