<?php

use App\Http\Controllers\LivroController;
use Illuminate\Support\Facades\Route;

Route::controller(LivroController::class)->group(function(){
    Route::get('/livros', 'index');
    Route::post('/livros', 'store');
    Route::get('/livros/{livro}', 'show');
});
