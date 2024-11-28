<?php

namespace App\DTOs;

class GeneroDTO
{
    public function __construct(
        public readonly string $nome, 
    )
    {}

    public function toArray(): array
    {
        return [
            'gen_nome' => $this->nome,
        ];
    }        
}