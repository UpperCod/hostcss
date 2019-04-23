import { createElement as h, render, createRef } from "react";
import ReactDOM from "react-dom";
import styled from "../src/react/index";

describe("component", () => {
	test("", () => {
		let scope = document.createElement("div");
		let Button = styled("button")`
			width: 100px;
			height: 100px;
			&.is-active {
				background: black;
			}
		`;

		ReactDOM.render(<Button active />, scope);

		let current = scope.querySelector("button");

		expect(current.className).toMatch("is-active");
	});
});
