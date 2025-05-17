<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmprestimoRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'liv_id'=>'required:exists:liv_livro, liv_id',
            'usu_id'=>'required:exists:usu_usuario, usu_id'
        ];
    }

    public function messages(): array
    {
        return [
            'liv_id.required'=>'O livro é obrigatório.',
            'liv_id.exists'=>'O livro deve existir.',
            'usu_id.required'=>'O aluno é obrigatório.',
            'usu_id.exists'=>'O aluno deve existir.',
        ];
    }
}
