import React, { useState } from "react";
import Card from '../components/card'
import FormGroup from "../components/form-group";
import {useNavigate} from "react-router-dom";

import UsuarioService from "../app/service/usuarioService";
import LocalStorageService from "../app/service/localstorageService";
import { mensagemErro } from '../components/toastr'

function Login(props){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const service = new UsuarioService();

    const entrar = () => {
        service.autenticar({
            email: email,
            senha: senha
        }).then(response => {
            LocalStorageService.adicionarItem('_usuario_logado', response.data)
            handleNavigation('/home');
        }).catch(erro => {
            mensagemErro(erro.response.data)
        })
    }

    const handleNavigation = (path) => {
        navigate(path);
    }
    

    return (
        <div className="row">
            <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
                <div className="bs-docs-section">
                    <Card title="Login">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <fieldset>
                                        <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                        <input type="email" value={email} onChange={e => setEmail(e.target.value)}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Digite o Email">
                                        </input>
                                        </FormGroup>
                                        <br/>
                                        <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                        <input type="password" value={senha} onChange={e => setSenha(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password">
                                        </input>
                                        </FormGroup>
                                        <br/>
                                        <button onClick={entrar} 
                                                className="btn btn-success">
                                                <i className="pi pi-sign-in"></i> Entrar
                                        </button>
                                        <button onClick={() => handleNavigation('/cadastro-usuario')} 
                                                className="btn btn-danger">
                                                <i className="pi pi-plus"></i> Cadastrar
                                        </button>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </Card>
                    </div>
            </div>
        </div>
    )
}

export default Login;