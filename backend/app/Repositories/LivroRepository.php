<?php

namespace App\Repositories;

use App\DTOs\LivroDTO;
use App\Models\Livro;
use App\Repositories\LivroRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;

class LivroRepository implements LivroRepositoryInterface
{
    public function atualizar(LivroDTO $livroDTO, Livro $livro): bool
    {
        $livro->liv_isbn = $livroDTO->isbn;
        $livro->liv_numRegistro = $livroDTO->numRegistro;
        $livro->liv_nome = $livroDTO->titulo;
        $livro->liv_qtdPaginas = $livroDTO->numPaginas;
        $livro->liv_dataPubli = $livroDTO->dataPubli;
        $livro->edi_id = $livroDTO->editoraId;
        $livro->liv_edicao = $livroDTO->edicao;
        $livro->liv_classIndicativa = $livroDTO->classIndicativa;
        $livro->liv_localizacao = $livroDTO->localizacao;
        $livro->liv_sinopse = $livroDTO->sinopse;
        $livro->liv_capa = $livroDTO->capa;
        return $livro->save();
    }
    
    public function retorna(Livro $livro): Livro
    {
        return $livro->load(['editora', 'autores', 'generos']);
    }

    public function deletar(Livro $livro): bool
    {
        $livro->autores()->detach();
        $livro->generos()->detach();
        return $livro->delete();
    }

    public function buscarTodos():Collection
    {
        return Livro::with(['autores', 'editora', 'generos'])->get();
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