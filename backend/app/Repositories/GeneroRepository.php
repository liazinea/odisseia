<?php

namespace App\Repositories;

use App\DTOs\GeneroDTO;
use App\Models\Genero;
use Illuminate\Database\Eloquent\Collection;

class GeneroRepository implements GeneroRepositoryInterface
{
    public function buscarTodos():null|Collection
    {
        return Genero::all();
    }
    public function buscaComNome(string $param): null|Genero|Collection
    {
        return Genero::where('gen_nome', 'like', '%' . $param . '%')
        ->where('gen_status_ativo', '=', 1)
        ->get();
    }
    public function salvar(GeneroDTO $generoDTO):Genero
    {
        return Genero::create($generoDTO->toArray());
    }
    public function deletar(Genero $genero): bool
    {
        $genero->gen_status_ativo = 0;
        return $genero->save();
    }
    public function atualizar(Genero $genero, GeneroDTO $generoDTO):bool
    {
        return $genero->update($generoDTO->toArray());
    }
    public function buscaPeloNome(string $nome):Genero|null
    {
        return Genero::where('gen_nome', $nome)
        ->where('gen_status_ativo', '=', 1)
        ->first();
    }
}