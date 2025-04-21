<?php

namespace Database\Seeders;

use App\Models\Genero;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GeneroSeeder extends Seeder
{

    public function run(): void
    {
        Genero::create(['gen_nome' => 'Suspense']);
        Genero::create(['gen_nome' => 'Drama']);
    }
}
