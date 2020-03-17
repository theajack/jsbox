import $ from 'easy-dom-util';

export const TOOL_HEIGHT = 35;

export function initResize (el) {
    window.onresize = () => {
        let size = $.windowSize();
        el.panel.style('height', size.height - TOOL_HEIGHT + 'px');
    };
}

export function initKeyEvent (method) {
    window.onkeydown = (event) => {
        if (event.ctrlKey) {
            let c = (s) => {return s.charCodeAt(0);};
            let pd = () => {event.preventDefault();};
            switch (event.keyCode) {
                case c('M'):method.theme(); pd(); break;
                case c('D'):method.clear(); pd(); break;
                case c('S'):method.save(); pd(); break;
                case c('Q'):method.reset(); pd(); break;
                case c('P'):method.copy(); pd(); break;
                case c('I'):method.config(); pd(); break;
                case c('L'):method.link(); pd(); break;
                case 187:method.fontUp(); pd(); break;
                case 189:method.fontDown(); pd(); break;
                case 13:method.run(); pd(); break;
            }
                
        }
    };
}