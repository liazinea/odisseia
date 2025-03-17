<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('con_configuracao', function (Blueprint $table) {
            $table->integer('con_diasEmprestimo');
            $table->integer('con_penalidade1');
            $table->integer('con_penalidade2');
            $table->integer('con_penalidade3');
            $table->integer('con_maximoRenovacao');
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('con_configuracao');
    }
};
