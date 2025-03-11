<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('autor_livro', function (Blueprint $table) {
            $table->unsignedBigInteger('liv_id');
            $table->unsignedBigInteger('aut_id');
            $table->timestamps();

            $table->foreign('liv_id')->references('liv_id')->on('liv_livro');
            $table->foreign('aut_id')->references('aut_id')->on('aut_autor');
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('autor_livro');
    }
};
