import LocalStorageService from "./localstorageService";

export default class AuthService{
    static removerUsuarioAutenticado(){
        LocalStorageService.removerItem('_usuario_logado')
    }
}