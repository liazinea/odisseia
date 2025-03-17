<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('emp_emprestimo', function (Blueprint $table) {
            $table->id('edp_id');
            $table->date('emp_dataInicio');
            $table->date('emp_dataFim');
            $table->integer('emp_status');
            $table->integer('emp_quantRenovacao');
            $table->integer('emp_status_ativo');
            $table->unsignedBigInteger('liv_id');
            $table->unsignedBigInteger('usu_id');
            $table->timestamps();

            $table->foreign('liv_id')->references('liv_id')->on('liv_livro');
            $table->foreign('usu_id')->references('usu_id')->on('usu_usuario');
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('emp_emprestimo');
    }
};
