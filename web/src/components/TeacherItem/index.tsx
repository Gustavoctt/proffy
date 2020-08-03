import React from 'react';

import './styles.css';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

function TeacherItem(){
    return(
        <article className="teacher-item">
                    <header>
                        <img src="https://avatars1.githubusercontent.com/u/44401595?s=460&u=71939b487a5d2b5f5f630944697ef38610193449&v=4" alt="Gustavo Tartare"/>
                        <div>
                            <strong>Gustavo Tartare</strong>
                            <span>Química</span>
                        </div>
                    </header>
                        <p>
                            Entuasiata das melhores tecnologias.
                            <br/><br/>
                            Apaixonado por explodir coisas em laboratório.
                        </p>

                        <footer>
                            <p>
                                Preço/hora
                                <strong> R$ 80,00 </strong>
                            </p>
                            <button type="button">
                                <img src={whatsappIcon} alt="Whatsapp"/>
                                Entrar em contato
                            </button>
                        </footer>
                </article>
    )
}

export default TeacherItem;