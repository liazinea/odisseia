<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'usu_email'=>'required|email|max:255',
            'usu_senha'=>'required|string'
        ];
    }

    public function messages(): array
    {
        return [
            'usu_email.required'=>'O email é obrigatório.',
            'usu_email.email'=>'Insira um email válido.',
            'usu_email.max'=>'Deve ter no másimo 255 caracteres.',
            'usu_senha.required' => 'A senha é obrigatória.',
            'usu_senha.string' => 'A senha deve ser uma string.',
        ];
    }
}
