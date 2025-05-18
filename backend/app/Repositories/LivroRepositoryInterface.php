<?php

namespace App\Repositories;

use App\DTOs\LivroDTO;
use App\Models\Livro;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;

interface LivroRepositoryInterface
{
    public function atualizar(LivroDTO $livroDTO, Livro $livro): bool;
    public function retorna(Livro $livro):Livro;
    public function buscaLivrosPorGenero(string $genero): Collection;
    public function deletar(Livro $livro):bool;
    public function buscarTodos():Collection;
    public function buscaPorId(int $id):Livro;
    public function salvarCapa(UploadedFile $capa):string;
    public function salvar(LivroDTO $livroSTO):Livro;
}
