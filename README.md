# hostcss

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

## imports

```js
// for @atomico/core
import styled from "hostcss/atomico";
// for Preact
import styled from "hostcss/preact";
// for React
import styled from "hostcss/react";
// keyframes
import { keyframes } from "hostcss";
```

> Hostcss was created to work with atomico, but you can use `createStyled(createElement)` to associate it with another library that works with pragma

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

## template component

styled supports the delivery of a functional component as an argument to structure the return as a template

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

The second parameter is required to generate with this the host's className and customProperties

## nested

The nested hostcss is based on the [draft standard](https://drafts.csswg.org/css-nesting-1/).

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

> I recommend avoiding the use of the BEM pattern inside hostcss.
