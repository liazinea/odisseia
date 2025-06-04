<?php

namespace App\Services;

use App\DTOs\EditoraDTO;
use App\Models\Editora;
use App\Repositories\EditoraRepositoryInterface;
use Illuminate\Support\Collection;

class EditoraService
{
    public function __construct(
        protected EditoraRepositoryInterface $editoraRepository
    ) {}
    public function buscaPeloNomeOuCadastra(string $nome): Editora
    {
        if ($editora = $this->buscaPeloNome($nome)) {
            return $editora;
        }

        $novaEditora = new EditoraDTO($nome);

        return $this->editoraRepository->salvar($novaEditora);
    }
    public function buscaPeloNome(string $nome): Editora | null
    {
        return $this->editoraRepository->buscaPeloNome($nome);
    }

    public function buscarTodos(): null|Collection
    {
        return $this->editoraRepository->buscarTodos();
    }

    public function salvar(EditoraDTO $editoraDTO): Editora
    {
        return $this->editoraRepository->salvar($editoraDTO);
    }

        public function deletar(Editora $editora):bool
    {
        return $this->editoraRepository->deletar($editora);
    }

    public function atualizar(Editora $editora, EditoraDTO $editoraDTO):bool
    {
        return $this->editoraRepository->atualizar($editora, $editoraDTO);
    }
}
