// import tool from '../lib/tool'
import {textStyle} from './style'
// const keyword1 = [];
// const keyword2 = [];
// const reg = {
//     str:1,
//     comment:1,
//     keyword(){

//     }
// }
// function 
// // return 1
// var 
// let 
// new 
// typeof
// this
// for()
// const 
// var a=typeof 
//  this 
// in
// for()  while if else switch case default break 
// continue  await yield try catch finally throw
// // continue
// // delete
const keyword1 = ['var','new','const','let','typeof','in','function','this','true','false','null','undefined','async','delete','class','extends']; // var
const keyword2 = ['return','for','while','else if','if','else','switch','case','default','break','continue','await','yield','try','catch','finally','throw','export','import','from']; // return
const keyword3 = ['console','window','document','Date','Array','Object','Boolean','Number','String','alert','RegExp','Function']; // Date
// const sign = ['"', "'", "`", ",", ";", "\\:", "\\.", "\\(", "\\)", "\\{", "\\}", "\\[", "\\]", "\\+", "\\-", "\\*", "\\/", "_", "\\|", "\\", "\\&", "\\%", "\\$", "\\!", "\\<", "\\=", "\\>",  "\\^", "~", "@", "#"];
const sign = ['\\/','\\','\\(','\\)','\\[','\\]','\\{','\\}','\\+','\\-','\\*','\\=',',','\\.',':','%','_','\\$','@','#','\\^','\\|','!','~'];

const signBegin = '(^|(&lt;)|(&lt;)|[\\n;<> '+sign.join('')+'])';
const signEnd = '(['+sign.join('')+'\\n;<> ]|(&lt;)|(&lt;)|$)';

// const punc = ''
// const reg = {
//     str:1,
//     comment:1,
//     keyword(){

//     }
// }



function sp(str,cls){
    return '<span class="tc-js-'+cls+'">'+str+'</span>'
}

function _replace(str,reg,cls,word){
    return str.replace(reg,function(s){
        if(typeof word === 'string'){
            return s.replace(word,sp(word,cls));
        }else if(typeof word === 'object'){
            return s.replace(word,function(s2){
                return sp(s2,cls)
            });
        }
        return sp(s,cls);
    });
}

function replace(str,reg,cls,word){
    if(str.indexOf('</span>')!==-1){
        let _regExp = (typeof reg === 'string')?regExp(reg):reg[0];
        str=str.replace(_regExp,function(s1){
            // 只有字符串
            let _regExp2 = (typeof reg === 'string')?new RegExp(reg,'g'):reg[1];
            return _replace(s1,_regExp2,cls,word);
        });
    }else{
        let _regExp = (typeof reg === 'string')?new RegExp(reg,'g'):reg[1];
        str = _replace(str,_regExp,cls,word);
    }
    return str;
}

function regExp(reg){
    return new RegExp(reg+'(?![^<]*>|[^<>]*<\/)','g');
}
export function renderColor(text){
    // let html = '';
    // debugger
    text=text.replace('\t','    ').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    text=pipe(text,[
        // /("(?:[^"\\]|\.)*")|(`(?:[^"\\]|\.)*`)|('(?:[^"\\]|\.)*')/g
        // ['("(?:[^"\\]|\\.)*")|(\'(?:[^\'\\]|\\.)*\')|(`((?:[^`\\]|\\.)|\n)*`)','str'],// 有bug：需要不包含字符串本身
        [
            [
                /("(?:[^"\\]|\\.)*")|(\'(?:[^\'\\]|\\.)*\')|(`((?:[^`\\]|\\.)|\n)*`)(?![^<]*>|[^<>]*<\/)/g,
                /("(?:[^"\\]|\\.)*")|(\'(?:[^\'\\]|\\.)*\')|(`((?:[^`\\]|\\.)|\n)*`)/g
            ],
            'str'
        ],// 有bug：需要不包含字符串本身
        ['(//.*(\n|$))|(\\/\\*(.|\n)*?\\*\\/)','cm'],
        ['\\/[a-zA-Z0-9'+sign.slice(1).join('')+' ]+\\/g?','reg'],//正则
        grArr(keyword1,'k1'),
        grArr(keyword1,'k1'), // 重复是为了解决相邻同类元素 无法被匹配 比如 function function 只有第一个function被匹配，因为他们共享一个空格
        grArr(keyword2,'k2'),
        grArr(keyword2,'k2'),
        grArr(keyword3,'k3'),
        grArr(keyword3,'k3'),
        [signBegin+'[0-9]+(.?[0-9]+)?'+signEnd,'num',/[0-9]+(.?[0-9]+)?/g],
        // [signBegin+'[0-9]+'+signEnd,'num',/[0-9]+/g],
        [signBegin+'[a-zA-Z_\\$]+[a-zA-Z_\\$0-9]*\\(','f',new RegExp('[a-zA-Z_\\$]+[a-zA-Z_\\$0-9]*','g')],
        ['['+sign.join('')+']','punc',new RegExp('['+sign.join('')+']','g')],
    ])
    text=text.replace(/\&lt;/g,sp('<','punc')).replace(/\&gt;/g,sp('>','punc')).replace(/;/g,sp(';','punc')).replace(/&/g,sp('&','punc'))
    
    return text;
}

// const signEnd = '[ \\(\\.\\n]';

function grArr(array,cls){
    return [signBegin+'(('+array.join(')|(')+'))'+signEnd,cls,new RegExp('(('+array.join(')|(')+'))','g')];
}

function pipe(text,array){
    for(var i=0;i<array.length;i++){
        text = replace(text,...array[i])
    }
    return text;
}

export let colorStyle = /*css*/`
.tc-editor-text span{
    ${textStyle}
}
.tc-js-punc{
    color: #666;
}

.tc-js-k1{
    color: #00f;
}
.tc-js-k2{
    color: #af00db;
}
.tc-js-k3{
    color: #267f99;
}
.tc-js-cm,.tc-js-cm *{
    /*color: #008084;*/
    color:#089900
}
.tc-js-str,.tc-js-str *{
    color: #d14a47;
}
.tc-js-num{
    color: #09885a;
}
.tc-js-f{
    color: #b27878;
}
.tc-js-reg{
    color: #f00;
}

.tc-dark .tc-js-punc{
    color: #fff;
}

.tc-dark .tc-js-k1{
    color: #569cd6;
}
.tc-dark .tc-js-k2{
    color: #c586c0;
}
.tc-dark .tc-js-k3{
    color: #3ac9b0;
}
.tc-dark .tc-js-cm,.tc-dark .tc-js-cm *{
    color: #6a8a35;
}
.tc-dark .tc-js-str,.tc-dark .tc-js-str *{
    color: #ce9178;
}
.tc-dark .tc-js-num{
    color: #b5cea8;
}
.tc-dark .tc-js-f{
    color: #dcdcaa;
}
.tc-dark .tc-js-reg{
    color: #d16969;
}
.tc-dark .tc-editor-cline{
    border-color: #444;
    background-color: rgba(100,100,100,.1);
}
.tc-dark .tc-editor-cbtn{
    background-color: rgba(68,68,68,.9);
    border-color:#fff;
    box-shadow:0px 0px 10px 2px #ccc;
}
.tc-dark .tc-ed-lines div{
    background-color:#444;
}
`

