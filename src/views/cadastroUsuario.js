import React, { useState } from "react";

import Card from '../components/card'
import FormGroup from "../components/form-group";
import {useNavigate} from "react-router-dom";

import UsuarioService from "../app/service/usuarioService";
import {mensagemSucesso, mensagemErro} from '../components/toastr'

function CadastroUsuario(){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState(''); 
    const [senha, setSenha] = useState('');
    const [senhaRepeticao, setSenhaRepeticao] = useState('');
    const navigate = useNavigate();
    const service = new UsuarioService();
    
    const cadastrar = () => {
        const usuario = {
            nome: nome,
            email: email,
            senha: senha,
            senhaRepeticao: senhaRepeticao
        }

        try{
            service.validar(usuario);
        }catch(erro){
            const msgs = erro.mensagens;
            msgs.forEach(msg => mensagemErro(msg))
            return false;
        }

        service.salvar(usuario)
            .then(response => {
                mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.');
                handleNavigation('/login');
            }).catch(error => {
                mensagemErro(error.response.data)
            } )
    }

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (   
        <Card title="Cadastro de Usuário">
            <div className="row">
                <div className="col-lg-12">
                    <div className="bs-component">
                        <FormGroup label="Nome: *" htmlFor="inputNome">
                            <input type="text" 
                                    id="inputNome"
                                    className="form-control" 
                                    name="nome"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}/>
                        </FormGroup>
                        <br/>
                        <FormGroup label="Email: *" htmlFor="inputEmail">
                            <input type="email" 
                                    id="inputEmail" 
                                    className="form-control" 
                                    name="email" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}/>
                        </FormGroup>
                        <br/>
                        <FormGroup label="Senha: *" htmlFor="inputSenha">
                            <input type="password" 
                                    id="inputSenha" 
                                    className="form-control" 
                                    name="senha" 
                                    value={senha}
                                    onChange={e => setSenha(e.target.value)}/>
                        </FormGroup>
                        <br/>
                        <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                            <input type="password" 
                                    id="inputRepitaSenha" 
                                    className="form-control" 
                                    name="repitaSenha"
                                    value={senhaRepeticao} 
                                    onChange={e => setSenhaRepeticao(e.target.value)}/>
                        </FormGroup>
                        <br/>
                        <button onClick={cadastrar} 
                                type="button" 
                                className="btn btn-success">
                                <i className="pi pi-save"></i> Salvar
                        </button>
                        <button onClick={() => handleNavigation('/login')} 
                                type="button" 
                                className="btn btn-danger">
                                <i className="pi pi-times"></i> Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </Card>  
    )
    }

export default CadastroUsuario;