<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Editora extends Model
{
    protected $table = 'edi_editora';
    protected $primaryKey = 'edi_id';

    public function livros(): BelongsToMany
    {
        return $this->belongsToMany(
            Livro::class,
            'edi_id'
        );
    }
}
