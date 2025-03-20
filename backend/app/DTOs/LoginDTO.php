<?php

namespace App\DTOs;

class LoginDTO
{
    public function __construct
    (
        protected readonly string $email,
        protected readonly string $senha
    ){}

    public function toArray():array
    {
        return [
            'usu_email'=>$this->email,
            'usu_senha'=>$this->senha
        ];
    }
}
