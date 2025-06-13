<?php

namespace App\Repositories;

use App\DTOs\EditoraDTO;
use App\Models\Editora;
use Illuminate\Support\Collection;

interface EditoraRepositoryInterface
{

    public function buscaPeloNome(string $nome): Editora|null;
    public function salvar(editoraDTO $editoraDTO): Editora;
    public function deletar(Editora $editora): bool;
    public function atualizar(Editora $editora, EditoraDTO $editoraDTO): bool;
    public function buscarTodos(): null|Collection;
}
