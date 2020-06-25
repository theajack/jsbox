import hackConsole from './hackConsole';
import tool from './tool';
import obejectViewer from './objectViewer';
import {generateFunc, checkType} from './func';
import version from './version.js';
import ignores from './igonre';

class Log {
    constructor () {
        this.console = hackConsole();
        this.title = 'log';
        this.lastConsoleValue = {};
        this.lastType = '';
        this.index = 1;
        this.version = version;
        // tab , page , index
    }
    init () {
        // this.page.innerHTML = '> log test '+this.index;
        tool.addStyle(/* css*/`.tc-log-list{padding-bottom:30px;}.tc-log-angle{cursor:pointer;border:5px solid transparent;position:absolute;top:4px;border-left-color:#555;margin-left:-8px;transition:all .3s ease;}.tc-log-angle.tc-open{transform:rotate(90deg);top:7px;;margin-left:-12px;}.tc-log-block{border-top:1px solid #eee;border-bottom:1px solid #eee;padding:2px 5px;position:relative;min-height:25px;}.tc-log-block.tc-log-warn{background-color:#fffbe5;border-color:#fff5c2;}.tc-log-block.tc-log-error{background-color:#fff0f0;border-color:#ffd6d6;}.tc-log-block.tc-log-info{background-color:#e9e9ff;border-color:#c0c0ff;}.tc-log-block.tc-log-tc{background-color:#f3f3f3;}.tc-log-block-hide span,.tc-log-copy,.tc-log-func{cursor:pointer}.tc-log-block-hide{overflow: hidden;z-index:2;display:block;position:absolute;right:3px;top:2px;border-radius:50%;border:1px solid #222;height:10px;width:10px;line-height:10px;text-align:center;border:1px solid #aaa;}.tc-log-block-hide span{position:absolute;top:-2.5px;left:-0.4px;color:#aaa;transform:rotate(45deg);}.tc-log-funcs{position:fixed;bottom:5px;left:3px;}.tc-log-func{display:inline-block;border-radius:50%;border:1px solid #222;height:18px;width:18px;line-height:18px;text-align:center;border:1px solid #aaa;color:#aaa;margin-right:5px;font-size:10px;position:relative;top:0px;transform:translateY(0px);transition:all .3s ease;}.tc-log-func.tc-active{border-radius:5px;transform:translateY(-4px);}.tc-log-func.tc-log-clear{transform:rotate(45deg);font-size:20px;position:relative;top:2px;line-height:14px;}.tc-log-func.tc-log-error{background-color:#fff0f0;border-color:#ffd6d6;}.tc-log-func.tc-log-warn{background-color:#fffbe5;border-color:#fff5c2;}.tc-log-func.tc-log-info{background-color:#e9e9ff;border-color:#c0c0ff;}.tc-log-func.tc-log-tc{background-color:#e8e8e8;border-color:#e8e8e8;}.tc-log-func.tc-log-all{color:transparent;}.tc-log-ell{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}.tc-obj-viewer{color:#222;}.tc-obj-key{color:#af00db;}.tc-obj-number{color:#09885a}.tc-obj-string{white-space:pre-wrap;color:#a31515}.tc-log-block.tc-log-error .tc-obj-string{color:#f00}.tc-obj-def{white-space: pre;color:#222}.tc-log-obj-head{height: 20px;line-height: 20px;padding-left:11px;position:relative;}.tc-log-obj-view{display:none;border-top:1px solid #ddd;padding-left:13px;}.tc-log-obj-view.tc-open{display:block;}.tc-log-copy{text-decoration:underline;color:#00f;font-size:14px;margin-left:6px;}.tc-log-repeat{background-color:#aaa;color:#fff;border-radius:10px;font-size:10px;padding:0 4px;margin-right:3px;}.tc-log-np{padding:0;}`, 'tconLogPlugin');
        this.blockList = tool.create('div', 'log-list');
        this.funcs = generateFunc(this);
        tool.append(this.page, [this.blockList, this.funcs]);
    }
    appendRepeatEle () {
        let c = this.blockList.children;
        let el = c[c.length - 1].querySelector('.tc-log-repeat');
        if (el) {
            el.innerText = this.index;
        } else {
            el = tool.create('span', 'log-repeat', this.index);
            c = c[c.length - 1].children;
            c = c[c.length - 1];
            c.insertBefore(el, c.children[0]);
        }
    }
    mounted () {
        this.init();
        this.console.onConsole = (el, args, type) => {
            if (typeof args === 'string' && ignores.find((ignore) => args.indexOf(ignore) !== -1)) {
                return;
            }
            checkType(el, type);
            if (obejectViewer.test(args)) {
                tool.append(this.blockList, el);
            } else {
                if (this.lastConsoleValue === args && this.lastType === type && this.blockList.children.length > 0) {
                    this.index++;
                    this.appendRepeatEle();
                } else {
                    this.lastConsoleValue = args;
                    this.lastType = type;
                    this.index = 1;
                    tool.append(this.blockList, el);
                }
            }
        };
        // tool.append(this.page,obejectViewer({a:1,c:"11",x:1,s:function(){},d:"11",d:true,f:{a:1,b:2,x:{x:{x:2}}}}))
        // tool.append(this.page,obejectViewer({a:1,c:"11",x:1,s:function(){},d:"11",d:true,f:{a:1,b:2,x:{x:{x:2}}}},TYPE.info))
        // tool.append(this.page,obejectViewer({a:1,c:"11",x:1,s:function(){},d:"11",d:true,f:{a:1,b:2,x:{x:{x:2}}}},TYPE.error))
        // tool.append(this.page,obejectViewer([1,2,{a:{a:[1,2]}}],TYPE.warn))
    }
    onShow () {
        // console.log(this.title+' show')
    }
    onHide () {
        // console.log(this.title+' hide')
    }
    onPageResize () {
        // console.log(size)
    }
}
if (window.TCon) {
    window.TCon.use(Log);
}
export default Log;