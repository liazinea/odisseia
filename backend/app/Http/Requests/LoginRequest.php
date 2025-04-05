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
            'email'=>'required|email|max:255',
            'password'=>'required|string'
        ];
    }

    public function messages(): array
    {
        return [
            'email.required'=>'O email é obrigatório.',
            'email.email'=>'Insira um email válido.',
            'email.max'=>'Deve ter no másimo 255 caracteres.',
            'password.required' => 'A senha é obrigatória.',
            'password.string' => 'A senha deve ser uma string.',
        ];
    }
}
