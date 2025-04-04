<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CriaAutorRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'aut_nome' => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'aut_nome.required' => 'O nome do autor é obrigatório.',
            'aut_nome.string' => 'O nome do autor deve ser uma string.',
            'aut_nome.max' => 'O nome do autor não pode ultrapassar 255 caracteres.',
        ];
    }
}
