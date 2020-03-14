let hasTouchEvent = ()=>typeof window.ontouchmove !== 'undefined'
export function onstart({el,onemit}){
    if(hasTouchEvent()){
        addEvent(el,'touchstart',onemit)
    }else{
        addEvent(el,'mousedown',function(event){
            el.__isMouseDown = true;
            exe(onemit,event,this);
        })
    }
}
let _onstart = onstart;

export function onlong({el,onemit,onstart,onend,delay,time}){
    if(typeof delay !== 'number'){
        throw new Error('onlong 必须含有delay参数')
    }
    let timout = null,interval = null;
    _onstart({
        el,
        onemit:function(event){
            exe(onstart,event,this);
            timout = window.setTimeout(()=>{
                if(typeof time === 'number'){
                    onemit.call(this,event);
                    interval = window.setInterval(()=>{
                        onemit.call(this,event);
                    },time)
                }else{
                    onemit.call(this,event);
                }
            },delay)
        }
    })
    _onend({
        el,
        onemit:function(event){
            exe(onend,event,this);
            window.clearTimeout(timout);
            if(interval!==null){window.clearInterval(interval);}
        }
    })
}

export function onclick({el,onemit}){
    addEvent(el,onemit);
}

export function onmove({el,onemit,time}){
    if(hasTouchEvent()){
        if(typeof time === 'number'){
            onemit = throttle(onemit,time);
        }
        addEvent(el,'touchmove',onemit)
    }else{
        if(typeof time === 'number'){
            onemit = throttle(onemit,time);
        }
        _onstart({el});
        _onend({el});
        addEvent(window,'mousemove',function(event){
            if(el.__isMouseDown){
                buildTouchList(event);
                exe(onemit,event,this);
            }
        })
    }
}
export function onend({el,onemit}){
    if(hasTouchEvent()){
        addEvent(el,'touchend',onemit)
    }else{
        addEvent(window,'mouseup',function(event){
            if(el.__isMouseDown){
                el.__isMouseDown = false;
                exe(onemit,event,this);
            }
        })
    }
}
let _onend = onend;

function throttle (onemit, ms) {
    let timer = null
    let startTime = Date.now()
    return (event) => {
        let currentTime = Date.now()
        let remaining = ms - (currentTime - startTime)
        clearTimeout(timer)
        if(remaining <= 0) {
            onemit.call(this,event)
            startTime = Date.now()
        }else {
            timer = setTimeout(() => {
                onemit.call(this,event)
            }, remaining)
        }
    }
}

function addEvent(el,name,onemit){
    el.addEventListener(name,onemit,false);
}

function buildTouchList(event){
    event.touches = [{
        clientX: event.clientX,
        clientY: event.clientY,
        force: 1,
        identifier: 0,
        pageX: event.pageX,
        pageY: event.pageY,
        radiusX: 11.5,
        radiusY: 11.5,
        rotationAngle: 0,
        screenX: event.screenX,
        screenY: event.screenY,
        target: event.target,
    }]
}

function exe(f,event,_this){
    if(typeof f === 'function'){
        f.call(_this||window,event)
    }
}
