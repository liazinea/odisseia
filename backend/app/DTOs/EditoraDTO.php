<?php

namespace App\DTOs;

class EditoraDTO
{
    public function __construct(
        public readonly string $nome,
        public readonly int $statusAtivo = 1,  
    )
    {}

    public function toArray(): array
    {
        return [
            'edi_nome' => $this->nome,
            'edi_status_ativo' => $this->statusAtivo,
        ];
    }        
}