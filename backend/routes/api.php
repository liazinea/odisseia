<?php

use App\Http\Controllers\AutorController;
use App\Http\Controllers\EditoraController;
use App\Http\Controllers\EmprestimoController;
use App\Http\Controllers\GeneroController;
use App\Http\Controllers\LivroController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PrimeiroAcessoController;
use App\Http\Controllers\UsuarioController;
use App\Models\Usuario;
use Illuminate\Support\Facades\Route;

Route::controller(LoginController::class)->group(function () {
    Route::post('/login', 'autenticar');
});

Route::controller(UsuarioController::class)->group(function(){
    Route::post('/usuarios/enviar-codigo', 'enviarCodigoRedefinicao');
    Route::post('/usuarios/redefinir-senha', 'redefinirSenha');
});

Route::controller(PrimeiroAcessoController::class)->group(function(){
    Route::post('/criar-token', 'createToken');
});
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout']);

    Route::controller(LivroController::class)->group(function () {
        Route::get('/livros', 'index');
        Route::post('/livros', 'store');
        Route::delete('/livros/{livro}', 'delete');
        Route::get('/livros/{livro}', 'show');
        Route::put('/livros/{livro}', 'update');
        Route::get('/livros-por-genero', 'livrosPorGenero');
    });

    Route::controller(AutorController::class)->group(function () {
        Route::get('/autores', 'index');
        Route::get('/autores/nomes', 'nomes');
        Route::get('/autores/{autor}', 'show');
        Route::post('/autores', 'store');
        Route::patch('/autores/{autor}', 'delete');
        Route::put('/autores/{autor}', 'update');
    });

    Route::controller(GeneroController::class)->group(function () {
        Route::get('/generos', 'index');
        Route::get('/generos/nomes', 'nomes');
        Route::get('/generos/{genero}', 'show');
        Route::post('/generos', 'store');
        Route::patch('/generos/{genero}', 'delete');
        Route::put('/generos/{genero}', 'update');
    });

    Route::controller(EditoraController::class)->group(function () {
        Route::get('/editoras', 'index');
        Route::post('/editoras', 'store');
        Route::patch('/editoras/{editora}', 'delete');
        Route::put('/editoras/{editora}', 'update');
        Route::get('/editoras/nomes', [EditoraController::class, 'nomes']);
    });

    Route::controller(UsuarioController::class)->group(function () {
        Route::get('/usuarios', 'index');
        Route::get('/usuarios/{usuario}', 'show');
        Route::get('/check-senha', 'check');
        Route::post('/usuarios', 'store');
        Route::patch('/usuarios/{usuario}/desativar', 'desativar');
        Route::patch('/usuarios/{usuario}/reativar', 'reativar');
        Route::put('/usuarios/{usuario}', 'update');
        Route::patch('/usuarios/{usuario}/punicao', 'punir');
        Route::post('/usuarios/importar-planilha', 'planilha');
    });

    Route::controller(EmprestimoController::class)->group(function () {
        Route::get('/emprestimos', 'index');
        Route::post('/emprestimos', 'store');
        Route::patch('/emprestimos/{emprestimo}', 'atualizaEmprestimo');
        Route::patch('/renova-emprestimo/{emprestimo}', 'renovaEmprestimo');
    });
});
