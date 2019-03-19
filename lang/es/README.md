# @atomico/hostcss

Permite encapsular el css bajo un nombre de clase único, logrando un comportamiento similar a [styled-component](https://github.com/styled-components/styled-components), pero con un menor tamaño.

```js
import { css } from "@atomico/hostcss";

let className = css`
    width: 100%;
    height: 100%;
`;

document.querySelector("button").className = className;
```

> la función `css` siempre retornara un nombre de clase único dentro de `@atomico/hostcss`

## nesting

el soporte de anidamiento es básico, siga el siguiente ejemplo para componer por anidación de estilos, recuerde usar siempre el prefijo `&`

```js
css`
    & button {
        & span {
            font-size: 30px;
        }
        & i {
            font-size: 50px;
            &:hover {
                background: red;
            }
        }
    }
`;
```

## mediaquery

El formato de nesting tambien aplica a los mediaquery.

```js
css`
    & button {
        & i {
            font-size: 50px;
            @media (max-width: 320px) {
                font-size: 30px;
            }
        }
    }
`;
```

## keyframes

Keyframes retorna un id unico para la animacion

```js
import { keyframes, css } from "@atomico/hostcss";

let animation = keyframes`
    0%{background:transparent}
    100%{background:crimson}
`;

let button = `animation: ${animation} 1s ease alternate infinite;`;
```

## Estados

los estados son simplemente extensiones de nombre para className host, ud puede crearlos usando el retorno de `css` como función. 

```jsx
let className = css`
&--checked{
    background:teal;
    &:hover{color:white;}
}
&--active{
    background:black;
    &:hover{color:yellow}
}
`

document.querySelector("button").className = className({
    checked: 1,
    active:0
}) // <hash> <hash>--checked
```

## server render

Ud puede capturar todo el css generado definiendo `options.capture=[]`, pudiendo luego imprimirlo inline en su documento html, recuerde para mantener la interacción de hostcss sobre el className, debe nombrar su etiqueta inline de la siguiente forma `<style id="hostcss">/**inline-css**/</style>`.

### resalte la sintaxis

para facilitar la lectura de su css en js mediante el plugin [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components), este permite resaltar la sintaxis y autocompletar  propiedades.