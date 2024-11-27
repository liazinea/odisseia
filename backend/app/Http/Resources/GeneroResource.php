<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GeneroResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->gen_id,
            'nome' => $this->gen_nome,
        ];
    }
}
