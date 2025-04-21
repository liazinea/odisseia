<?php

namespace Database\Seeders;

use App\Models\Autor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AutorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       Autor::crete(['aut_nome'=>'Clarice Lispector']);
       Autor::crete(['aut_nome'=>'Maurício de Sousa']);
    }
}
