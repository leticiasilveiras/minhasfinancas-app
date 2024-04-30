import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localstorageService";

import * as messages from '../../components/toastr';


function CadastroLancamentos(){
    
    const { id } = useParams();
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');
    const [tipo, setTipo] = useState('');
    const [status, setStatus] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [atualizando, setAtualizando] = useState(false);
    const service = new LancamentoService();
    const navigate = useNavigate();
    
    const tipos = service.obterListaTipos();
    const meses = service.obterListaMeses();

    useEffect(() => {
        if(id){
            service.obterPorId(id)
                .then(response => {
                    setDescricao(response.data.descricao);
                    setValor(response.data.valor);
                    setMes(response.data.mes);
                    setAno(response.data.ano);
                    setTipo(response.data.tipo);
                    setStatus(response.data.status);
                    setUsuario(response.data.usuario);
                    setAtualizando(response.data.atualizando = true)
                }).catch(erro => {
                    messages.mensagemErro(erro.response.data)
                })
        }  
    }, [id])

    const submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const lancamento = {
            id: null,
            descricao: descricao,
            valor: valor,
            mes: Number(mes),
            ano: Number(ano),
            tipo: tipo,
            usuario: usuarioLogado.id
        }

        try{
            service.validar(lancamento)
        }catch(erro){
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => { messages.mensagemErro(msg)});
            return false;
        }

        service.salvar(lancamento)
            .then(response => {
                messages.mensagemSucesso('Lançamento cadastrado com sucesso!')
                handleNavigation('/lancamentos');
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
        
    }

    const atualizar = () => {
        const lancamento = {
            descricao: descricao,
            valor: valor,
            mes: Number(mes),
            ano: Number(ano),
            tipo: tipo,
            status: status,
            id: id,
            usuario: usuario
        }
        service.atualizar(lancamento)
            .then(response => {
                messages.mensagemSucesso('Lançamento atualizado com sucesso!')
                handleNavigation('/lancamentos');
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
        
    }

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <Card title={atualizando ? "Atualização de Lançamento" : "Cadastro de Lançamento"}>
            <div className="row">
                <div className="col-md-12">
                     <FormGroup id="inputDescricao" label="Descrição: *">
                        <input id="inputDescricao" type="text" className="form-control" 
                        value={descricao} onChange={e => setDescricao(e.target.value)} />
                     </FormGroup>
                </div>  
            </div>
            <div className="row">
                <div className="col-md-6">
                    <FormGroup id="inputAno" label="Ano: *">
                        <input id="inputAno" type="text" className="form-control"
                        value={ano} onChange={e => setAno(e.target.value)} /> 
                    </FormGroup>
                </div>
                <div className="col-md-6">
                    <FormGroup id="inputMes" label="Mês: *">
                        <SelectMenu id="inputMes" className="form-control" lista={meses}
                        value={mes} onChange={e => setMes(e.target.value)} />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <FormGroup id="inputValor" label="Valor:">
                        <input id="inputValor" type="text" className="form-control"
                        value={valor} onChange={e => setValor(e.target.value)} />
                    </FormGroup>
                </div>
                <div className="col-md-4">
                    <FormGroup id="inputTipo" label="Tipo: *">
                        <SelectMenu id="inputTupo" className="form-control" lista={tipos}
                        value={tipo} onChange={e => setTipo(e.target.value)} />
                    </FormGroup>
                </div>
                <div className="col-md-4">
                    <FormGroup id="inputStatus" label="Status: ">
                        <input id="inputStatus" type="text" className="form-control" value={status}disabled/>
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    { atualizando ?
                        (
                            <button onClick={atualizar} 
                                    className="btn btn-primary">
                                    <i className="pi pi-sync"></i> Atualizar
                            </button>
                        ) : (
                        <button onClick={submit} 
                                className="btn btn-success">
                                <i  className="pi pi-save"></i> Salvar
                        </button> 
                        )
                    }

                    <button onClick={() => handleNavigation('/lancamentos')} 
                            className="btn btn-danger">
                            <i className="pi pi-times"></i> Cancelar
                    </button>
                </div>
            </div>
        </Card>
    )
 }

export default CadastroLancamentos;