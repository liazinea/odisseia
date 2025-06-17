<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditoraRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'edi_nome' => 'required|string|max:255|unique:edi_editora,edi_nome'
        ];
    }

    public function messages(): array
    {
        return [
            'edi_nome.required' => 'É obrigatório o envio do nome da editora.',
            'edi_nome.string' => 'O campo deve ser do tipo string.',
            'edi_nome.max' => 'O campo não pode ter mais de 255 caracteres.',
            'edi_nome.unique' => 'Já existe uma editora com este nome.',
        ];
    }
}
