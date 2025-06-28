<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\PrimeiroAcesoRequest;
use App\Mail\PrimeiroAcessoCodeMail;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class PrimeiroAcessoController extends Controller
{
    public function createToken(PrimeiroAcesoRequest $request)
    {
        $usuario = Usuario::where('email', $request->validated('email'))->first();
        if (!$usuario) {
            return response()->json(['message' => 'E-mail não encontrado.'], 404);
        }

        $code = random_int(100000, 999999);
        $usuario->first_access_code = $code;
        $usuario->first_access_code_expires_at = now()->addMinutes(15);
        $usuario->save();

        Mail::to($usuario->email)->send(new PrimeiroAcessoCodeMail($code));
        return response()->json(['message' => 'Código enviado ao e-mail.']);
    }
}
