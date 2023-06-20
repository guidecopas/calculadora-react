import React, { Component } from "react";
import './App.css';
import "./Calculadora.css"
import Botoes from "./components/Botoes";
import Display from "./components/Display";

const valoresIniciais = {
    valorDisplay: "0",
    valoresMemoria: [0, 0],
    casaAtual: 0,
    operacao: null,
    limparDisplay: false
}


export default class Calculadora extends Component {

    constructor(props) {
        super(props);
        this.limparMemoria = this.limparMemoria.bind(this)
        this.adicionarValores = this.adicionarValores.bind(this)
        this.adicionarOperacao = this.adicionarOperacao.bind(this)
    }

    state = {
        ...valoresIniciais
    }

    limparMemoria = () => {
        this.setState(valoresIniciais);
    }

    apagarDigito = () => {
        try {
            const valor = this.state.valorDisplay
            if (valor === "0") {
                return;
            }
            const valorArray = valor.split("");
            valorArray.pop();
            const novoValor = valorArray.join("");
            const novosValores = [...this.state.valoresMemoria];
            novosValores[this.state.casaAtual] = parseFloat(novoValor);
            this.setState({ valorDisplay: novoValor || "0", valoresMemoria: novosValores });
        } catch (error) {
        }
    }

    adicionarValores = (digito) => {

        if (digito === "." && this.state.valorDisplay.includes(".")) {
            return;
        }

        const limparDisplay = (this.state.valorDisplay === "0" && digito !== ".") || this.state.limparDisplay;
        const valorAtual = limparDisplay ? "" : this.state.valorDisplay;
        const valorDisplay = valorAtual + digito;

        this.setState({ valorDisplay, limparDisplay: false });

        if (digito !== ".") {
            const casa = this.state.casaAtual;
            const novoValor = parseFloat(valorDisplay);
            const novosValores = [...this.state.valoresMemoria];
            novosValores[casa] = novoValor;
            this.setState({ valoresMemoria: novosValores });
        }
    }

    adicionarOperacao = (operacao) => {
        if (this.state.casaAtual === 0) {
            this.setState({ operacao, casaAtual: 1, limparDisplay: true });
        } else {
            const operacaoAtual = this.state.operacao;
            const igual = operacao === "=";

            const valores = [...this.state.valoresMemoria];
            try {
                // eslint-disable-next-line no-eval
                valores[0] = eval(`${valores[0]} ${operacaoAtual} ${valores[1]}`);
            } catch (err) { console.log(err) }
            valores[1] = 0;

            this.setState({
                valorDisplay: valores[0],
                operacao: igual ? null : operacao,
                casaAtual: igual ? 0 : 1,
                limparDisplay: !igual,
                valoresMemoria: valores
            })
        }
    }

    render() {
        return (
            <div className="calculadora">
                <Display value={this.state.valorDisplay} />
                <Botoes label="AC" double clear click={this.limparMemoria} />
                <Botoes label="C" clear click={this.apagarDigito} />
                <Botoes label="/" operation click={this.adicionarOperacao} />
                <Botoes label="7" click={this.adicionarValores} />
                <Botoes label="8" click={this.adicionarValores} />
                <Botoes label="9" click={this.adicionarValores} />
                <Botoes label="*" operation click={this.adicionarOperacao} />
                <Botoes label="4" click={this.adicionarValores} />
                <Botoes label="5" click={this.adicionarValores} />
                <Botoes label="6" click={this.adicionarValores} />
                <Botoes label="-" operation click={this.adicionarOperacao} />
                <Botoes label="1" click={this.adicionarValores} />
                <Botoes label="2" click={this.adicionarValores} />
                <Botoes label="3" click={this.adicionarValores} />
                <Botoes label="+" operation click={this.adicionarOperacao} />
                <Botoes label="0" double click={this.adicionarValores} />
                <Botoes label="." click={this.adicionarValores} />
                <Botoes label="=" operation click={this.adicionarOperacao} />
            </div>
        );
    }
}