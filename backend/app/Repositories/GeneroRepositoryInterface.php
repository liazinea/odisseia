<?php

namespace App\Repositories;

use App\DTOs\GeneroDTO;
use App\Models\Genero;

interface GeneroRepositoryInterface
{
    public function buscaPeloNome(string $nome):Genero|null;
    public function salvar(GeneroDTO $autorDTO):Genero;
}