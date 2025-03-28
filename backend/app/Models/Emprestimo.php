<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Emprestimo extends Model
{

    protected string $table = "emp_emprestimo";
    protected string $primaryKey = "emp_id";

    protected array $fillable = [
        'emp_dataInicio',
        'emp_dataFim',
        'emp_status',
        'emp_quantRenovacao',
        'emp_status_ativo',
        'liv_id',
        'usu_id',
    ];

    public function livro():BelongsTo
    {
        return $this->belongsTo(Livro::class);
    }

    public function aluno():BelongsTo
    {
        return $this->belongsTo(Usuario::class);
    }
}
