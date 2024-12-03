<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Livro extends Model
{
    protected $table = 'liv_livro';
    protected $primaryKey = 'liv_id';
    protected $fillable = [
        'liv_isbn',
        'liv_numRegistro',
        'liv_nome',
        'liv_qtdPaginas',
        'liv_dataPubli',
        'liv_edicao',
        'liv_classIndicativa',
        'liv_localizacao',
        'liv_sinopse',
        'liv_capa',
        'edi_id',
    ];

    public function generos(): BelongsToMany
    {
        return $this->belongsToMany(
            Genero::class,
            'genero_livro',
            'liv_id',
            'gen_id'
        );
    }

    public function autores(): BelongsToMany
    {
        return $this->belongsToMany(
            Autor::class,
            'autor_livro',
            'liv_id',
            'aut_id'
        );
    }

    public function editora(): BelongsTo
    {
        return $this->belongsTo(Editora::class, 'edi_id');
    }

    public function deletear():bool
    {

        $this->generos()->detach();
        $this->autores()->detach();

        return parent::delete();
    }
}
