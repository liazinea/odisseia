<?php

namespace App\Repositories;

interface LoginRepositoryInterface
{
    public function autenticar(array $credencials): bool;
}
