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
        return Livro::create($livroDTO->toArray());
    }

    public function salvarCapa(UploadedFile $capa):string
    {
        return $path = $capa->store('capas_livros', 'public');
    }
}