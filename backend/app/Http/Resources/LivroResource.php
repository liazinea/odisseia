<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LivroResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->liv_id,
            'isbn' => $this->liv_isbn,
            'numRegistro' => $this->liv_numRegistro,
            'nome' => $this->liv_nome,
            'qtdPaginas' => $this->liv_qtdPaginas,
            'dataPubli' => $this->liv_dataPubli,
            'edicao' => $this->liv_edicao,
            'classificacaoIndicativa' => $this->liv_classIndicativa,
            'localizacao' => $this->liv_localizacao,
            'sinopse' => $this->liv_sinopse,
            'capa' => $this->liv_capa,
            'editora' => new EditoraResource($this->whenLoaded('editora')), 
            'autores' => AutorResource::collection($this->whenLoaded('autores')), 
            'generos' => GeneroResource::collection($this->whenLoaded('generos')), 
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
