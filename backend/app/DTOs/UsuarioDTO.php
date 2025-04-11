<?php

namespace App\DTOs;

class UsuarioDTO
{
    public function __construct(
        protected string $nome,
        protected string $dataNascimento,
        protected string $email,
        protected string $senha,
        protected int $nivel,
        protected string $ra,
        protected int $status,
    ){}

    public function toArray():array
    {
        return [
            'usu_nome'=>$this->nome,
            'usu_dataNasc'=>$this->dataNascimento,
            'email'=>$this->email,
            'password'=>$this->senha,
            'usu_nivel'=>$this->nivel,
            'usu_ra'=>$this->ra,
            'usu_status'=>$this->status,
        ];
    }
}
