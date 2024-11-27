<?php

namespace App\Repositoires;

use App\DTOs\LivroDTO;
use App\Models\Livro;
use Illuminate\Http\UploadedFile;

interface LivroRepositoryInterface
{
    public function salvarCapa(UploadedFile $capa):string;
    public function salvar(LivroDTO $livroSTO):Livro;
}