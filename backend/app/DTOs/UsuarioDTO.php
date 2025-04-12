<?php

namespace App\DTOs;

class UsuarioDTO
{
    public function __construct(
        readonly string $nome,
        readonly string $dataNascimento,
        readonly string $email,
        readonly string $senha,
        readonly int $nivel,
        readonly string $ra,
        readonly int $status,
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
