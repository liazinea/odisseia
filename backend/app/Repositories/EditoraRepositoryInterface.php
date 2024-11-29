<?php

namespace App\Repositories;

use App\DTOs\EditoraDTO;
use App\Models\Editora;

interface EditoraRepositoryInterface
{

    public function buscaPeloNome(string $nome):Editora|null;
    public function salvar(editoraDTO $editoraDTO):Editora;
}