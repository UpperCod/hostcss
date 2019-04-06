# @atomico/hostcss

Una pequeña alternativa a [styled-components](https://www.styled-components.com/), permite la creación de CSS estático con comportamiento dinámico inteligente.

```jsx
let Button = styled("button")`
	background: var(--bg);
	&.is-checked {
		color: red;
	}
`;

<Button bg="tomato" checked />;
```

> Hostcss fue creado para trabajar con [Atomico](https://github.com/atomicojs/core), pero ud puede usar `createStyled(createElement)` para asociarlo a otra libreria que trabaje con pragma

## selector de estado

Hostcss detecta los selectores que comiencen con el prefijo `.is-` y asume que este es una propiedad del componente.

```jsx
let Button = styled("button")`
	&.is-primary {
		background: white;
		color: palevioletred;
	}
`;

<Button primary />;
```

## propiedades dinamica

Hostcss detecta las [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) y asume que esta es una propiedad del componente.
```jsx
let Button = styled("button")`
	background: var(--bg);
	color: var(--theme-color);
`;

<Button bg="black" themeColor="black" />;
```