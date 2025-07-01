<?php

namespace App\Http\Controllers;

use App\DTOs\UsuarioDTO;
use App\Http\Requests\PlanilhaRequest;
use App\Http\Requests\UpdateUsuarioRequest;
use App\Http\Requests\UsuarioRequest;
use App\Http\Resources\UsuarioCollection;
use App\Http\Resources\UsuarioResource;
use App\Models\Usuario;
use Illuminate\Http\Request;
use App\Services\UsuarioService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Shared\Date as ExcelDate;
use Illuminate\Support\Str;

class UsuarioController extends Controller
{
    public function __construct(
        protected UsuarioService $usuarioService
    ) {}

    public function index(Request $request): JsonResponse
    {
        if ($request->all()) {
            return response()->json([
                'usuarios' => new UsuarioCollection($this->usuarioService->buscaTodosComPesquisa($request->all()))
            ], 200);
        }

        return response()->json([
            'usuarios' => new UsuarioCollection($this->usuarioService->buscaTodos())
        ], 200);
    }

    public function show(Usuario $usuario): JsonResponse
    {
        if ($usuario->usu_status != 0) {
            return response()->json([
                'usuario' => $usuario->load('emprestimo.livro.autores', 'emprestimo.livro.generos', 'emprestimo.livro.editora'),
            ], 200);
        }
        return response()->json([
            'message' => 'Usuário não encontrado ou desativado'
        ], 400);
    }

    public function check(Request $request): JsonResponse
    {
        return response()->json([
            'status' => $this->usuarioService->checkSenha($request->password)
        ], 200);
    }

    public function store(UsuarioRequest $request): JsonResponse
    {
        try {
            $usuarioDTO = new UsuarioDTO(
                $request->validated('usu_nome'),
                $request->validated('usu_dataNasc'),
                $request->validated('email'),
                null,
                0,
                $request->validated('usu_ra'),
                1,
            );

            return response()->json([
                'message' => 'Usuário criado com sucesso',
                'usuario' => new UsuarioResource($this->usuarioService->salvar($usuarioDTO)),
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function desativar(Usuario $usuario): JsonResponse
    {
        try {
            $this->usuarioService->deletar($usuario);
            return response()->json([
                'message' => 'Usuário deletado com sucesso'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function update(Usuario $usuario, UpdateUsuarioRequest $request): JsonResponse
    {
        try {
            $usuarioDTO = new UsuarioDTO(
                $request->validated('usu_nome'),
                $request->validated('usu_dataNasc'),
                $request->validated('email'),
                $request->input('password') ? $request->input('password') : $usuario->password,
                $usuario->usu_nivel,
                $request->validated('usu_ra'),
                $usuario->usu_status
            );

            $this->usuarioService->editar($usuario, $usuarioDTO);
            return response()->json([
                'message' => 'Usuário atualizado com sucesso.'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function enviarCodigoRedefinicao(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Link de redefinição enviado para o e-mail.'])
            : response()->json(['message' => 'Não foi possível enviar o link.'], 400);
    }

    public function redefinirSenha(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:6',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'Senha redefinida com sucesso.'])
            : response()->json(['message' => 'Erro ao redefinir a senha.'], 400);
    }


    public function reativar(Usuario $usuario): JsonResponse
    {
        try {
            $usuarioReativado = $this->usuarioService->reativar($usuario);

            return response()->json([
                'message' => 'Usuário reativado com sucesso.',
                'usuario' => new UsuarioResource($usuarioReativado)
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function planilha(PlanilhaRequest $request): JsonResponse
    {
        $path = $request->file('arquivo')->getRealPath();
        $spreadsheet = IOFactory::load($path);
        $sheet = $spreadsheet->getActiveSheet();
        $linhas = $sheet->toArray();


        Usuario::where('usu_nivel', 0)->update(['usu_status' => 0]);

        foreach (array_slice($linhas, 1) as $linha) {
            [$nome, $dataNasc, $ra, $email] = $linha;


            try {
                if (is_numeric($dataNasc)) {
                    $dataFormatada = ExcelDate::excelToDateTimeObject($dataNasc)->format('Y-m-d');
                } else {
                    $dataFormatada = Carbon::parse($dataNasc)->format('Y-m-d');
                }
            } catch (Exception $e) {
                Log::error("Erro ao converter data para o RA {$ra}: " . json_encode($linha) . " - Erro: " . $e->getMessage());
                continue;
            }


            $usuario = Usuario::where('email', '=', $email)->first();

            if ($usuario) {

                $usuario->update([
                    'usu_status' => 1,
                    'usu_nome' => $nome,
                    'usu_dataNasc' => $dataFormatada,
                    'email' => $email,
                ]);
            } else {

                Usuario::create([
                    'usu_nome' => $nome,
                    'usu_dataNasc' => $dataFormatada,
                    'email' => $email,
                    'usu_ra' => $ra,
                    'usu_nivel' => 0,
                    'usu_status' => 1,
                    'password' => Hash::make('senha123'),
                ]);
            }
        }

        return response()->json(['mensagem' => 'Importação concluída com sucesso.'], 200);
    }

    public function punir(Usuario $usuario): JsonResponse
    {
        if ($usuario->usu_status == 1) {
            $usuario->usu_status = 3;
            $usuario->save();
            return response()->json(['message' => 'Usuário penalizado'], 200);
        } else if ($usuario->usu_status == 3) {
            $usuario->usu_status = 1;
            $usuario->save();
            return response()->json(['message' => 'Usuário liberado'], 200);
        }

        return response()->json(['message' => 'Erro ao punir usuário'], 400);
    }
}
