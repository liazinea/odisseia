<?php

use App\Http\Controllers\AutorController;
use App\Http\Controllers\GeneroController;
use App\Http\Controllers\LivroController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

Route::controller(LoginController::class)->group(function () {
    Route::post('/login', 'autenticar');
});

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');

    Route::controller(LivroController::class)->group(function(){
        Route::get('/livros', 'index');
        Route::post('/livros', 'store');
        Route::delete('/livros/{livro}', 'delete');
        Route::get('/livros/{livro}', 'show');
        Route::put('/livros/{livro}', 'update');
    });

    Route::controller(AutorController::class)->group(function(){
        Route::get('/autores', 'index');
        Route::get('/autores/{autor}', 'show');
        Route::post('/autores', 'store');
        Route::patch('/autores/{autor}', 'delete');
    });

    Route::controller(GeneroController::class)->group(function(){
        Route::get('/generos', 'index');
        Route::get('/generos/{genero}', 'show');
        Route::post('/generos', 'store');
        Route::patch('/generos/{genero}', 'delete');
        Route::put('/generos/{genero}', 'update');
    });
});
