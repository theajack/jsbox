
import 'easy-icon';
import $ from 'easy-dom-util';
import '../style/index.less';
import {TOOL_HEIGHT} from './constant';
import {IsPC} from './util';

$.reportStyle({
    func: initStyle,
    usePool: true
});

$.initStylePool();

function initStyle () {
    let size = $.windowSize();
    // let barWidth = 4;
    
    return /* css */`
        .jsbox-main-panel{
            height: ${size.height - TOOL_HEIGHT}px;
        }
        .jsbox-tool-w {
            height: ${TOOL_HEIGHT}px;
            line-height: ${TOOL_HEIGHT}px;
            background-color: #f6f6f6;
        }
        ::-webkit-scrollbar {
            width:5px;
            cursor: pointer;
            height: 5px;
        }
        ${IsPC() ? `
        ::-webkit-scrollbar-button    {
            display: none;
        }
        ::-webkit-scrollbar-track     {
            display: none;
        }
        ::-webkit-scrollbar-track-piece {
            background-color:#ddd;
        }
        ::-webkit-scrollbar-thumb{
            background-color:#bbb;
            border-radius:5px;
            cursor: pointer;
        }
        ::-webkit-scrollbar-thumb:hover{
            background-color:#aaa;
            cursor: pointer;
        }` : ''}
    `;
}