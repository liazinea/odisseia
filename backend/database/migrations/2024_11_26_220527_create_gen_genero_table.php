<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('gen_genero', function (Blueprint $table) {
            $table->id('gen_id');
            $table->string('gen_nome');
            $table->integer('gen_status_ativo')->default(1);
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('gen_genero');
    }
};
