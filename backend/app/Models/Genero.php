<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Genero extends Model
{
    protected $table = 'gen_genero';
    protected $primaryKey = 'gen_id';
    protected $fillable = [
        'gen_nome',
        'gen_status_ativo',
    ];

    public function livros(): BelongsToMany
    {
        return $this->belongsToMany(
            Livro::class,
            'genero_livro',
            'gen_id',
            'liv_id'
        );
    }
}
