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
        // Professor fixo
        Usuario::create([
            'usu_nome' => 'Maria Oliveira',
            'usu_dataNasc' => '1995-05-15',
            'email' => 'maria@example.com',
            'password' => Hash::make('senha123'),
            'usu_nivel' => 1, // Professor
            'usu_ra' => 654321,
            'usu_status' => 1,
        ]);

        // Alunos ativos (usu_nivel = 0, usu_status = 1)
        $alunosAtivos = [
            ['nome' => 'Ana Souza', 'nasc' => '2002-03-12', 'email' => 'ana.souza@example.com', 'ra' => 100001],
            ['nome' => 'Bruno Lima', 'nasc' => '2001-11-05', 'email' => 'bruno.lima@example.com', 'ra' => 100002],
            ['nome' => 'Carla Mendes', 'nasc' => '2000-07-20', 'email' => 'carla.mendes@example.com', 'ra' => 100003],
            ['nome' => 'Diego Silva', 'nasc' => '2003-01-15', 'email' => 'diego.silva@example.com', 'ra' => 100004],
            ['nome' => 'Eduarda Costa', 'nasc' => '2002-09-09', 'email' => 'eduarda.costa@example.com', 'ra' => 100005],
            ['nome' => 'Felipe Rocha', 'nasc' => '2001-06-17', 'email' => 'felipe.rocha@example.com', 'ra' => 100006],
            ['nome' => 'Gabriela Alves', 'nasc' => '2000-08-29', 'email' => 'gabriela.alves@example.com', 'ra' => 100007],
            ['nome' => 'Henrique Martins', 'nasc' => '2003-12-12', 'email' => 'henrique.martins@example.com', 'ra' => 100008],
            ['nome' => 'Isabela Fernandes', 'nasc' => '2002-05-03', 'email' => 'isabela.fernandes@example.com', 'ra' => 100009],
            ['nome' => 'Joana Pinto', 'nasc' => '2001-10-21', 'email' => 'joana.pinto@example.com', 'ra' => 100010],
            ['nome' => 'Lucas Barbosa', 'nasc' => '2000-04-25', 'email' => 'lucas.barbosa@example.com', 'ra' => 100011],
            ['nome' => 'Mariana Gomes', 'nasc' => '2003-03-07', 'email' => 'mariana.gomes@example.com', 'ra' => 100012],
            ['nome' => 'Nicolas Dias', 'nasc' => '2002-12-19', 'email' => 'nicolas.dias@example.com', 'ra' => 100013],
            ['nome' => 'Olívia Moreira', 'nasc' => '2001-08-14', 'email' => 'olivia.moreira@example.com', 'ra' => 100014],
            ['nome' => 'Pedro Henrique', 'nasc' => '2000-02-10', 'email' => 'pedro.henrique@example.com', 'ra' => 100015],
            ['nome' => 'Quésia Silva', 'nasc' => '2003-06-22', 'email' => 'quesia.silva@example.com', 'ra' => 100016],
            ['nome' => 'Rafael Souza', 'nasc' => '2002-07-11', 'email' => 'rafael.souza@example.com', 'ra' => 100017],
            ['nome' => 'Sofia Cardoso', 'nasc' => '2001-09-03', 'email' => 'sofia.cardoso@example.com', 'ra' => 100018],
            ['nome' => 'Thiago Santos', 'nasc' => '2000-11-30', 'email' => 'thiago.santos@example.com', 'ra' => 100019],
            ['nome' => 'Valentina Nunes', 'nasc' => '2003-01-25', 'email' => 'valentina.nunes@example.com', 'ra' => 100020],
            ['nome' => 'William Castro', 'nasc' => '2002-10-06', 'email' => 'william.castro@example.com', 'ra' => 100021],
            ['nome' => 'Yara Lima', 'nasc' => '2001-04-18', 'email' => 'yara.lima@example.com', 'ra' => 100022],
            ['nome' => 'Zeca Moreira', 'nasc' => '2000-09-28', 'email' => 'zeca.moreira@example.com', 'ra' => 100023],
            ['nome' => 'Alice Moraes', 'nasc' => '2003-07-12', 'email' => 'alice.moraes@example.com', 'ra' => 100024],
            ['nome' => 'Bruna Teixeira', 'nasc' => '2002-11-11', 'email' => 'bruna.teixeira@example.com', 'ra' => 100025],
            ['nome' => 'Caio Almeida', 'nasc' => '2001-03-30', 'email' => 'caio.almeida@example.com', 'ra' => 100026],
            ['nome' => 'Diana Rocha', 'nasc' => '2000-12-05', 'email' => 'diana.rocha@example.com', 'ra' => 100027],
            ['nome' => 'Emanuel Costa', 'nasc' => '2003-05-19', 'email' => 'emanuel.costa@example.com', 'ra' => 100028],
            ['nome' => 'Fernanda Dias', 'nasc' => '2002-08-08', 'email' => 'fernanda.dias@example.com', 'ra' => 100029],
            ['nome' => 'Gustavo Alves', 'nasc' => '2001-01-20', 'email' => 'gustavo.alves@example.com', 'ra' => 100030],
        ];

        foreach ($alunosAtivos as $aluno) {
            Usuario::create([
                'usu_nome' => $aluno['nome'],
                'usu_dataNasc' => $aluno['nasc'],
                'email' => $aluno['email'],
                'password' => Hash::make('senha123'),
                'usu_nivel' => 0,
                'usu_ra' => $aluno['ra'],
                'usu_status' => 1,
            ]);
        }

        // Alunos inativos (usu_nivel = 0, usu_status = 0)
        $alunosInativos = [
            ['nome' => 'André Moreira', 'nasc' => '2000-05-14', 'email' => 'andre.moreira@example.com', 'ra' => 200001],
            ['nome' => 'Beatriz Lima', 'nasc' => '2001-02-22', 'email' => 'beatriz.lima@example.com', 'ra' => 200002],
            ['nome' => 'Caetano Gomes', 'nasc' => '2002-10-10', 'email' => 'caetano.gomes@example.com', 'ra' => 200003],
            ['nome' => 'Daniela Santos', 'nasc' => '2003-06-06', 'email' => 'daniela.santos@example.com', 'ra' => 200004],
            ['nome' => 'Eduardo Martins', 'nasc' => '2000-11-11', 'email' => 'eduardo.martins@example.com', 'ra' => 200005],
            ['nome' => 'Fabiana Ribeiro', 'nasc' => '2001-07-23', 'email' => 'fabiana.ribeiro@example.com', 'ra' => 200006],
            ['nome' => 'Gabriel Costa', 'nasc' => '2002-01-01', 'email' => 'gabriel.costa@example.com', 'ra' => 200007],
            ['nome' => 'Helena Nunes', 'nasc' => '2003-08-14', 'email' => 'helena.nunes@example.com', 'ra' => 200008],
            ['nome' => 'Igor Almeida', 'nasc' => '2000-09-09', 'email' => 'igor.almeida@example.com', 'ra' => 200009],
            ['nome' => 'Juliana Pereira', 'nasc' => '2001-04-04', 'email' => 'juliana.pereira@example.com', 'ra' => 200010],
        ];

        foreach ($alunosInativos as $aluno) {
            Usuario::create([
                'usu_nome' => $aluno['nome'],
                'usu_dataNasc' => $aluno['nasc'],
                'email' => $aluno['email'],
                'password' => Hash::make('senha123'),
                'usu_nivel' => 0,
                'usu_ra' => $aluno['ra'],
                'usu_status' => 0,
            ]);
        }
    }
}
