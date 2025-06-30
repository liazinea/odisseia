<?php

namespace App\Services;

use App\DTOs\LivroDTO;
use App\Models\Livro;
use App\Repositories\LivroRepositoryInterface;
use App\Services\AutorService;
use App\Services\GeneroService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Termwind\Components\Li;

class LivroService
{
    public function __construct(
        protected AutorService $autorService,
        protected GeneroService $generoService,
        protected LivroRepositoryInterface $livroRepository
    ) {}

    public function atualizar(LivroDTO $livroDTO, Livro $livro): bool
    {

        if ($this->livroRepository->atualizar($livroDTO, $livro)) {
            $livro->autores()->sync($livroDTO->autores);
            $livro->generos()->sync($livroDTO->generos);
            return true;
        }
        throw new \Exception("Erro ao salvar livro");
    }

    public function buscaLivrosPorGenero(): array
    {
        $generosComLivros = [];

        $generos = $this->generoService->buscarTodos();

        foreach ($generos as $genero) {
            $livros = $genero->livros()
                ->where('liv_status_ativo', 1)
                ->take(4)
                ->get();

            if ($livros->isNotEmpty()) {
                $generosComLivros[] = [
                    'genero' => $genero->gen_nome,
                    'livros' => $livros
                ];
            }
        }

        return $generosComLivros;
    }



    public function retorna(Livro $livo): Livro
    {
        return $this->livroRepository->retorna($livo);
    }

    public function deletar(Livro $livro): bool
    {
        return $this->livroRepository->deletar($livro);
    }

    public function buscarTodos(): Collection
    {
        return $this->livroRepository->buscarTodos();
    }

    public function buscaPorId(int $id): Livro
    {
        return $this->livroRepository->buscaPorId($id);
    }

    public function salvarLivro(LivroDTO $livroDTO): Livro
    {
        if ($livro = $this->livroRepository->salvar($livroDTO)) {
            $livro->autores()->sync($livroDTO->autores);
            $livro->generos()->sync($livroDTO->generos);
            return $livro;
        }
        throw new \Exception("Erro ao salvar livro");
    }

    public function salvarCapa(UploadedFile $capa): string
    {
        if ($pathCapa = $this->livroRepository->salvarCapa($capa)) {
            return $pathCapa;
        }

        throw new \Exception('Erro ao salvar a capa do livro.');
    }

    public function livrosMaisEmprestados(int $limite = 3): Collection
    {
        return $this->livroRepository->livrosMaisEmprestados($limite);
    }

    public function quantidadeLivro(string $nome): int
    {
        return $this->livroRepository->quantidadeLivro($nome);
    }
}
