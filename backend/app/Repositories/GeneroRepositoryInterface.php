<?php

namespace App\Repositories;

use App\DTOs\GeneroDTO;
use App\Models\Genero;
use App\Models\Livro;

interface GeneroRepositoryInterface
{
    public function buscaPeloNome(string $nome):Genero|null;
    public function salvar(GeneroDTO $generoDTO):Genero;
}