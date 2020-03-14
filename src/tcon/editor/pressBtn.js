// 展示当前点击的按钮

import tool from "../lib/tool";

export let pbtn = {
    el:null,
    generate(){
        this.el = tool.create('div','editor-cbtn','test');
        return this.el;
    },
    onPress(el){
        let top = el.offsetTop;
        let left = el.offsetLeft;
        let width = el.offsetWidth;
        this.el.innerText = el.value;
        // 等待 高度计算出来
        this.el.style.display = 'block';
        this.el.style.top = (top - this.el.offsetHeight - 20)+'px';
        let _left = (left - (this.el.offsetWidth - width)/2); 
        if(_left<5){
            _left = 5;
        }else if(_left + this.el.offsetWidth > window.innerWidth - 5){
            _left = window.innerWidth - 5 - this.el.offsetWidth;
        }
        this.el.style.left = _left +'px';
        this.el.style.opacity = '1';
    },
    onRelease(el){
        this.el.style.display = 'none';
        this.el.style.opacity = '0';
    }
}