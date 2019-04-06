import parse from "./parse";
import insertStyle from "./insertStyle";
import { join } from "./utils";

export default function createStyled(pragma) {
	return function styled(type) {
		return function css(values) {
			let string = join(values, arguments);

			let [host, rules, states, vars] = parse(string);

			rules.reverse();

			insertStyle(host, rules);

			function component(props) {
				let nextProps = {},
					style = {},
					className = host;
				for (let key in props) {
					let value = props[key];
					if (key in states) {
						if (value) className += " is-" + key;
					} else if (key in vars) {
						if (value) style["--" + vars[key]] = value;
					} else {
						nextProps[key] = value;
					}
				}
				nextProps.style = style;
				nextProps.className = className;
				return pragma(type, nextProps);
			}

			component.host = host;

			component.toString = () => "." + host;

			return component;
		};
	};
}
