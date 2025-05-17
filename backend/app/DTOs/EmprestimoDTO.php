<?php

namespace App\DTOs;

class EmprestimoDTO
{
    public function __construct(
        public readonly string $dataInicio,
        public readonly string $dataFim,
        public readonly int $status,
        public readonly int $quantRenovacao,
        public readonly int $statusAtivo = 1,
        public readonly int $livroId,
        public readonly int $usuarioId,
    ) {}

    public function toArray(): array
    {
        return [
            'emp_dataInicio' => $this->dataInicio,
            'emp_dataFim' => $this->dataFim,
            'emp_status' => $this->status,
            'emp_quantRenovacao' => $this->quantRenovacao,
            'emp_status_ativo' => $this->statusAtivo,
            'liv_id' => $this->livroId,
            'usu_id' => $this->usuarioId,
        ];
    }
}
