<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PrimeiroAcessoCodeNotification extends Notification
{
    use Queueable;

    protected string $code;

    public function __construct(string $code)
    {
        $this->code = $code;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Código de Primeiro Acesso')
            ->line('Você solicitou o código de primeiro acesso.')
            ->line("**Seu código é:** {$this->code}")
            ->line('Este código é válido por 15 minutos.')
            ->line('Se você não solicitou, ignore este e-mail.');
    }

    public function toArray(object $notifiable): array
    {
        return [];
    }
}
