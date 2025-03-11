<?php

namespace App\Services;

use App\DTOs\GeneroDTO;
use App\Models\Genero;
use App\Repositories\GeneroRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class GeneroService
{
    public function __construct(
        protected GeneroRepositoryInterface $generoRepository
    )
    {}

    public function buscarTodos():null|Collection
    {
        return $this->generoRepository->buscarTodos();
    }
    public function buscaComNome(string $param):null|Collection|Genero
    {
        return $this->generoRepository->buscaComNome($param);
    }

    public function buscaPorVariosNomesOuCadastra(array $nomes):array
    {
        $generos = [];
        foreach ($nomes as $genero) {
            if($generoNome = $this->buscaPeloNome($genero)){
                $generos[] = $generoNome;
            }else{
                $novoGenero = new GeneroDTO($genero);
                $generos[] = $this->generoRepository->salvar($novoGenero);
            }
        }

        return $generos;
    }
    public function buscaPeloNome(string $nome):null|Genero
    {
        return $this->generoRepository->buscaPeloNome($nome);
    }

    public function salvar(GeneroDTO $generoDTO):Genero
    {
        return $this->generoRepository->salvar($generoDTO);
    }
}