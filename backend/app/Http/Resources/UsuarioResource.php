<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UsuarioResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'usu_id' => $this->usu_id,
            'usu_nome' => $this->usu_nome,
            'usu_dataNasc' => $this->usu_dataNasc,
            'email' => $this->email,
            'usu_nivel' => $this->usu_nivel,
            'usu_ra' => $this->usu_ra,
            'usu_status' => $this->usu_status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'emprestimo'=> new EmprestimoResource($this->whenLoaded('emprestimo'))
        ];
    }
}