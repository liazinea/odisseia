<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Penalidade extends Model
{
    protected string $table = "pen_penalidade";
    protected string $primaryKey = "pen_id";
    protected $fillable = [
        'pen_data',
        'usu_id',
        'emp_id',
    ];
}
