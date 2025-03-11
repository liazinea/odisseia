<?php

namespace App\DTOs;

class LivroDTO
{
    public function __construct(
        readonly ?string $isbn,
        readonly string $numRegistro,
        readonly ?string $titulo,
        readonly int $numPaginas,
        readonly string $dataPubli,
        readonly int $edicao,
        readonly int $editoraId,
        readonly string $classIndicativa,
        readonly string $localizacao,
        readonly string $sinopse,
        readonly ?string $capa,
        readonly array $autores,
        readonly array $generos,
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
            'editora' => $this->editoraId,
            'classIndicativa' => $this->classIndicativa,
            'localizacao' => $this->localizacao,
            'sinopse' => $this->sinopse,
            'capa' => $this->capa,
        ];
    }
}
