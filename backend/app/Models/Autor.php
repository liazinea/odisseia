<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Autor extends Model
{
    protected $table = 'aut_autor';
    protected $primaryKey = 'aut_id';
    protected $fillable = [
        'aut_nome'
    ];

    public function livros(): BelongsToMany
    {
        return $this->belongsToMany(
            Livro::class,
            'autor_livro',
            'aut_id',
            'liv_id'
        );
    }
}
