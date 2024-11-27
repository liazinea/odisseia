<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EditoraResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return[
            'id' => $this->edi_id,
            'nome' => $this->edi_nome,
        ];
    }
}
