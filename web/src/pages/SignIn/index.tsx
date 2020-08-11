import React, { useState, useCallback, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Input from '../../components/Input';

import './styles.css';
import imageHeart from '../../assets/images/icons/purple-heart.svg';
import logoImg from '../../assets/images/logo.svg';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

const Login: React.FC = () => {
    const history = useHistory();
    const { signIn } = useAuth();
    const { addToast } = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();

            try {
                await signIn({
                    email,
                    password,
                });

                history.push('/lamding');
            } catch (err) {
                addToast({
                    type: 'error',
                    title: 'Erro na autenticação',
                    description: 'Ocorreu um erro ao fazer o login'
                });
            }
        }, [email, history, password, signIn, addToast],
    );

  return (
      <div id="page-login">
          <div id="page-login-content">
              <div className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proff" />
                    <h2>Sua plataforma de estudos online.</h2>
                </div>

               
              </div>
              
                <form onSubmit={handleSubmit} className="form-login">
                        <h2>Fazer login</h2>
                            <fieldset>
                                <Input
                                    name="email"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <Input
                                    name="password"
                                    placeholder="Senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </fieldset>

                        <div className="more-form">
                            <p>Lembrar-me</p>

                            <Link to="" className="find-password">Esqueci minha senha</Link>
                        </div>

                        <button type="submit">Entrar</button>
             
                        <footer>
                                <p>
                                    Não tem conta? <br/>
                                    <Link to="register" className="cad-new-user">Cadastre-se</Link>
                                </p>

                                <p>
                                    É de graça {'  '}
                                    <img src={imageHeart} alt="Aviso importante"/>
                                </p>
                        </footer>
                </form>

          </div>
      </div>
  );
}

export default Login;