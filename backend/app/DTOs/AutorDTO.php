<?php

namespace App\DTOs;

class AutorDTO
{
    public function __construct(
        public readonly string $nome,
        public readonly int $statusAtivo = 1, 
    )
    {}

    public function toArray(): array
    {
        return [
            'aut_nome' => $this->nome,
            'aut_status_ativo' => $this->statusAtivo
        ];
    }        
}