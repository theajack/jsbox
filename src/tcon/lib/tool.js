export default {
    create(tag,cls,text,click){
        let el = document.createElement(tag);
        if(cls){
            el.className = cls.split(' ').map((item)=>{
                return 'tc-'+item
            }).join(' ')
        }
        if(text){
            if(el.tagName === 'INPUT'){
                el.value = text
            }else{
                el.innerText = text
            }
        };
        if(click){el.addEventListener('click',click)}
        return el;
    },
    attr(el,name,value){
        if(typeof value==='undefined'){
            return el.getAttribute(name);
        }
        el.setAttribute(name,value);
        return el
    },
    append(el,array){
        if(array instanceof Array){
            array.forEach((item)=>{
                el.appendChild(item);
            })
        }else{
            el.appendChild(array)
        }
        return el;
    },
    addStyle(css,id){
        let style = this.create('style');
        style.innerHTML = css
        if(id){
            let s=document.getElementById(id);
            if(s!==null){
                return s;
            }
            this.attr(style,'id',id)
        }
        window.document.head.appendChild(style);
        return style;
    },
    hasClass(el,name){
        return getRegExp(name).test(el.className)
    },
    addClass(el,name){
        check(name,(cls)=>{
            if(!this.hasClass(el,cls)){
                if(el.className===''){
                    el.className=cls
                }else{
                    el.className+=' '+cls
                }
            }
        })
        return el;
    },
    rmClass(el,name){
        if(this.hasClass(el,name)){
            el.className = el.className.replace(getRegExp(name),' ').trim()
        }
        return el;
    },
    replaceClass(arg,a,b){
        check(arg,(el)=>{
            if(this.hasClass(el,a)){
                el.className = el.className.replace(getRegExp(a),' '+b+' ').trim()
            }else{
                this.addClass(el,b);
            }
        })
        return arg;
    },
    active(...arg){
        check(arg,(el)=>{
            this.addClass(el,'tc-active')
        })
    },
    inactive(...arg){
        check(arg,(el)=>{
            this.rmClass(el,'tc-active')
        })
    }
}

function check(arg,cb){
    if(arg instanceof Array){
        for(var i = 0;i<arg.length;i++){
            cb(arg[i],i)
        }
    }else{
        cb(arg,0);
    }
}

function getRegExp(name){
    return new RegExp('(^| )'+name+'($| )')
}