<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('liv_livro', function (Blueprint $table) {
            $table->id('liv_id');
            $table->string('liv_isbn');
            $table->string('liv_numRegistro')->unique();
            $table->string('liv_nome');
            $table->integer('liv_qtdPaginas');
            $table->date('liv_dataPubli');
            $table->unsignedBigInteger('edi_id');
            $table->bigInteger('liv_edicao');
            $table->string('liv_classIndicativa');
            $table->string('liv_localizacao');
            $table->text('liv_sinopse');
            $table->string('liv_capa');
            $table->integer('liv_status_ativo')->default(1);
            $table->timestamps();

            $table->foreign('edi_id')->references('edi_id')->on('edi_editora');
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('liv_livro');
    }
};
