<?php

namespace App\Repositories;

use App\DTOs\LivroDTO;
use App\Models\Livro;
use App\Repositoires\LivroRepositoryInterface;
use Illuminate\Http\UploadedFile;

class LivroRepository implements LivroRepositoryInterface
{
    public function salvar(LivroDTO $livroDTO):Livro
    {
        return Livro::create($livroDTO->toArray());
    }
    public function salvarCapa(UploadedFile $capa):string
    {
        return $path = $capa->store('capas_livros', 'public');
    }
}