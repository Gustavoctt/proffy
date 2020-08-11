import React from 'react';

import Input from '../../components/Input';

import './styles.css';
import logoImg from '../../assets/images/logo.svg';
import Textarea from '../../components/Textarea';

const Register: React.FC = () => {
  return (
      <div id="page-register">
          <div id="page-register-content">
              <div className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proff" />
                    <h2>Sua plataforma de estudos online.</h2>
                </div>

               
              </div>
              
                <form className="form-register">
                        <h2>Fazer login</h2>
                            <fieldset>
                                <Input
                                    name="name"
                                    label="Nome"
                                />

                                <Input
                                    name="email"
                                    label="E-mail"
                                />

                                <Input
                                    name="avatar"
                                    label="Avatar"
                                />

                                <Input
                                    name="whatsapp"
                                    label="Whatsapp"
                                />

                                <Textarea
                                    name="bio"
                                    label="Biografia"
                                />

                                <Input
                                    name="password"
                                    label="Password"
                                />

                                <Input
                                    name="password_confirmation"
                                    label="Confirmação de senhas"
                                />
                            </fieldset>

                        <button type="submit">Cadastrar</button>
                </form>

          </div>
      </div>
  );
}

export default Register;