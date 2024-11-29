<?php

use App\Http\Controllers\AutorController;
use App\Http\Controllers\GeneroController;
use App\Http\Controllers\LivroController;
use Illuminate\Support\Facades\Route;

Route::controller(LivroController::class)->group(function(){
    Route::get('/livros', 'index');
    Route::post('/livros', 'store');
    Route::get('/livros/{livro}', 'show');
});

Route::controller(AutorController::class)->group(function(){
    Route::get('/autores', 'index');
});

Route::controller(GeneroController::class)->group(function(){
    Route::get('/generos', 'index');
});
