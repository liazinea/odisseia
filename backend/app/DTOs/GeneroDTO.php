<?php

namespace App\DTOs;

class GeneroDTO
{
    public function __construct(
        public readonly string $nome, 
        public readonly int $statusAtivo, 
    )
    {}

    public function toArray(): array
    {
        return [
            'gen_nome' => $this->nome,
            'gen_status_ativo' => $this->statusAtivo,
        ];
    }        
}