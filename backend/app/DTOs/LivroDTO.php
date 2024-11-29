<?php

namespace App\DTOs;

class LivroDTO
{
    public function __construct(
        public readonly int $isbn,
        public readonly int $numRegistro,
        public readonly string $titulo,
        public readonly int $numPaginas,
        public readonly string $dataPubli,
        public readonly string $edicao,
        public readonly int $editora,
        public readonly string $classificacaoIndicativa,
        public readonly string $localizacao,
        public readonly string $sinopse,
        public readonly string $capa,
        public readonly array $autores,
        public readonly array $generos,
    ) {}

    public function toArray(): array
    {
        return [
            'isbn' => $this->isbn,
            'numRegistro' => $this->numRegistro,
            'titulo' => $this->titulo,
            'numPaginas' => $this->numPaginas,
            'dataPubli' => $this->dataPubli,
            'edicao' => $this->edicao,
            'editora' => $this->editora,
            'classificacaoIndicativa' => $this->classificacaoIndicativa,
            'localizacao' => $this->localizacao,
            'sinopse' => $this->sinopse,
            'capa' => $this->capa,
        ];
    }
}
