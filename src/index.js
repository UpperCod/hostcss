import { parse } from "./parse";

export let options = { id: "hostcss" };
/**
 * It allows generating a unique id based on the given string
 * https://github.com/cristianbote/goober/blob/master/src/core/to-hash.js
 * @param {string} string - string to use to generate the id
 * @return {string}
 */
function toHash(string) {
    return "h0" + string.split("").reduce((out, i) => out + i.charCodeAt(0), 0);
}
/**
 * allows you to read the template string if it is given as an argument
 * @param {string} string
 * @param {array} [args]
 * @return {string}
 */
function toString(string, args) {
    if (Array.isArray(string)) {
        string = string
            .map((value, index) => value + (args[index + 1] || ""))
            .join("");
    }
    return string.replace(/\n/g, "");
}
/**
 * prints the stylo in the document, if options.capture, it is defined as
 * array, the use of the document will be avoided, inserting all the generated css into capture.
 * @param {string} id  -
 * @param {string} rules -
 */
function insertRules(id, rules) {
    if (!options.capture) {
        let style = document.getElementById(options.id);
        if (!style) {
            style = document.createElement("style");
            style.innerHTML = " ";
            style.id = options.id;
            document.head.appendChild(style);
        }
        let child = style.firstChild;
        if (child.data.indexOf(id) == -1) child.data += rules;
    } else {
        options.capture.push(rules);
    }
}

export function css(string) {
    string = toString(string, arguments);

    let id = toHash(string);

    insertRules(id, parse("." + id, string).join(""));

    return id;
}

export function keyframes(string) {
    string = toString(string, arguments);
    let id = toHash(string);
    insertRules(id, `@keyframes ${id}{${string}}`);
    return id;
}
