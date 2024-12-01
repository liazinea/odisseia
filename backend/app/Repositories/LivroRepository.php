<?php

namespace App\Repositories;

use App\DTOs\LivroDTO;
use App\Models\Livro;
use App\Repositories\LivroRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;

class LivroRepository implements LivroRepositoryInterface
{
    public function buscarTodos():Collection
    {
        return Livro::all();
    }

    public function salvar(LivroDTO $livroDTO):Livro
    {
        return Livro::create([
            'liv_isbn' =>  $livroDTO->isbn,
            'liv_numRegistro' =>  $livroDTO->numRegistro,
            'liv_nome' => $livroDTO->titulo,
            'liv_qtdPaginas' => $livroDTO->numPaginas,
            'liv_dataPubli' => $livroDTO->dataPubli,
            'edi_id' => $livroDTO->editoraId,
            'liv_edicao' => $livroDTO->edicao,
            'liv_classIndicativa' => $livroDTO->classIndicativa,
            'liv_localizacao' => $livroDTO->localizacao,
            'liv_sinopse' => $livroDTO->sinopse,
            'liv_capa' => $livroDTO->capa,
        ]);
    }

    public function salvarCapa(UploadedFile $capa):string
    {
        return $path = $capa->store('capas_livros', 'public');
    }
}