<?php

namespace App\DTOs;

class EditoraDTO
{
    public function __construct(
        public readonly string $nome, 
    )
    {}

    public function toArray(): array
    {
        return [
            'edi_nome' => $this->nome,
        ];
    }        
}