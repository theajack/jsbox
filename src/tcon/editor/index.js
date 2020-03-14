import tool from '../lib/tool'
import {generateChoose,choose} from './input'
import {generateEditorInput,editor,editorStyle} from './editor'
import {countSize} from './countSize'
import {colorStyle} from './color'
import {theme,themeStyle} from './func'
import {useKeyMode} from './keyMode'
import {VAR} from './style'

// let styles = ;

let instance = null;

export default function generateEditor(parent){
    return new Editor(parent);
}

class Editor{
    constructor(parent){
        if(instance){
            return instance;
        }
        this.el={};
        this.parent = parent;
        this.choose = choose;
        init.call(this);
        instance = this;
        this.resize = editor.resize;
        this.countSize = countSize
    }

}

// 初始化dom
function init(){
    addStyle([editorMainStyle,editorStyle,colorStyle,themeStyle]);
    let _main = tool.create('div','editor-w '+theme);
        let _editor = generateEditorInput();
        let _choose_panel = generateChoose(this)
    tool.append(_main,[_editor,_choose_panel]);
    
    this.el.main = _main;
    this.el.editor = _editor;
    this.el.choose = _choose_panel;
}

let editorMainStyle = /*css*/`
/** editor css */
.tc-editor-w,.tc-editor-w *{
    box-sizing:border-box;
    font-family:Microsoft YAHEI;
    font-size:14px;
}
.tc-choose-panel {
    position:fixed;
    width:100%;
    bottom:0;
    background-color:rgba(255,255,255,.8);
    transition:background-color .3s ease;
}
.tc-choose-page {
    padding: 5px 2px;
    display:none;
    padding-bottom:0;
    border-top:1px solid #eee;
}
.tc-choose-page.tc-active {
    display:block;
}
.tc-choose-page input {
    font-size:14px;
    border:1px solid #bbb;
    border-radius:5px;
    padding:1px 3px;
    margin:0 2px;
    margin-bottom:5px;
    float:left;
    min-width: 23px;
    text-align: center;
    -webkit-touch-callout:none;
    -webkit-user-select:none;
    -khtml-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    background-color: transparent;
    color:inherit;
    outline:none;
}
.tc-ed-key-line{
    content: " ";
    clear: both;
    text-align:center;
}
.tc-ed-key-line input{
    width: 9%;
    margin: 0 0.5%;
    margin-bottom: 5px;
    padding: 3px 0px;
}
.tc-ed-shift{
    background-color: #bbb!important;
    color: #fff!important;
}
.tc-choose-page:after {
    visibility:hidden;
    display:block;
    content:" ";
    clear:both;
}
.tc-func-panel {
    position:absolute;
    top:-32px;
}
.tc-func {
    text-align:center;
    float:left;
    width:26px;
    height:26px;
    overflow:hidden;
    background-color:#e5e5e5;
    border-radius:50%;
    margin:0 5px;
    position:relative;
}
.tc-func-line {
    transform:rotate(45deg);
    position:absolute;
    border:1px solid #888;
    background-color:#888;
}
.tc-func-line3{
    display: none;
}
.tc-func-execute {
    background-color:${VAR.colorBlue};
    color:#fff;
}
.tc-func-execute .tc-func-line {
    border:1px solid #fff;
    background-color:#fff;
    display:block;
}
.tc-func-undo .tc-func-line1,.tc-func-redo .tc-func-line1{
    top: 15px;
    left: 7px;
    width: 10px;
}
.tc-func-redo .tc-func-line1{
    transform: rotate(-45deg);
    left: 9px;
}
.tc-func-undo .tc-func-line2,.tc-func-redo .tc-func-line2{
    top: 9px;
    left: 7px;
    width: 10px;
    transform: rotate(-45deg);
}
.tc-func-redo .tc-func-line2{
    transform: rotate(45deg);
    left: 9px;
}
.tc-func-clear .tc-func-line {
    top:13px;
    left:5px;
    width:16px;
}
.tc-func-theme{
    background-color: #666;
}
.tc-func-clear .tc-func-line2 {
    transform:rotate(-45deg);
}
.tc-func-clear .tc-func-line3 {
    display:none;
}
.tc-func-execute .tc-func-line1 {
    width:11px;
    left:9px;
    top:9px;
    transform:rotate(30deg);
}
.tc-func-execute .tc-func-line2 {
    width:11px;
    left:9px;
    top:15px;
    transform:rotate(-30deg);
}
.tc-func-execute .tc-func-line3 {
    transform:rotate(90deg);
    width:12px;
    left:4px;
    top:12px;
}
.tc-func-small .tc-func-line1 {
    transform:rotate(0deg);
    top: 12px;
    width: 18px;
    left:4px;
}
.tc-func-small .tc-func-line2 {
    display:none;
}
.tc-func-small.tc-active .tc-func-line1 {
    width: 12px;
    left: 7px;
    top: 5px;
}
.tc-func-key .tc-func-line2 {
    display:none;
}
.tc-func-key .tc-func-line1 {
    width: 13px;
    height: 13px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 2px;
    /* border-width: 3px; */
}
.tc-func-key.tc-active .tc-func-line1 {
    border-radius: 50%;
    width: 15px;
    height: 15px;
    background-color: transparent!important;
    border-width: 2px;
    /* background-color: transparent; */
}
.tc-choose-tab {
    display:flex;
    height:30px;
    line-height:30px;
    border-top:1px solid #eee;
}
.tc-tab-item.tc-active {
    background-color:#eee;
}
.tc-tab-item.tc-tab-cn.tc-active{
    background-color:${VAR.colorBlue};
    color:#fff;
}
.tc-tab-item {
    flex:1;
    transition:all .3s ease;
    text-align:center;
}
.tc-touch-active {
    background-color:#ddd!important;
}
.tc-cn-textarea{
    width: 100%;
    height: 100px;
    padding: 5px;
    border: 0;
    outline:none;
    resize: none;
    display: block;
    background-color:#fafafa;
}
.tc-editor-cbtn{
    position: absolute;
    font-size: 35px;
    border: 1px solid #bbb;
    border-radius: 5px;
    padding: 3px 5px;
    min-width: 55px;
    font-weight: bold;
    text-align: center;
    background-color: rgba(255,255,255,.9);
    color: inherit;
    top: 0;
    left: 0;
    opacity:0;
    display:none;
    box-shadow: 0px 0px 10px 2px #aaa;
    /** transition:opacity .3 ease;*/
}
`

function addStyle(styles){
    tool.addStyle(styles.join(''),'tconEditor');
}