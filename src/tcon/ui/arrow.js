import tool from '../lib/tool'
import dragable from '../lib/drag'
import {view,viewRate} from '../editor/func'
let arrowList=[]
export function resetTop(){
    arrowList.forEach(arrow=>{
        arrow.resetTop();
    })
}
export default class Arrow{
    constructor(opt){
        this.direction = opt.direction||'right';
        this.click = opt.click||function(){};
        this.parent = opt.parent || window.document.body;
        this.init();
        if(opt.list!==false){// 是否加入list 加入list之后可以一起拖动
            this.list = true;
            arrowList.push(this);
            this.__list = arrowList;
        }
    }
    init(){
        this.el = tool.create('div','arrow-w'+ ((this.direction==='left')?' arrow-w-left':''),'',()=>{
            this.click();
        })
            let arrow1 = tool.create('span','arrow-line arrow-line1')
            let arrow2 = tool.create('span','arrow-line arrow-line2')
        tool.append(this.el,[arrow1,arrow2]);
        dragable(this.el,(x,y)=>{
            let top = y-18;
            if(view === 'small'){
                let minTop = window.innerHeight*(1-viewRate);
                if(top < minTop){
                    return;
                }
                top -= minTop;
            }
            top = top+'px';
            if(this.list){
                this.__list.forEach((item)=>{
                    item.el.style.top = top;
                })
            }else{
                this.el.style.top = top;
            }
        });
        window.setTimeout(()=>{this.resetTop()},10);
        tool.append(this.parent,[this.el]);
        window.addEventListener('resize',()=>{
            window.setTimeout(()=>{
                this.resetTop()
            },100);
        },false)
    }
    resetTop(){
        this.el.style.top = ((this.parent.offsetHeight - this.el.offsetHeight)/2) +'px'
    }
    setClick(click){
        if(typeof click === 'function'){
            this.click = click;
        }
    }
}