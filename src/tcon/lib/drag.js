import {onmove} from './touchevent'
class Drag{
    constructor(el,func){
        // el.addEventListener('touchstart',function(e){
        // },false);
        onmove({
            el,
            onemit(e){
                // console.log(e.touches[0])
                e.preventDefault()
                let touch = e.touches[0]
                if(func){
                    func(touch.clientX,touch.clientY)
                }else{
                    el.style.top=clientY+'px';
                    el.style.left=clientX+'px';
                }
            }
            // time:10
        });
        // el.addEventListener('touchend',function(){
            
        // },false);
    }
}
export default function dragable(el,func){
    el.__drag = new Drag(el,func);
    return el;
}