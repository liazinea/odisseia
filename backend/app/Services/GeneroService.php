<?php

namespace App\Services;

use App\DTOs\GeneroDTO;
use App\Models\Genero;
use App\Repositories\GeneroRepositoryInterface;

class GeneroService
{
    public function __construct(
        protected GeneroRepositoryInterface $generoRepository
    )
    {}
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
    public function buscaPeloNome(string $nome):Genero
    {
        return $this->generoRepository->buscaPeloNome($nome);
    }

    public function salvar(GeneroDTO $generoDTO):Genero
    {
        return $this->generoRepository->salvar($generoDTO);
    }
}