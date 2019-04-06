import { join, hash } from "./utils";
import insertStyle from "./insertStyle";
export default function keyframes(values) {
	let string = join(values, arguments),
		host = hash(string);
	insertStyle(host, [`@keyframes ${host}{${string}}`]);
	return host;
}
