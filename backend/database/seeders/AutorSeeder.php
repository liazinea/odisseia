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
        Autor::create(['aut_nome' => 'Clarice Lispector']);
        Autor::create(['aut_nome' => 'Maurício de Sousa']);
        Autor::create(['aut_nome' => 'Machado de Assis']);
        Autor::create(['aut_nome' => 'Cecília Meireles']);
        Autor::create(['aut_nome' => 'Carlos Drummond de Andrade']);
        Autor::create(['aut_nome' => 'Monteiro Lobato']);
        Autor::create(['aut_nome' => 'Franz Kafka']);
        Autor::create(['aut_nome' => 'Jorge Amado']);
        Autor::create(['aut_nome' => 'José Saramago']);
        Autor::create(['aut_nome' => 'Fernando Pessoa']);
        Autor::create(['aut_nome' => 'J.K. Rowling']);
        Autor::create(['aut_nome' => 'Graciliano Ramos']);
        Autor::create(['aut_nome' => 'Guimarães Rosa']);
        Autor::create(['aut_nome' => 'Vinícius de Moraes']);
        Autor::create(['aut_nome' => 'Ariano Suassuna']);
        Autor::create(['aut_nome' => 'Carolina Maria de Jesus']);
        Autor::create(['aut_nome' => 'Érico Veríssimo']);
        Autor::create(['aut_nome' => 'William Shakespeare']);
        Autor::create(['aut_nome' => 'Fiodor Dostoiévski']);
        Autor::create(['aut_nome' => 'Liev Tolstói']);
        Autor::create(['aut_nome' => 'Edgar Allan Poe']);
        Autor::create(['aut_nome' => 'Isaac Asimov']);
        Autor::create(['aut_nome' => 'Charles Bukowski']);
        Autor::create(['aut_nome' => 'Simone de Beauvoir']);
        Autor::create(['aut_nome' => 'Albert Camus']);
        Autor::create(['aut_nome' => 'Friedrich Nietzsche']);
        Autor::create(['aut_nome' => 'Jean-Paul Sartre']);
        Autor::create(['aut_nome' => 'Mark Twain']);
        Autor::create(['aut_nome' => 'Oscar Wilde']);
    }
}
