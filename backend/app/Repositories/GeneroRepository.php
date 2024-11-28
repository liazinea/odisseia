<?php

namespace App\Repositories;

use App\DTOs\GeneroDTO;
use App\Models\Genero;

class GeneroRepository implements GeneroRepositoryInterface
{
    public function salvar(GeneroDTO $generoDTO):Genero
    {
        return Genero::create($generoDTO->toArray());
    }
    
    public function buscaPeloNome(string $nome):Genero|null
    {
        return Genero::where('gen_nome', $nome)->first();
    }
}