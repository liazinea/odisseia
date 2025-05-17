<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmprestimoResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->emp_id,
            'data_inicio' => $this->emp_dataInicio,
            'data_fim' => $this->emp_dataFim,
            'status' => $this->emp_status,
            'quantidade_renovacao' => $this->emp_quantRenovacao,
            'status_ativo' => $this->emp_status_ativo,
            'usuario' => new UsuarioResource($this->whenLoaded('aluno')),
            'livro' => new LivroResource($this->whenLoaded('livro'))
        ];
    }
}
