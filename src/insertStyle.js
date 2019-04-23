import options from "./options";

export default function insertStyle(host, rules) {
	let style = document.querySelector("style#" + host);

	if (!style) {
		style = document.createElement("style");
		style.id = host;
		style.innerHTML = " ";
		style.dataset.hostcss = "";
		document.head.appendChild(style);
	}

	if (options.showCss) {
		style.firstChild.data = rules.join("");
	} else {
		rules.forEach((rule, index) => {
			style.sheet.insertRule(rule, index);
		});
	}
}
