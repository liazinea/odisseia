<?php

namespace App\Services;

use App\DTOs\LivroDTO;
use App\Models\Livro;
use App\Repositoires\LivroRepositoryInterface;
use App\Service\AutorService;
use App\Service\GeneroService;
use Illuminate\Http\UploadedFile;

class LivroService
{
    public function __construct(
        protected AutorService $autorService,
        protected GeneroService $generoService,
        protected LivroRepositoryInterface $livroRepository
    )
    {}
    public function salvarLivro(LivroDTO $livroDTO):Livro
    {
        $autores = $this->autorService->buscaPorVariosNomes($livroDTO->autores);
        $generos = $this->generoService->buscaPorVariosNomes($livroDTO->generos);
        if($livro = $this->livroRepository->salvar($livroDTO)){
            $livro->autores()->sync($autores);
            $livro->generos()->sync($generos);
            return $livro;
        }
        throw new \Exception("Erro ao salvar livro");
    }
    public function salvarCapa(UploadedFile $capa):string
    {
        if($pathCapa = $this->livroRepository->salvarCapa($capa)){
            return $pathCapa;
        }

        throw new \Exception('Erro ao salvar a capa do livro.');
    }
}