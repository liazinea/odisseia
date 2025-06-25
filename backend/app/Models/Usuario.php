<?php

namespace App\Models;

use App\Notifications\ResetPasswordNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Carbon\Carbon;

class Usuario extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
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

    public function emprestimo(): HasMany
    {
        return $this->hasMany(Emprestimo::class, 'emp_id');
    }



    public function emprestimosVencidos()
    {
        return $this->emprestimo()
            ->where('emp_status', '=', 2)
            ->where('emp_dataFim', '<', Carbon::now());
    }


    protected $hidden = [
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }
}
