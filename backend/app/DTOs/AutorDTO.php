<?php

namespace App\DTOs;

class AutorDTO
{
    public function __construct(
        public readonly string $nome, 
    )
    {}

    public function toArray(): array
    {
        return [
            'aut_nome' => $this->nome,
        ];
    }        
}