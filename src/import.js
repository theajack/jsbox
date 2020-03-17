import $ from 'easy-dom-util';
import {toast} from 'tacl-ui';

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
        console.log(inputs);
        el.inputs.insert(index, $.create('div.input-item').render({
            html: /* html*/`
                <input type='text' @event='input:input'/>
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
                    console.log(inputs);
                }
            }
        }));
    }

    $.query('body').append(
        mask = $.create('div.set-mask').render({
            html: /* html*/`
                <div class='set-w'>
                    <i class="ei-times" @event='close'></i>
                    <div class='input-w' @el='inputs'></div>
                </div>
            `,
            method: {
                close () {
                    mask.rmClass('open');
                }
            },
            result (els) {
                el = els;
                addOne();
            }
        })
    );
}
export function open () {
    mask.addClass('open');
}

export function _import () {

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
        }
        .set-mask .open{

        }
        .set-w{
            position: absolute;
            background-color: #eee;
            width: 70%;
            min-width: 300px;
            max-width: 900px;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            padding: 30px;
            text-align: center;
        }
        .set-w .ei-times{
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 20px;
            color: #d44;
            cursor: pointer;
        }
        .set-w .ei-times:hover{
            color: #f44;
        }
        .set-close{
            
        }
        .input-w{

        }
        .input-item{
            margin-bottom: 10px;
        }
        .input-item input{
            margin-right: 10px;
            height: 30px;
            outline: none;
            border: 1px solid #ccc;
            border-radius: 3px;
            padding-left: 5px;
            width: 80%;
        }
        .input-item i{
            font-size: 32px;
            vertical-align: middle;
            cursor: pointer;
        }
        .input-item .ei-plus-sign-alt{
            
        }
        .input-item .ei-minus-sign-alt{
            color:#d44;
        }
        .input-remove{
            
        }
        .input-add{
            
        }
    `;
}
