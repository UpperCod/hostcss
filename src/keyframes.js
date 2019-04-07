import { join, hash, clearCss } from "./utils";
import insertStyle from "./insertStyle";
export default function keyframes(values) {
	let string = join(values, arguments),
		host = hash(string);
	insertStyle(host, [`@keyframes ${host}{${clearCss(string)}}`]);
	return host;
}
