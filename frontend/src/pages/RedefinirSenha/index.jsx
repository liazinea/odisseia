import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../../services/api';

const RedefinirSenha = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [msgSucesso, setMsgSucesso] = useState('');
  const [msgErro, setMsgErro] = useState('');

  const onSubmit = async (data) => {
    setMsgSucesso('');
    setMsgErro('');

    try {
      const response = await api.post('/usuarios/redefinir-senha', {
        token,
        email,
        password: data.password,
        password_confirmation: data.passwordConfirmation,
      });

      setMsgSucesso(response.data.message);
    } catch (error) {
      setMsgErro(error.response?.data?.message || 'Erro ao redefinir senha.');
    }
  };

  if (!token || !email) {
    return <p>Token ou email inválido.</p>;
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Redefinir Senha</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nova senha:</label>
          <input
            type="password"
            {...register('password', {
              required: 'A senha é obrigatória',
              minLength: { value: 6, message: 'Mínimo 6 caracteres' }
            })}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>

        <div>
          <label>Confirme a senha:</label>
          <input
            type="password"
            {...register('passwordConfirmation', {
              required: 'Confirmação obrigatória',
              validate: value => value === watch('password') || 'As senhas não conferem',
            })}
          />
          {errors.passwordConfirmation && <p style={{ color: 'red' }}>{errors.passwordConfirmation.message}</p>}
        </div>

        <button type="submit">Redefinir</button>
      </form>

      {msgSucesso && <p style={{ color: 'green' }}>{msgSucesso}</p>}
      {msgErro && <p style={{ color: 'red' }}>{msgErro}</p>}
    </div>
  );
};

export default RedefinirSenha;
