<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PrimeiroAcesoRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'email' => 'required|email|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'O email é obrigatório.',
            'email.email' => 'Insira um email válido.',
            'email.max' => 'Deve ter no másimo 255 caracteres.',
        ];
    }
}
