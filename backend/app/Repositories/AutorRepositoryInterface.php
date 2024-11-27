<?php

namespace App\Repositories;

use App\DTOs\AutorDTO;
use App\Models\Autor;

interface AutorRepositoryInterface
{
    public function buscaPeloNome(string $nome):Autor|null;
    public function salvar(AutorDTO $autorDTO):Autor;
}