import {symbol} from "./input";

const pair = [
    '(\'"`[{'.split(''),
    ')\'"`]}'.split('')
]
const space = 'var let const return new delete typeof in else case throw yield async await'.split(' ');
const brace = 'function for if while switch catch'.split(' ');
export const TYPE = {
    backstep:"backstep",
    brace:"brace",
    function_brace:"function_brace",
}
export function checkRule(str){
    let type = ''
    if(pair[0].indexOf(str)!==-1){
        str += pair[1][pair[0].indexOf(str)];
        type = TYPE.backstep;
    } else if (space.indexOf(str)!==-1){
        str += ' ';
    } else if (brace.indexOf(str)!==-1){
        if(str === 'function'){
            type = TYPE.function_brace;
        }else{
            type = TYPE.brace;
        }
        str += ' (){\n'+symbol.tab+'\n}\n';
    }
    return {str,type};
}