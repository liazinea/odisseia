<?php

namespace App\Services;

use App\DTOs\EditoraDTO;
use App\Models\Editora;
use App\Repositories\EditoraRepositoryInterface;

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
    public function buscaPeloNome(string $nome):Editora | null
    {
        return $this->editoraRepository->buscaPeloNome($nome);
    }

    public function salvar(EditoraDTO $editoraDTO):Editora
    {
        return $this->editoraRepository->salvar($editoraDTO);
    }
}
