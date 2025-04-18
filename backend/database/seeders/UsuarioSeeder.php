<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Criar alguns usuários de exemplo
        Usuario::create([
            'usu_nome' => 'João da Silva',
            'usu_dataNasc' => '2000-01-01',
            'email' => 'joao@example.com',
            'password' => Hash::make('senha123'), // Lembre-se de usar Hash::make para senhas
            'usu_nivel' => 0, // Aluno
            'usu_ra' => 123456,
            'usu_status' => 1, // Status ativo
        ]);

        Usuario::create([
            'usu_nome' => 'Maria Oliveira',
            'usu_dataNasc' => '1995-05-15',
            'email' => 'maria@example.com',
            'password' => Hash::make('senha123'),
            'usu_nivel' => 1, // Professor
            'usu_ra' => 654321,
            'usu_status' => 1,
        ]);


    }
}
