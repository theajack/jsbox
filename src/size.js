import $ from 'easy-dom-util';
export function initResize () {
    window.onresize = () => {
        let size = $.windowSize();
        if (size.width < 600) {
            
        }
    };
}