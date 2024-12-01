<?php

namespace App\Repositories;

use App\DTOs\EditoraDTO;
use App\Models\Editora;

class EditoraRepository implements EditoraRepositoryInterface
{
    public function salvar(EditoraDTO $editoraDTO):Editora
    {
        return Editora::create($editoraDTO->toArray());
    }
    
    public function buscaPeloNome(string $nome):Editora|null
    {
        return Editora::where('edi_nome', $nome)->first();
    }
}