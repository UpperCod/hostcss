export function hash(string) {
	let id = 0,
		length = string.length;
	while (length) id += string[--length].charCodeAt(0);
	return "H0" + id; //.toString(32);
}

export function join(values, args) {
	return values.map((value, index) => value + (args[index + 1] || "")).join("");
}
