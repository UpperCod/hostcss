import { parse, replace } from "./parse";

export let options = {};

let defer = Promise.resolve();
/**
 * It allows generating a unique id based on the given string
 * https://github.com/cristianbote/goober/blob/master/src/core/to-hash.js
 * @param {string} string - string to use to generate the id
 * @return {string}
 */
function toHash(string) {
    return "H0" + string.split("").reduce((out, i) => out + i.charCodeAt(0), 0);
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
    // minimal compression
    string = replace(string, /\n/g, "");
    string = replace(string, /:\s+/g, ":");
    string = replace(string, /\s+/g, " ");
    string = replace(string, /;\s+/g, ";");
    string = replace(string, /\s*\{\s+/g, "{");
    return replace(string, /\s+\}/g, "}");
}
/**
 * prints the stylo in the document, if options.capture, it is defined as
 * array, the use of the document will be avoided, inserting all the generated css into capture.
 * @param {string} id  -
 * @param {string} rules -
 */
function insertRules(id, rules) {
    let resolve = () => {
        if (!options.capture) {
            let style = document.querySelector("style#" + id);
            if (!style) {
                style = document.createElement("style");
                style.innerHTML = " ";
                style.id = id;
                document.head.appendChild(style);
            }
            if (options.inline) {
                let child = style.firstChild;
                rules = rules.join("");
                if (child.data.indexOf(id) == -1) child.data += rules;
            } else {
                let length = rules.length;
                for (let i = 0; i < length; i++)
                    style.sheet.insertRule(rules[i], i);
            }
        } else {
            options.capture.push([id, rules.join("")]);
        }
    };
    // to accelerate the process of rendering the css, the impression is associated
    // to a promise, allowing with this to capture blocking errors to the
    // use style.sheet
    options.capture ? resolve() : defer.then(resolve);
}

export function css(string) {
    string = toString(string, arguments);

    let id;

    string = replace(
        string,
        /\/(\*){1,}(\s*)@host(\s+)([\w]+)(\s*)(\*){1,}\//,
        (all, a, b, c, d) => {
            id = d;
            return "";
        }
    );

    id = id || toHash(string);

    insertRules(id, parse("." + id, string));

    function className(states) {
        let string = id;
        for (let key in states) {
            if (states[key]) {
                string += ` ${id}--${key}`;
            }
        }
        return string;
    }

    className.toString = className;

    className.id = id;

    return className;
}

export function keyframes(string) {
    string = toString(string, arguments);
    let id = toHash(string);
    insertRules(id, [`@keyframes ${id}{${string}}`]);
    return id;
}
