// 展示当前选中行
import tool from "../lib/tool";

export let cline = {
    el:null,
    width:window.innerWidth,
    generate(){
        this.el = tool.create('div','editor-cline');
        return this.el;
    },
    setTop(top){
        this.el.style.top = top+'px';
    },
    setWidth(el,p){
        // 防止宽度没有马上计算出来
        window.setTimeout(()=>{
            let w = el.offsetWidth;
            if(w!=this.width){
                this.width = w
                this.el.style.width = (w + p*2)+'px';
            }
        },20)
    },
    setHeight(h){
        this.el.style.height = h+'px';
    }
}