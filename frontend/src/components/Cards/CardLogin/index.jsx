import BotaoForm from '../../Botao/BotaoForm'
import InputForm from '../../Inputs/InputForm'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import api from '../../../services/api'
import { useAuth } from '../../../context/AuthContext';
import { useState } from 'react';
import {
  useNavigate
} from 'react-router-dom';


const CardLogin = () => {
  const navigate = useNavigate(); 
  const [error, setError] = useState(null)
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      console.log('Token atual:', localStorage.getItem('token'));
      console.log('Usuário logado:', localStorage.getItem('user'));
      redirectByType()
    } catch (error) {
      console.error('Erro ao fazer login:', error.response?.data || error.message);
      setError(error.response.data.message)
    }
  };

  const redirectByType = () => {
    if(localStorage.getItem('type') == 1){
      console.log(localStorage.getItem('type'))
      navigate('/home-adm')
    }else{
      navigate('/home')
    }
  }

  return (
    <div className={styles.form}>
      <div className={styles.cardFundo}>
      {error && <p>{error}</p>}
        <h1 className={styles.cardTitulo}>Login</h1>
        <form  onSubmit={handleSubmit(onSubmit)}>
          <InputForm type={'email'} nomeCampo={"email"} placeholder={"E-mail"} required={true}  {...register('email', {
            required: 'O email é obrigatório',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Email inválido',
            },
          })} />
          <InputForm type={'password'} nomeCampo={"password"} placeholder={"Senha"} required={true}  {...register('password', {
            required: 'A senha é obrigatória',
            minLength: {
              value: 6,
              message: 'A senha deve ter pelo menos 6 caracteres',
            },
          })} />
          <div className={styles.botao}>
            <BotaoForm type={"submit"} nomeBotao={'entrar'} texto={'Entrar'} />
          </div>
          <div className={styles.texto}>
            <Link to={`/primeiro-acesso`}>
              <p>Primeiro acesso?</p>
            </Link>
            <Link to={`/esqueci-minha-senha`}>
              <p>Esqueci minha senha</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CardLogin