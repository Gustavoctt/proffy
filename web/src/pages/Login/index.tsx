import React from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';

import './styles.css';
import imageHeart from '../../assets/images/icons/purple-heart.svg';
import proffyImage from '../../assets/images/proffy.svg';

const Login: React.FC = () => {
  return (
      <div id="page-login">
          <div id="page-login-content" className="container">
                <div className="image-principal">
                    <img 
                        src={proffyImage} 
                        alt="Aviso importante"
                        className="login-image"
                    />
                </div>
              
                <form className="form-login">
                        <h2>Fazer login</h2>
                            <fieldset>
                                <Input
                                    name="email"
                                    placeholder="E-mail"
                                />

                                <Input
                                    name="password"
                                    placeholder="Senha"
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
                                    <Link to="#" className="cad-new-user">Cadastre-se</Link>
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