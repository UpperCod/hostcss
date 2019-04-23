import pkg from "./package.json";
import buble from "rollup-plugin-buble";
import { terser } from "rollup-plugin-terser";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";

let plugins = [
	buble({
		jsx: "h",
		objectAssign: "Object.assign"
	}),
	terser(),
	sizeSnapshot()
];

export default [
	{
		input: pkg.source,
		output: [
			{
				file: pkg.main,
				sourcemap: true,
				format: "cjs"
			},
			{
				file: pkg.unpkg,
				sourcemap: true,
				format: "umd",
				name: pkg.name,
				globals: {
					"@atomico/core": "@atomico/core"
				}
			},
			{
				file: pkg.module,
				sourcemap: true,
				format: "es"
			}
		],
		plugins
	},
	...["atomico", "react", "preact"].map(name => ({
		input: `src/${name}/index.js`,
		output: [
			{
				file: name + ".js",
				sourcemap: true,
				format: "cjs"
			},
			{
				file: name + ".umd.js",
				sourcemap: true,
				format: "umd",
				name: "hostcss-" + name
			},
			{
				file: name + ".mjs",
				sourcemap: true,
				format: "es"
			}
		],
		plugins
	}))
];
