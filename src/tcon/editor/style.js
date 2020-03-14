
export let textFont = `font-family:Consolas, 'Courier New', monospace;`

let call={};
export let VAR = {
    lineHeight:17,
    colorBlue:'#649eff',
    set(name,value){
        this[name] = value;
        if(call[name]){
            call[name].forEach(f => {
                f(value);
            });
        }
    },
    regist(name,cb){
        if(!call[name]){
            call[name] = [cb]
        }else{
            call[name].push(cb);
        }
    }
};

export let textStyle = /*csszip*/`
    ${textFont}
    display:inline;
    font-size:14px;
    line-height:17px;
    font-weight:normal;
    padding:0;
    margin:0;
`