
import tool from '../lib/tool'
export function toggleKeyboard(el){
    let childs = el.getElementsByTagName('input');
    let isShift = childs[0].value === childs[0]._shift_value;
    if(isShift){
        tool.rmClass(childs[29],'tc-ed-shift');
    }else{
        tool.addClass(childs[29],'tc-ed-shift');
    }
    for(var i=0;i<childs.length;i++){
        let child = childs[i];
        if(isShift){
            child.value = child._value;
        }else{
            child.value = child._shift_value;
        }
    }
}

export function generateKeyboard(){
    let doms=[];
    let keys=[
        '1 2 3 4 5 6 7 8 9 0|! @ # $ % ^ & * ( )',
        'q w e r t y u i o p|Q W E R T Y U I O P',
        'a s d f g h j k l|A S D F G H J K L',
        'shift z x c v b n m del|shift Z X C V B N M del'
    ]
    keys.forEach(str=>{
        let div = tool.create('div','ed-key-line');
        let arr = str.split('|');
        let shifts = arr[1].split(' ');
        arr[0].split(' ').forEach((key,index)=>{
            let button = tool.attr(tool.create('input','',key),'type','button');
            if(key === 'a'){
                button.style.marginLeft = '5.5%'
            }else if(key === 'shift' || key === 'del'){
                button.style.width = '14%'
            }
            button._value = key;
            button._shift_value = shifts[index];
            tool.append(div,button);
        })
        doms.push(div);
    })
    return doms;
}