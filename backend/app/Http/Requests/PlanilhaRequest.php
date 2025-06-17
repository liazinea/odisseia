<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlanilhaRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'arquivo' => 'required|file|mimes:xlsx,xls',
        ];
    }

    public function messages(): array
    {
        return [
            'arquivo.required' => 'O arquivo da planilha é obrigatório.',
            'arquivo.file'     => 'O arquivo enviado não é válido.',
            'arquivo.mimes'    => 'O arquivo deve ser do tipo .xlsx ou .xls (Excel).',
        ];
    }
}
