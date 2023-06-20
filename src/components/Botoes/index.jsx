import React from "react";
import "./Botoes.css"

export default function Botoes(props) {

    let classes = "botao "

    classes += props.operation ? "operation" : "";
    classes += props.double ? "double " : "";
    classes += props.clear ? "clear " : "";

    return (
        <button className={classes} onClick={e => props.click(e.target.innerHTML)}>{props.label}</button>
    );
}