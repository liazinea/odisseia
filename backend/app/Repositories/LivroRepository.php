<?php

namespace App\Repositories;

use App\DTOs\LivroDTO;
use App\Models\Livro;
use App\Repositories\LivroRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;


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

    public function buscaLivrosPorGenero(string $genero): Collection
    {
        return Livro::with(['generos', 'autores', 'editora'])
            ->whereHas('generos', function ($query) use ($genero) {
                $query->where('gen_nome', $genero)
                    ->where('gen_status_ativo', '=', 1);
            })->where('liv_status_ativo', '=', '1')->get();
    }



    public function deletar(Livro $livro): bool
    {
        $livro->liv_status_ativo = 0;
        return $livro->save();
    }

    public function buscarTodos(): Collection
    {
        return Livro::where('liv_status_ativo', '=', 1)->with(['autores', 'editora', 'generos'])->get();
    }

    public function buscaPorId(int $id): Livro
    {
        return Livro::where('liv_status_ativo', '=', 1)
            ->where('liv_id', '=', $id)
            ->first();
    }

    public function salvar(LivroDTO $livroDTO): Livro
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

    public function salvarCapa(UploadedFile $capa): string
    {
        return $path = $capa->store('capas_livros', 'public');
    }


    public function livrosMaisEmprestados(int $limite = 3): Collection
    {
        $livrosMaisEmprestados = Livro::select('liv_livro.*', DB::raw('COUNT(emp_emprestimo.emp_id) as total_emprestimos'))
            ->join('emp_emprestimo', 'liv_livro.liv_id', '=', 'emp_emprestimo.liv_id')
            ->where('liv_livro.liv_status_ativo', 1)
            ->groupBy('liv_livro.liv_id')
            ->orderByDesc('total_emprestimos')
            ->take($limite)
            ->get();

        // Carregar relações manualmente para evitar conflito com join
        $livrosMaisEmprestados->load(['autores', 'editora', 'generos']);

        if ($livrosMaisEmprestados->count() < $limite) {
            $faltando = $limite - $livrosMaisEmprestados->count();

            $livrosIds = $livrosMaisEmprestados->pluck('liv_id')->toArray();

            $aleatorios = Livro::where('liv_status_ativo', 1)
                ->whereNotIn('liv_id', $livrosIds)
                ->inRandomOrder()
                ->take($faltando)
                ->get();

            $aleatorios->load(['autores', 'editora', 'generos']);

            return $livrosMaisEmprestados->merge($aleatorios);
        }

        return $livrosMaisEmprestados;
    }

    public function quantidadeLivro(string $nome): int
    {
        $ids = DB::table('liv_livro')
    ->where('liv_status_ativo', 1)
    ->whereRaw('LOWER(liv_nome) = ?', [strtolower($nome)])
    ->pluck('liv_id');

$totalLivros = $ids->count();

$emprestimosAtivosCount = DB::table('emp_emprestimo')
    ->whereIn('liv_id', $ids)
    ->whereIn('emp_status', [1, 2])
    ->count();

$livrosDisponiveis = $totalLivros - $emprestimosAtivosCount;
return $livrosDisponiveis;

    }
}
