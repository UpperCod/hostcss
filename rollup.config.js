import pkg from "./package.json";

export default [
	{
		input: pkg.source,
		output: [
			{
				file: pkg.module,
				sourcemap: true,
				format: "es"
			}
		]
	},
	...["atomico", "react", "preact"].map(name => ({
		input: `src/${name}/index.js`,
		output: [
			{
				file: name + ".js",
				sourcemap: true,
				format: "es"
			}
		]
	}))
];
