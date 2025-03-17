<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('aut_autor', function (Blueprint $table) {
            $table->id('aut_id');
            $table->string('aut_nome');
            $table->integer('aut_status_ativo');
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('aut_autor');
    }
};
