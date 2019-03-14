let ROOT = "CSS-",
    ID = 0,
    REGEXP_IMPORT = /@import url\([^)]*\)(;){0,1}/,
    REGEXP_AL = /@(\w+)([^{}]*){([^{}]+)}/g,
    REGEXP_HOST = /:host(?:\(([^()]*)\)){0,1}/g,
    REGEXP_RULE = /([^{}]+)({([^{}}]*)})/g,
    REGEXP_ANIMATION = /(animation(?:\-name){0,1})(?:\s*):(?:\s*)([^\s]*)/,
    CACHE = {};

export let options = { sheet: true };

function parse(HOST, css) {
    let indexRule = -1,
        imports = [],
        saveRules = {},
        nextRules = [],
        regExpHost = new RegExp(
            "\\." + HOST.replace(/([^a-zA-Z]+)/g, "\\$1"),
            "g"
        );
    css.replace(REGEXP_IMPORT, all => {
        imports.push(all);
        return "";
    })
        .replace(REGEXP_RULE, (all, selector, content) => {
            indexRule++;
            selector = selector.trim();
            saveRules[indexRule] = prefixRule(selector, content);
            return `<${indexRule}>`;
        })
        .replace(REGEXP_AL, (all, selector, option, content) => {
            option = option.trim();
            switch (selector) {
                case "media":
                    nextRules.push(
                        `@${selector}${option}{${resolveRules(content)}}`
                    );
                    break;
                case "keyframes":
                    nextRules.push(
                        `@${selector} ${HOST + "-" + option}{${resolveRules(
                            content
                        ).replace(regExpHost, "")}}`
                    );
                    break;
            }
        });

    function resolveRules(content) {
        return content.replace(/<(\d+)>/g, (all, indexRule) => {
            let rule = saveRules[indexRule];
            delete saveRules[indexRule];
            return rule;
        });
    }

    function prefixRule(selector, content) {
        return (
            selector
                .split(",")
                .map(selector => {
                    if (/:host/.test(selector)) {
                        return selector.replace(
                            REGEXP_HOST,
                            (all, option) => "." + HOST + (option || "")
                        );
                    } else {
                        return "." + HOST + " " + selector;
                    }
                })
                .join(",") +
            content.replace(
                REGEXP_ANIMATION,
                (all, property, name) => `${property}:${HOST}-${name}`
            )
        );
    }
    for (let key in saveRules) nextRules.unshift(saveRules[key]);
    return imports.concat(nextRules);
}

export function css(string, ...args) {
    string = string.map((str, index) => str + (args[index] || "")).join("");

    let doc = options.document || document;

    if (CACHE[string]) return CACHE[string];

    let HOST = ROOT + ID++;

    let rules = parse(HOST, string);

    let style = doc.querySelector("#" + HOST);

    if (!style) {
        style = doc.createElement("style");
        doc.head.appendChild(style);
        style.id = HOST;
    }
    if (options.sheet) {
        rules.map((rule, index) => {
            style.sheet.insertRule(rule, index);
        });
    } else {
        style.innerHTML = rules.join("\n");
    }

    return (CACHE[string] = HOST);
}
