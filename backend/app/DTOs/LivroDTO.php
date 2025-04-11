<?php

namespace App\DTOs;

class LivroDTO
{
    public function __construct(
        protected ?string $isbn,
        protected string $numRegistro,
        protected ?string $titulo,
        protected int $numPaginas,
        protected $dataPubli,
        protected int $edicao,
        protected int $editoraId,
        protected string $classIndicativa,
        protected string $localizacao,
        protected string $sinopse,
        protected ?string $capa,
        protected readonly int $statusAtivo = 1,
        protected array $autores,
        protected array $generos,
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
            'status_ativo' => $this->statusAtivo
        ];
    }
}
