<?php

namespace App\Repositories;

use App\DTOs\EditoraDTO;
use App\Models\Editora;
use Illuminate\Support\Collection;

class EditoraRepository implements EditoraRepositoryInterface
{
    public function salvar(EditoraDTO $editoraDTO): Editora
    {
        return Editora::create($editoraDTO->toArray());
    }

    public function buscarTodos(): null|Collection
    {
        return Editora::where('edi_status_ativo', '=', 1)->get();
    }

    public function buscaPeloNome(string $nome): Editora|null
    {
        return Editora::where('edi_nome', $nome)
            ->where('edi_status_ativo', '=', 1)
            ->first();
    }


    public function deletar(Editora $editora): bool
    {
        $editora->edi_status_ativo = 0;
        return $editora->save();
    }
    public function atualizar(Editora $editora, EditoraDTO $editoraDTO): bool
    {
        return $editora->update($editoraDTO->toArray());
    }
}
