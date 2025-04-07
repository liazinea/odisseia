<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens,HasFactory, Notifiable;

    protected  $table = 'usu_usuario';
    protected  $primaryKey = 'usu_id';
    protected $fillable = [
        'usu_nome',
        'usu_dataNasc',
        'email',
        'password',
        'usu_nivel',
        'usu_ra',
        'usu_status',
    ];

    public function emprestimo():HasOne
    {
        return $this->hasOne(Emprestimo::class,'emp_id');
    }

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
