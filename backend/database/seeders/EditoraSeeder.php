<?php

namespace Database\Seeders;

use App\Models\Editora;
use Illuminate\Database\Seeder;

class EditoraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Editora::create(['edi_nome' => 'Companhia das Letras']);
        Editora::create(['edi_nome' => 'Editora Record']);
        Editora::create(['edi_nome' => 'Editora Ática']);
        Editora::create(['edi_nome' => 'Editora Globo']);
        Editora::create(['edi_nome' => 'Saraiva']);
        Editora::create(['edi_nome' => 'Editora Abril']);
        Editora::create(['edi_nome' => 'Editora FTD']);
        Editora::create(['edi_nome' => 'Penguin Companhia']);
        Editora::create(['edi_nome' => 'Rocco']);
        Editora::create(['edi_nome' => 'HarperCollins Brasil']);
        Editora::create(['edi_nome' => 'L&PM Pocket']);
        Editora::create(['edi_nome' => 'Martins Fontes']);
        Editora::create(['edi_nome' => 'Zahar']);
        Editora::create(['edi_nome' => 'Antofágica']);
        Editora::create(['edi_nome' => 'Nova Fronteira']);
        Editora::create(['edi_nome' => 'Autêntica']);
        Editora::create(['edi_nome' => 'Planeta']);
        Editora::create(['edi_nome' => 'Ediouro']);
        Editora::create(['edi_nome' => 'Pallas Editora']);
        Editora::create(['edi_nome' => 'Editora Brasiliense']);
        Editora::create(['edi_nome' => 'Editora 34']);
        Editora::create(['edi_nome' => 'Companhia de Bolso']);
    }
}
