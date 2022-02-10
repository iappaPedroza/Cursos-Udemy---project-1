import { Component } from 'react';

export class stateLessApp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: 'Iappa Pedroza',
      occupation: 'FullStack Developer'
    };
  }
  handlePClick() {
    alert('P Clicado via Método HandlePClick!');
  }
  render() {
    const { name } = this.state;
    var { occupation } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1>Olá Mundo da ITS New Era! [Statefull]</h1>
          <h3>
            I´m {name} here rolling up on React! -
          </h3>
          <p onClick={this.handlePClick}>
            {occupation}
          </p>
          <p>
            <a href="/">Clicar aqui vai gerar uma reação...</a>
          </p>
        </header>
      </div>
    );
  }
}
