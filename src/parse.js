const REG_NEST = /(&|@)([^{}]+)({([^{}]*)})/g;

export function replace(string, pattern, map) {
    return string.replace(pattern, map);
}
/**
 *
 * @param {*} host
 * @param {*} css
 */
export function parse(host, css) {
    let rules = [],
        imps = [],
        memo = {},
        ID = 0;
    /**
     * capture nested rules for later
     * unite them without nesting
     * @param {string} css
     */
    function nesting(css) {
        let nextCss = replace(css, REG_NEST, (all, type, selector, content) => {
            let index = ID++;
            memo[index] = [type, selector, content];
            return "$" + index;
        });
        if (nextCss !== css);

        return nextCss != css ? nesting(nextCss) : css;
    }
    /**
     * @param {string} host  - concurrent parent selector of nesting
     * @param {string} css - remaining CSS string
     * @param {array} rules  - list of rules
     */
    function join(host, css, rules = []) {
        return replace(css, /\$(\d+)/g, (all, id) => {
            let [type, selector, content] = memo[id];
            if (type == "&") {
                selector = host + selector;
                content = join(selector, content, rules);
                if (replace(content, /[{}\s\n]*/g, "")) {
                    rules.unshift(selector + content);
                }
            }
            if (type == "@" && /^media/.test(selector)) {
                let subRules = [];
                subRules.unshift(host + join(host, content, subRules));
                rules.push(`@${selector}{${subRules.join("")}}`);
            }
            return "";
        });
    }
    /**
     * Clean the used imports within the CSS, before defining the rules
     */
    css = replace(css, /@import url\([^()]+\)(;){0,1}/g, all => {
        imps.push(all);
        return "";
    });
    let scope = join(host, nesting(css), rules).trim();
    if (scope) rules.unshift(`${host}{${scope}}`);
    return imps.concat(rules);
}
