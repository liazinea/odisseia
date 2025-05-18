<?php

namespace App\Services;

use App\DTOs\AutorDTO;
use App\Models\Autor;
use App\Repositories\AutorRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class AutorService
{
    public function __construct(
        protected AutorRepositoryInterface $autorRepository
    )
    {}

    public function buscarTodos():null|Collection
    {
        return $this->autorRepository->buscarTodos();
    }

    public function buscaComPesquisa(string $param):null|Collection|Autor
    {
        return $this->autorRepository->buscaComPesquisa($param);
    }

    public function buscaPorVariosNomesOuCadastra(array $nomes):array
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

    public function buscaPeloNome(string $nome):Autor|null
    {
        return $this->autorRepository->buscaPeloNome($nome);
    }

    public function salvar(AutorDTO $autorDTO):Autor
    {
        return $this->autorRepository->salvar($autorDTO);
    }

    public function deletar(Autor $autor):bool
    {
        if($autor) {
            return $this->autorRepository->deletar($autor);
        }

        throw new \Exception('Erro ao excluir autor.');
    }

    public function atualizar(Autor $autor, AutorDTO $autorDTO):bool
    {
        return $this->autorRepository->atualizar($autor, $autorDTO);
    }
}
