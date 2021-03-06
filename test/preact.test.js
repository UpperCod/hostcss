import { h, render } from "preact";
import styled from "../src/preact/index";

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

		render(<Button active />, scope);

		let current = scope.querySelector("button");

		expect(current.className).toMatch("is-active");
	});
});
