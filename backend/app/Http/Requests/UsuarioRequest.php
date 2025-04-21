<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UsuarioRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'usu_nome'        => 'required|string|max:255',
            'usu_dataNasc'    => 'required|date|before:today',
            'email'           => 'required|email|unique:usu_usuario,email',
            'usu_ra'          => 'required|integer',
        ];
    }

    public function messages(): array
    {
        return [
            'usu_nome.required'         => 'O nome é obrigatório.',
            'usu_nome.string'           => 'O nome deve ser um texto.',
            'usu_nome.max'              => 'O nome não pode ter mais que 255 caracteres.',

            'usu_dataNasc.required'     => 'A data de nascimento é obrigatória.',
            'usu_dataNasc.date'         => 'A data de nascimento deve ser uma data válida.',
            'usu_dataNasc.before'       => 'A data de nascimento deve ser anterior à data atual.',

            'email.required'            => 'O e-mail é obrigatório.',
            'email.email'               => 'Informe um e-mail válido.',
            'email.unique'              => 'Este e-mail já está em uso.',

            'usu_ra.required'           => 'O RA é obrigatório.',
            'usu_ra.integer'            => 'O RA deve ser um número inteiro.',

        ];
    }
}
