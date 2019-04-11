import parse from "../src/parse";
describe("parse", () => {
	test("basic", () => {
		let { rules } = parse(
			`
			width:100px;
			height:200px;
		`,
			"scope"
		);

		expect(rules.join("")).toBe(".scope{width:100px;height:200px;}");
	});
	test("nesting deep 1", () => {
		let { rules } = parse(
			`
			&:hover{
				width:100px;
				height:200px;
			}
		`,
			"scope"
		);

		expect(rules.join("")).toBe(".scope:hover{width:100px;height:200px;}");
	});
	test("nesting deep 2", () => {
		let { rules } = parse(
			`
			&:hover,
			&:active{
				color:red;
				&.button{
					background:red;
				}
			}
		`,
			"scope"
		);

		expect(rules.join("")).toBe(
			`.scope:hover,.scope:active{color:red;}.scope:hover.button,.scope:active.button{background:red;}`
		);
	});
});
