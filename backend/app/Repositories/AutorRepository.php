<?php

namespace App\Repositories;

use App\DTOs\AutorDTO;
use App\Models\Autor;

class AutorRepository implements AutorRepositoryInterface
{
    public function salvar(AutorDTO $autorDTO):Autor
    {
        return Autor::create($autorDTO->toArray());
    }
    
    public function buscaPeloNome(string $nome):Autor|null
    {
        return Autor::where('aut_nome', $nome)->first();
    }
}