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
        Genero::create(['gen_nome' => 'Romance']);
        Genero::create(['gen_nome' => 'Ficção Científica']);
        Genero::create(['gen_nome' => 'Fantasia']);
        Genero::create(['gen_nome' => 'Terror']);
        Genero::create(['gen_nome' => 'Aventura']);
        Genero::create(['gen_nome' => 'Poesia']);
        Genero::create(['gen_nome' => 'Biografia']);
        Genero::create(['gen_nome' => 'Autoajuda']);
        Genero::create(['gen_nome' => 'Ensaios']);
        Genero::create(['gen_nome' => 'História']);
        Genero::create(['gen_nome' => 'Policial']);
        Genero::create(['gen_nome' => 'Crônica']);
        Genero::create(['gen_nome' => 'Infantil']);
        Genero::create(['gen_nome' => 'Humor']);
        Genero::create(['gen_nome' => 'Filosofia']);
        Genero::create(['gen_nome' => 'Clássicos']);
        Genero::create(['gen_nome' => 'Conto']);
        Genero::create(['gen_nome' => 'Distopia']);
        Genero::create(['gen_nome' => 'Psicologia']);
        Genero::create(['gen_nome' => 'História em Quadrinhos']);
    }
}
