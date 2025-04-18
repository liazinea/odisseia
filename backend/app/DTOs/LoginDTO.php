<?php

namespace App\DTOs;

class LoginDTO
{
    public function __construct
    (
        protected readonly string $email,
        protected readonly string $password,
    ){}

    public function toArray():array
    {
        return [
            'email'=>$this->email,
            'password'=>$this->password
        ];
    }
}
