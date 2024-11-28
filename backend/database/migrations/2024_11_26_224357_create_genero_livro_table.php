<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('genero_livro', function (Blueprint $table) {
            $table->unsignedBigInteger('liv_id');
            $table->unsignedBigInteger('gen_id');
            $table->timestamps();

            $table->foreign('liv_id')->references('liv_id')->on('liv_livro');
            $table->foreign('gen_id')->references('gen_id')->on('gen_genero');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('genero_livro');
    }
};
