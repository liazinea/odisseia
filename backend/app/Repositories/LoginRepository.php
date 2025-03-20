<?php

namespace App\Repositories;

use Auth;

class LoginRepository implements LoginRepositoryInterface
{
    public function autenticar(array $credenciais):bool
    {
        return Auth::attempt($credenciais);
    }
}
