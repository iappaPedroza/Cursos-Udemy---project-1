import { Component } from "react";

export default class User extends Component {
    state = {
    nameApp: 'Simulador de Posts',
    nameUsuario: 'Por Iappa Pedroza',
    descricao:  'Desenvolvido no Curso React Js + Next Js do Otávio Miranda - Udemy', 
    };
    render(){
        const { nameUsuario,  nameApp, descricao } = this.state;
        return (
            <header className="App-header">

            <h1>{nameApp}</h1>
            <p>{nameUsuario}</p>
            <p>{ descricao }</p>
            
          </header>  
        );  
    }
}