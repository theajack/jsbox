import $ from 'easy-dom-util';

export const TOOL_HEIGHT = 35;

export function initResize (el) {
    window.onresize = () => {
        let size = $.windowSize();
        el.panel.style('height', size.height - TOOL_HEIGHT + 'px');
    };
}