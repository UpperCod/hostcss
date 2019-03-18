interface ClassName{
    (states:Object):string;
    toString():string;
    id:string;
}

declare module "@atomico/hostcss"{
    export function css(stringCss:string[]|string):ClassName;
    export function keyframes(stringCss:string[]|string):string;
}