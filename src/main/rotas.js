import React from "react";

import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Navbar from "../components/navbar";
import LocalStorageService from "../app/service/localstorageService";

const isUsuarioAutenticado = () => {
    if(LocalStorageService.obterItem('_usuario_logado') != null){
        return true;
    }
    return false;
}

function Rotas(){
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route element={<Login/>} path="/login" />
                <Route element={<CadastroUsuario/>} path="/cadastro-usuario" />
                
                <Route path="/home" element={isUsuarioAutenticado() ?
                    <Home/> : <Navigate replace to="/login" />  } 
                />
                <Route path="/lancamentos" element={isUsuarioAutenticado() ?
                    <ConsultaLancamentos/> : <Navigate replace to="/login" />  } 
                />
                <Route path="/cadastro-lancamentos/:id?" element={isUsuarioAutenticado() ?
                    <CadastroLancamentos/> : <Navigate replace to="/login" />  } 
                />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;