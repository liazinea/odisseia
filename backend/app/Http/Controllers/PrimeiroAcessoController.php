<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\PrimeiroAcesoRequest;
use App\Models\Usuario;
use App\Notifications\PrimeiroAcessoCodeNotification;
use Illuminate\Http\Request;


class PrimeiroAcessoController extends Controller
{
    public function createToken(PrimeiroAcesoRequest $request)
    {
        $usuario = Usuario::where('email', $request->validated('email'))
        ->where('password', '=', null)->first();
        if (!$usuario) {
            return response()->json(['message' => 'E-mail não encontrado.'], 404);
        }

        $code = random_int(100000, 999999);
        $usuario->usu_token_acesso = $code;
        $usuario->usu_token_code_expires_at = now()->addMinutes(15);
        $usuario->save();

       $usuario->notify(new PrimeiroAcessoCodeNotification($code));
        return response()->json(['message' => 'Código enviado ao e-mail.']);
    }

    public function validaToken(Request $request)
    {
        $usuario = Usuario::where('email', $request->email)->first();

        if (!$usuario) {
            return response()->json(['message' => 'E-mail não encontrado.'], 404);
        }

        if (
            $usuario->usu_token_acesso !== $request->code ||
            now()->greaterThan($usuario->usu_token_code_expires_at)
        ) {
            return response()->json(['message' => 'Código inválido ou expirado.'], 422);
        }

        $usuario->password = bcrypt($request->password);
        $usuario->usu_token_acesso = null;
        $usuario->usu_token_code_expires_at = null;
        $usuario->save();

        return response()->json(['message' => 'Senha definida com sucesso!']);
    }
}
