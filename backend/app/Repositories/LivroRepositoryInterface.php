<?php

namespace App\Repositories;

use App\DTOs\LivroDTO;
use App\Models\Livro;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;

interface LivroRepositoryInterface
{
    public function buscarTodos():Collection;
    public function salvarCapa(UploadedFile $capa):string;
    public function salvar(LivroDTO $livroSTO):Livro;
}