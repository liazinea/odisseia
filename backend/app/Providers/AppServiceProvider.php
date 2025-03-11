<?php

namespace App\Providers;

use App\Repositories\AutorRepository;
use App\Repositories\AutorRepositoryInterface;
use App\Repositories\EditoraRepository;
use App\Repositories\EditoraRepositoryInterface;
use App\Repositories\GeneroRepository;
use App\Repositories\GeneroRepositoryInterface;
use App\Repositories\LivroRepository;
use App\Repositories\LivroRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{

    public function register(): void
    {
        $this->app->bind(LivroRepositoryInterface::class, function(){
            return new LivroRepository();
        });
        $this->app->bind(AutorRepositoryInterface::class, function(){
            return new AutorRepository();
        });
        $this->app->bind(EditoraRepositoryInterface::class, function(){
            return new EditoraRepository();  
        });
        $this->app->bind(GeneroRepositoryInterface::class, function(){
            return new GeneroRepository();
        });
    }

    public function boot(): void
    {
        //
    }
}
