import $ from 'easy-dom-util';
export default function fixSelect () {
    setTimeout(() => {
        let dialog = this.$refs.dialog;
        dialog.$children[0].handleFocus();
        let arrow = $.query(dialog.$el).query('.el-select__caret')[0];
        if (!arrow.el.__init) {
            arrow.el.__init = true;
            arrow.click(() => {
                if (arrow.hasClass('is-reverse')) {
                    setTimeout(() => {
                        dialog.$children[0].handleClose();
                    }, 100);
                }
            });
        }
    }, 200);
}