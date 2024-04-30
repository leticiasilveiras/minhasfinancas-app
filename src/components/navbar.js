import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthService from "../app/service/authService";
import LocalStorageService from "../app/service/localstorageService";

function Navbar(){
    const [isAuth, setAuth] = useState(false);
    const navigate = useNavigate();

    const usuarioAutenticado = () => {
        if(LocalStorageService.obterItem('_usuario_logado') != null){
            return true;
        }
        return false;
    }

    const handleNavigation = (path) => {
        navigate(path);
    }

    const deslogar = () => {
    AuthService.removerUsuarioAutenticado()
        handleNavigation('/login');
    }

    useEffect(() => {
        setAuth(usuarioAutenticado());
    })

    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="/home" className="navbar-brand">Minhas Finanças</a>
                    <button className="navbar-toggler" type="button"
                    data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false"
                    aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span> 
                    </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        {isAuth &&
                            <>  
                                <li className="nav-item">
                                    <div className="nav-link"  onClick={() => handleNavigation('/home')}>Home</div>    
                                </li>
                                <li className="nav-item">
                                    <div className="nav-link" onClick={() => handleNavigation('/cadastro-usuario')}>Usuários</div>
                                </li>
                                <li className="nav-item">
                                    <div className="nav-link" onClick={() => handleNavigation('/lancamentos')}>Lançamentos</div>
                                </li>
                                <li className="nav-item">
                                    <div className="nav-link" onClick={deslogar}>Sair</div>
                                </li>
                            </>
                        }           
                    </ul>
                </div>
            </div>     
        </div>
    )
}

export default Navbar