<?php

use App\Http\Controllers\AutorController;
use App\Http\Controllers\GeneroController;
use App\Http\Controllers\LivroController;
use Illuminate\Support\Facades\Route;

Route::controller(LivroController::class)->group(function(){
    Route::get('/livros', 'index');
    Route::post('/livros', 'store');
    Route::delete('/livros/{livro}', 'delete');
    Route::get('/livros/{livro}', 'show');
    Route::put('/livros/{livro}', 'update');
});

Route::controller(AutorController::class)->group(function(){
    Route::get('/autores', 'index');
    Route::post('/autores', 'store');
    Route::patch('/autores/{autor}', 'delete');

});

Route::controller(GeneroController::class)->group(function(){
    Route::get('/generos', 'index');
});
