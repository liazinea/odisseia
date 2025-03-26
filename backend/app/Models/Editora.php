<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Editora extends Model
{
    protected $table = 'edi_editora';
    protected $primaryKey = 'edi_id';

    protected $fillable = [
        'edi_nome',
        'edi_status_ativo',
    ];

    public function livros(): HasMany
    {
        return $this->hasMany(
            Livro::class,
            'edi_id',
            'edi_id'
        );
    }
}
