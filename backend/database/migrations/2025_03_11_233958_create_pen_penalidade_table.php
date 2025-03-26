<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('pen_penalidade', function (Blueprint $table) {
            $table->id('pen_id');
            $table->date('pen_data');
            $table->unsignedBigInteger('usu_id');
            $table->unsignedBigInteger('emp_id');
            $table->timestamps();

            $table->foreign('usu_id')->references('usu_id')->on('usu_usuario');
            $table->foreign('emp_id')->references('emp_id')->on('emp_emprestimo');
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('pen_penalidade');
    }
};
