<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UsuarioResource extends ResourceCollection
{

    public function toArray(Request $request): array
    {
        return [
            'id'=> $this->usu_id,
            'nome'=> $this->usu_nome,
            'data_nascimento'=>$this->usu_dataNasc,
            'email'=>$this->email,
            'nivel'=>$this->usu_nivel,
            'ra'=>$this->usu_ra,
            'status'=>$this->usu_status,
        ];
    }
}
