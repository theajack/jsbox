import $ from 'easy-dom-util';
import {toast} from 'tacl-ui';
import {loadResources} from './load';

$.reportStyle({
    func: initStyle,
    usePool: true
});

let mask = null;
let el = null;

function initEl () {
    let inputs = [];
    function removeOne (index) {
        if (inputs.length <= 1) {
            return toast('已经只有一个不能再删除了');
        }
        inputs.splice(index, 1);
        el.inputs.remove(index);
    }
    function addOne (index) {
        if (typeof index === 'number') {
            index ++;
            inputs.splice(index, 0, '');
        } else {
            inputs.push('');
            index = inputs.length - 1;
        }
        el.inputs.insert(index, $.create('div.input-item').render({
            html: /* html*/`
                <input type='text' placeholder='输入cdn链接地址或jsbox支持的库名' @event='input:input'/>
                <i class="ei-plus-sign-alt" @event='add'></i>
                <i class="ei-minus-sign-alt" @event='remove'></i>
            `,
            method: {
                add () {
                    addOne(this.el.index());
                },
                remove () {
                    removeOne(this.el.index());
                },
                input () {
                    inputs[this.el.index()] = this.self.value();
                }
            }
        }));
    }

    $.query('body').append(
        mask = $.create('div.set-mask').render({
            html: /* html*/`
                <div class='set-w'>
                    <i class="ei-times mask-close" @event='close'></i>
                    <i class="ei-question mask-ques" @event='ques'></i>
                    <div class='input-w' @el='inputs'></div>
                    <div class='btn-w'>
                        <button @event='load'><i class="ei-download-alt"></i> 加载</button>
                        <button class='primary' @event='close'><i class="ei-times"></i> 取消</button>
                    </div>
                </div>
            `,
            method: {
                ques () {
                    window.open('https://github.com/theajack/jsbox/blob/master/cdn/resources.js');
                },
                close () {
                    mask.rmClass('open');
                    setTimeout(() => {
                        mask.style('display', 'none');
                    }, 350);
                },
                load () {
                    if (inputs.join('') === '') {
                        toast('资源不可为空');
                        return;
                    }
                    loadResources(inputs, () => {
                        this.method.close();
                        this.bindEl.inputs.empty();
                        addOne();
                        inputs = [''];
                    });
                }
            },
            result (els) {
                el = els;
                addOne();
            },
        })
    );
}
export function open () {
    mask.style('display', 'block');
    setTimeout(() => {
        mask.addClass('open');
    }, 20);
}

initEl();

function initStyle () {
    return /* css*/`
        .set-mask{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.5);
            z-index: 10;
            display: none;
            opacity: 0;
            transition: opacity .3s ease;
        }
        .set-mask.open{
            opacity: 1;
        }
        .set-w{
            position: absolute;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0px 10px 15px 5px #666;
            width: 70%;
            min-width: 300px;
            max-width: 900px;
            top: 20%;
            left: 50%;
            transform: translate(-50%,0%);
            padding: 30px 10px;
            text-align: center;
        }
        .mask-close, .mask-ques{
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 20px;
            color: #ff9292;
            cursor: pointer;
        }
        .mask-ques{
            color: #ccc;
            right: 30px;
        }
        .mask-ques:hover{
            color: #aaa;
        }
        .mask-close:hover{
            color: #f44;
        }
        .set-close{
            
        }
        .input-w{
            max-height: 400px;
            overflow: auto;
            margin-bottom: 25px;
        }
        .input-item{
            margin-bottom: 20px;
        }
        .input-item:last-child{
            margin-bottom: 0;
        }
        .input-item input{
            margin-right: 10px;
            height: 35px;
            outline: none;
            border: 1px solid #ccc;
            border-radius: 3px;
            padding-left: 10px;
            width: 80%;
        }
        .input-item i{
            font-size: 32px;
            vertical-align: middle;
            cursor: pointer;
        }
        .input-item .ei-plus-sign-alt{
            color: #409eff;
        }
        .input-item .ei-minus-sign-alt{
            color:#ff8b8b;
        }
        .input-remove{
            
        }
        .input-add{
            
        }
        .btn-w button{
            width: 100px;
            height: 35px;
            border-radius: 3px;
            border: none;
            background-color: #409eff;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
            outline:none;
        }
        .btn-w button:hover{
            background-color: #7cbcff;
        }
        .btn-w button.primary{
            margin-left: 20px;
            color: #444;
            background-color: #fff;
            border: 1px solid #aaa;
        }
        .btn-w button.primary:hover{
            background-color: #f4f4f4;
        }
        @media (max-width: 600px){
            .input-item input{
                width: 180px;
            }
        }
    `;
}
