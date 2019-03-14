# @atomico/hostcss

permite mantener la sintaxis de css del shadowDom fuera del el y dentro del js, con la intención de escribir css mantenible tanto para el shadowDom como fuera de el.


```js
import {css} from "@atomico/hostcss";

let className = css`
    :host{
        width:100%;
        height:100%;
        animation: pulso 1s ease alternate infinite;
    }
    @keyframes{
        0%{background:teal}
        100%{background:black}
    }
`;

document.querySelector("button").className = className;
```

> la función `css` siempre retornara un nombre de clase único dentro de `@atomico/hostcss`

## Obervaciones importantes

### blindeo de keyframes

los keyframes posee un contexto solo dentro de la clase generada.

### reglas simples

Esta herramienta no busca ser un compilador complejo de css, ya que esta pensado para funcionar de forma simple en el navegador, su reducido tamaño se debe al uso de expresiones regulares, que pueden romperse con cierto selectores, ejemplo selectores por atributo que involucren caracteres asociativos a una regla css.

### resalte la sintaxis

ud puede facilitar la lectura de su css en js mediante el plugin [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components), este permite resaltar la sintaxis y autocompletar  propiedades.