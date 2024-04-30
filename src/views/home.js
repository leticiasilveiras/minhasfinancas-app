import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

import UsuarioService from "../app/service/usuarioService";
import LocalStorageService from "../app/service/localstorageService";

function Home(){

    const [saldo, setSaldo] = useState(0);
    const usuarioService = new UsuarioService();
    const navigate = useNavigate();

    useEffect(() => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        usuarioService
            .obterSaldoPorUsuario(usuarioLogado.id)
            .then(response => {
                setSaldo(response.data)
            }).catch(error => {
            console.error(error.response);
            });
    })

    const handleNavigation = (path) => {
        navigate(path);
    }
    
    return (
        <div className="jumbotron">
            <h1 className="display-3">Bem-vindo!</h1>
            <p className="lead">Esse é seu sistema de finanças.</p>
            <p className="lead">Seu saldo para o mês atual é de R${saldo}</p>
            <hr className="my-4"/>
            <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo</p>
            <p className="lead">
                <button className="btn btn-lg btn-primary" 
                    onClick={() => handleNavigation('/cadastro-usuario')}
                >
                    <i className="pi pi-users"/> Cadastrar Usuário
                </button>
                <button className="btn btn-lg btn-danger" 
                    onClick={() => handleNavigation('/cadastro-lancamentos')}
                >
                    <i className="pi pi-money-bill"/> Cadastrar Lançamento
                </button>
            </p>
        </div>
    )
}

export default Home;