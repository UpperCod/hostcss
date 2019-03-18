# @atomico/hostcss

[![npm](https://badgen.net/npm/v/@atomico/hostcss)](http://npmjs.com/@atomico/hostcss)
[![gzip](https://badgen.net/bundlephobia/minzip/@atomico/hostcss)](https://bundlephobia.com/result?p=@atomico/hostcss)

It allows to encapsulate the css under a unique className, achieving behavior similar to [styled-component](https://github.com/styled-components/styled-components), but with a smaller size.

```js
import { css } from "@atomico/hostcss";

let className = css`
    width: 100%;
    height: 100%;
`;

document.querySelector("button").className = className;
```

> the `css` function always returns a unique class name inside `@atomico/hostcss`

## nesting

the nesting support is basic, follow the following example to compose by nesting styles, remember to always use the prefix `&`

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
> do not use nesting with multiple selectors, `& h1,& h2, & h3{ &:hover{/****/} }`, it is not supported

## mediaquery

The nesting format also applies to the media query.

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

Keyframes return a unique id for animation

```js
import { keyframes, css } from "@atomico/hostcss";

let animation = keyframes`
    0%{background:transparent}
    100%{background:crimson}
`;

let button = `animation: ${animation} 1s ease alternate infinite;`;
```

### highlight the syntax

You can facilitate the reading of your CSS in js using the plugin [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components), this allows you to highlight the syntax and autocomplete properties.