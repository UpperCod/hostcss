# @atomico/hostcss

A small alternative to [styled-components](https://www.styled-components.com/), allows the creation of static CSS with intelligent dynamic behavior.

```jsx
let Button = styled("button")`
	background: var(--bg);
	&.is-checked {
		color: red;
	}
`;

<Button bg="tomato" checked />;
```

> Hostcss was created to work with atomic, but you can use `createStyled(createElement)` to associate it with another library that works with pragma

## state selector

Hostcss detects selectors that start with the prefix `.is-` and assumes that this is a property of the component.

```jsx
let Button = styled("button")`
	&.is-primary {
		background: white;
		color: palevioletred;
	}
`;

<Button primary />;
```

## dynamic properties

Hostcss detecta las [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) y asume que esta es una propiedad del componente.
```jsx
let Button = styled("button")`
	background: var(--bg);
	color: var(--theme-color);
`;

<Button bg="black" themeColor="black" />;
```