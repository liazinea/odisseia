<?php

namespace App\Service;

use App\DTOs\AutorDTO;
use App\Models\Autor;
use App\Repositories\AutorRepositoryInterface;

class AutorService
{
    public function __construct(
        protected AutorRepositoryInterface $autorRepository
    )
    {}
    public function buscaPorVariosNomes(array $nomes):array
    {
        $autores = [];
        foreach ($nomes as $nome) {
            if($autor = $this->buscaPeloNome($nome)){
                $autores[] = $autor;
            }else{
                $novoAutor = new AutorDTO($nome);
                $autores[] = $this->autorRepository->salvar($novoAutor);
            }
        }

        return $autores;
    }
    public function buscaPeloNome(string $nome):Autor
    {
        return $this->autorRepository->buscaPeloNome($nome);
    }

    public function salvar(AutorDTO $autorDTO):Autor
    {
        return $this->autorRepository->salvar($autorDTO);
    }
}