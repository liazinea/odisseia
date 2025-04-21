<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LivroRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }


    public function rules()
    {
        return [
            'liv_isbn' => 'required',
            'liv_numRegistro' => 'required|',
            'liv_nome' => 'required|string|max:255',
            'liv_qtdPaginas' => 'required|integer|min:1',
            'liv_dataPubli' => 'required|date',
            'liv_editora' => 'required|string|max:255',
            'liv_edicao' => 'required|string|max:100',
            'liv_classIndicativa' => 'required|string|max:50',
            'liv_localizacao' => 'required|string|max:255',
            'liv_sinopse' => 'required|string',
            'liv_capa' => 'required',
            'liv_autores' => 'required|array|min:1',
            'liv_autores.*' => 'string|max:255',
            'liv_generos' => 'required|array|min:1',
            'liv_generos.*' => 'string|max:255',
        ];
    }


    public function messages()
    {
        return [
            'liv_isbn.required' => 'O campo ISBN é obrigatório.',
            'liv_isbn.unique' => 'ISBN já cadastrado.',
            'liv_numRegistro.required' => 'O número de registro é obrigatório.',
            'liv_numRegistro.unique' => 'O número de registro informado já está cadastrado.',

            'liv_nome.required' => 'O nome do livro é obrigatório.',
            'liv_nome.string' => 'O nome do livro deve ser uma string.',
            'liv_nome.max' => 'O nome do livro não pode ultrapassar 255 caracteres.',

            'liv_qtdPaginas.required' => 'A quantidade de páginas é obrigatória.',
            'liv_qtdPaginas.integer' => 'A quantidade de páginas deve ser um número inteiro.',
            'liv_qtdPaginas.min' => 'A quantidade de páginas deve ser ao menos 1.',

            'liv_dataPubli.required' => 'A data de publicação é obrigatória.',
            'liv_dataPubli.date' => 'A data de publicação deve ser uma data válida.',

            'liv_editora.required' => 'O campo editora é obrigatório.',
            'liv_editora.string' => 'O campo editora deve ser um texto.',
            'liv_editora.max' => 'O campo editora não pode ter mais de 255 caracteres.',

            'liv_edicao.required' => 'O campo edição é obrigatório.',
            'liv_edicao.string' => 'O campo edição deve ser uma string.',
            'liv_edicao.max' => 'O campo edição não pode ultrapassar 100 caracteres.',

            'liv_classIndicativa.required' => 'A classificação indicativa é obrigatória.',
            'liv_classIndicativa.string' => 'A classificação indicativa deve ser uma string.',
            'liv_classIndicativa.max' => 'A classificação indicativa não pode ultrapassar 50 caracteres.',

            'liv_localizacao.required' => 'O campo localização é obrigatório.',
            'liv_localizacao.string' => 'O campo localização deve ser uma string.',
            'liv_localizacao.max' => 'O campo localização não pode ultrapassar 255 caracteres.',

            'liv_sinopse.required' => 'A sinopse é obrigatória.',
            'liv_sinopse.string' => 'A sinopse deve ser uma string.',

            'liv_capa.required' => 'O campo capa é obrigatório.',
            'liv_capa.image' => 'O campo capa deve ser uma imagem.',
            'liv_capa.mimes' => 'A imagem deve ser um arquivo do tipo: jpeg, png, jpg, gif, svg.',
            'liv_capa.max' => 'A imagem não pode exceder 2MB.',

            'liv_autores.required' => 'O campo autores é obrigatório.',
            'liv_autores.array' => 'O campo autores deve ser uma lista.',
            'liv_autores.min' => 'Deve haver ao menos um autor.',
            'liv_autores.*.string' => 'Cada autor deve ser um texto.',
            'liv_autores.*.max' => 'O nome do autor não pode ultrapassar 255 caracteres.',

            'liv_generos.required' => 'O campo gêneros é obrigatório.',
            'liv_generos.array' => 'O campo gêneros deve ser uma lista.',
            'liv_generos.min' => 'Deve haver ao menos um gênero.',
            'liv_generos.*.string' => 'Cada gênero deve ser um texto.',
            'liv_generos.*.max' => 'O nome do gênero não pode ultrapassar 255 caracteres.',
        ];
    }
}
