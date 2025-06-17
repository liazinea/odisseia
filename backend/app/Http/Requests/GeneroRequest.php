<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GeneroRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'gen_nome'=>'required|string|max:255|unique:gen_autor,gen_nome',
        ];
    }

    public function messages():array
    {
        return [
            'gen_nome.required'=>'É obrigatório o envio do nome do gênero.',
            'gen_nome.string'=>'O campo deve ser do tipo string.',
            'gen_nome.max'=>'O campo não pode ter mais de 255 caracteres.',
            'gen_unique'=>'Já existe um gênero com tal nome.'
        ];
    }
}
