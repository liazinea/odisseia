<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('edi_editora', function (Blueprint $table) {
            $table->id('edi_id');
            $table->string('edi_nome');
            $table->integer('edi_status_ativo');
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('edi_editora');
    }
};
