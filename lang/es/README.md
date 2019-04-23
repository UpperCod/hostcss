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

Hostcss detecta los selectores que comiencen con el prefijo `.is-*` y asume que este es una propiedad de estado del componente.

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

Hostcss detecta las [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) y asume que esta es una propiedad variable del componente.

```jsx
let Button = styled("button")`
	background: var(--bg);
	color: var(--theme-color);
`;

<Button bg="black" themeColor="black" />;
```

## componente de plantilla

styled admite la entrega de un componente funcional como argumento para estructurar el retorno como plantilla

```jsx
function Template(props, host) {
	return (
		<div {...host(props)}>
			<button>{props.children}</button>
		</div>
	);
}

export default styled(Template)`
	width: 200px;
	height: 200px;
	& button {
		background: teal;
	}
`;
```

El segundo parámetro es requerido para generar con este los className y customProperties del host

## nested

El nested de hostcss se basa en el [borrador del estándar](https://drafts.csswg.org/css-nesting-1/).

```css
/** ❌ **/
width: 200px;
button {
	background: color;
}
/** ✔️ **/
width: 200px;
& button {
	background: color;
}
```

> recomiendo evitar el uso del patrón de BEM dentro de hostcss.
