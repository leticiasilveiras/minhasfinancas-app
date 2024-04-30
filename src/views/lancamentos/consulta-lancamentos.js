import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentosTable from './lancamentosTable';
import LancamentoService from '../../app/service/lancamentoService';
import LocalStorageService from '../../app/service/localstorageService';

import * as messages from '../../components/toastr';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
        

function ConsultaLancamentos(){
    const [ano, setAno] = useState('');
    const [mes, setMes] = useState(''); 
    const [tipo, setTipo] = useState('');
    const [lancamentos, setLancamentos] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [showCofirmDialog, setShowConfirmDialog] = useState(false);
    const [lancamentoDeletar, setLancamentoDeletar] = useState({});
    const navigate = useNavigate();
    const service = new LancamentoService();

    
    const handleNavigation = (path) => {
        navigate(path);
    }

    const buscar = () => {
        if(!ano){
            messages.mensagemErro('O preenchimento do campo Ano é obrigatório.')
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const lancamentoFiltro = {
            ano: ano,
            mes: mes,
            tipo: tipo,
            descricao: descricao,
            usuario: usuarioLogado.id

        }

        service.consultar(lancamentoFiltro)
        .then(resposta => {
            const lista = resposta.data;
            if(lista.length < 1){
                messages.mensagemAlerta("Nenhum resultado encontrado.");
            }
            setLancamentos(lista)
        }).catch(error => {
            console.log(error)
        });
    }

    const meses = service.obterListaMeses();
    const tipos = service.obterListaTipos();


    const editar = (id) => {
        handleNavigation(`/cadastro-lancamentos/${id}`);;
    }

    const abrirConfirmacao = (lancamento) => {
        setShowConfirmDialog(true); 
        setLancamentoDeletar(lancamento);
    }

    const cancelarDelecao = () => {
        setShowConfirmDialog(false);
        setLancamentoDeletar({});
    }

    const deletar = () => {
        service
        .deletar(lancamentoDeletar.id)
        .then(response => {
            setLancamentos(
                lancamentos.filter(
                    function(element) { 
                        return element !== lancamentoDeletar; 
                    }
                )
            );
            setShowConfirmDialog(false);
            messages.mensagemSucesso('Lançamento deletado com sucesso!');
        }).catch (error => {
            messages.mensagemErro('Não foi possível deletar o lançamento.')
        })
    }

    const preparaFormularioCadastro = () => {
        handleNavigation('/cadastro-lancamentos');
    }

    const alterarStatus = (lancamento, status) => {
        service.alterarStatus(lancamento.id, status)
        .then(response => { 
            buscar();
            messages.mensagemSucesso("Status atualizado com sucesso!")
        })
    }

    const confirmDialogFooter = (
        <div> 
            <Button label="Confirmar" icon="pi pi-check" onClick={deletar}/>
            <Button label="Cancelar" icon="pi pi-times" onClick={cancelarDelecao} outlined badge="" badgeClassName="p-badge-danger"/>
        </div>
    )

    return (
        <Card title="Consulta Lançamentos">
            <div className="row">
                <div className="col-md-6">
                    <div className="bs-component">
                        <FormGroup label="Ano: *" htmlFor="inputAno">
                            <input type='text' className='form-control' id='inputAno' value={ano}
                                    onChange={e => setAno(e.target.value)} 
                            placeholder='Digite o Ano'/>
                        </FormGroup>
                        <br/>
                        
                        <FormGroup label="Mês: " htmlFor="inputMes">
                            <SelectMenu id='inputMes' className='form-control' lista={meses}  value={mes}
                                    onChange={e => setMes(e.target.value)}/>
                        </FormGroup>
                        <br/>

                        <FormGroup label="Descrição: *" htmlFor="inputDesc">
                            <input type='text' className='form-control' id='inputDesc' value={descricao}
                                    onChange={e => setDescricao(e.target.value)} 
                            placeholder='Digite a Descrição'/>
                        </FormGroup>
                        <br/>

                        <FormGroup label="Tipo de  Lançamento: " htmlFor="inputTipo">
                            <SelectMenu id='inputTipo' className='form-control' lista={tipos}  value={tipo}
                                    onChange={e => setTipo(e.target.value)}/>
                        </FormGroup>
                        <br/>

                        <button onClick={buscar}
                                type='button' 
                                className='btn btn-success'>
                                <i className='pi pi-search'></i>  Buscar
                        </button>
                        <button onClick={preparaFormularioCadastro}
                                type='button' 
                                className='btn btn-danger'>
                                <i className='pi pi-plus'></i> Cadastrar
                        </button>
                    </div>
                </div>
            </div>
            <br/>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='bs-component'>
                        <LancamentosTable lancamentos={lancamentos} 
                                          deleteAction={abrirConfirmacao}
                                          editAction={editar}
                                          alterarStatus={alterarStatus}/>
                    </div>                   
                </div>
            </div>
            <div>
                <Dialog header="Confirmação" visible={showCofirmDialog} style={{width: '50vw'}}  footer={confirmDialogFooter} modal={true} onHide={() => showCofirmDialog(false)}>
                    <p>
                        Confirme a exclusão deste lançamento.
                    </p>
                </Dialog>
            </div>
        </Card>
    )
}

export default ConsultaLancamentos;