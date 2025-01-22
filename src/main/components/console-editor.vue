<template>
    <div class='console-w' :style='{height: height+"px"}'>
        <i class='ei-angle-right console-i'></i>
        <div v-show='showPh' class='console-placeholder'>运行代码…</div>
        <div class='console-editor' ref='editor'></div>
    </div>
</template>
<script>
    import {Editor, loadMonaco, LANG} from './js/editor';
    import event from '../js/event';
    import {EVENT} from '../js/constant';
    import {fontSize, theme} from '../js/status';
    import {write, read} from '../js/notebook';
import {isCtrlPressed} from '../../util';
    // import {debounce} from '../js/util';
    
    let historyMax = 50;
    let history = read('history') || [];
    let historyIndex = history.length;
    let currentValue = '';
    let currentLine = 1;


    export default {
        data () {
            return {
                editor: null,
                showPh: true,
                height: 19,
            };
        },
        mounted () {
            event.regist({
                [EVENT.RESIZE]: () => {
                    if (this.editor) {
                        setTimeout(() => {
                            this.editor.resize();
                        }, 10);
                    }
                },
                [EVENT.DRAG_PERCENT]: () => {
                    if (this.editor) {
                        this.editor.resize();
                    }
                },
                [EVENT.LANG_CHANGE]: (lang) => {
                    if (this.editor) {
                        if (lang === LANG.JAVASCRIPT || lang === LANG.HTML) {
                            setTimeout(() => {
                                this.editor.resize();
                            }, 100);
                        }
                    }
                },
            });
            this.initEditor();
        },
        methods: {
            initEditor () {
                loadMonaco().then(() => {
                    this.editor = new Editor({
                        el: this.$refs.editor,
                        code: '',
                        lang: LANG.JAVASCRIPT,
                        fontSize: fontSize.get(),
                        theme: theme.get(),
                        option: {
                            lineNumbers: 'off',
                            minimap: {
                                enabled: false
                            },
                            folding: false,
                            fontSize: 12,
                            roundedSelection: false,
                            scrollBeyondLastLine: false,
                        },
                        onchange: (code) => {
                            this.reinitPH(code);
                            this.reinitSize();
                        },
                        oncursorchange: (cursor) => {
                            currentLine = cursor.lineNumber;
                        }
                    });
                    this.initEvent();
                    event.emit(EVENT.EDITOR_MOUNTED, this.editor);
                });
            },
            isSuggestClose () {
                return document.getElementsByClassName('suggest-widget visible').length === 0;
            },
            initEvent () {
                this.editor.editor.onKeyDown((e) => {
                    let preventDefault = function () {
                        e.preventDefault();
                        e.stopPropagation();
                    };
                    if ((e.keyCode === 16 || e.keyCode === 18) && this.isSuggestClose()) { // up || down
                        if (e.keyCode === 16 && currentLine === 1) {
                            this.prev();
                            preventDefault();
                        } else if (e.keyCode === 18 && currentLine === this.editor.getLines()) {
                            this.next();
                            preventDefault();
                        }
                    }
                    if (isCtrlPressed(e) && e.keyCode === 3) {
                        this.runConsole();
                        preventDefault();
                    }
                });
                this.editor.editor.onKeyUp((e) => {
                    if (e.keyCode !== 16 && e.keyCode !== 18) { // up || down
                        currentValue = this.editor.code();
                    }
                });
                this.editor.editor.onMouseWheel((e) => {
                    this.$emit('onwheel', e.deltaY);
                });
            },
            reinitPH (code) {
                this.showPh = code === '';
            },
            reinitSize (code) {
                let height = this.editor.getLines(code) * 19;
                if (height !== this.height) {
                    this.height = height;
                    this.$nextTick(() => {
                        this.editor.resize();
                        this.$emit('scrollToBottom');
                    });
                }
            },
            next () {
                if (historyIndex < history.length - 1) {
                    historyIndex++;
                    this.editor.code(history[historyIndex]);
                    this.reinitPH(history[historyIndex]);
                    this.editor.focusEnd(false);
                } else if (this.editor.code() !== currentValue) {
                    this.editor.code(currentValue);
                    this.reinitPH(currentValue);
                    historyIndex++;
                    this.editor.focusEnd(false);
                }
            },
            prev () {
                if (historyIndex > 0) {
                    historyIndex--;
                    this.editor.code(history[historyIndex]);
                    this.reinitPH(history[historyIndex]);
                    this.editor.focusEnd(false);
                }
            }, runConsole () {
                let code = this.editor.code();
                this.pushToHistory(code);
                event.emit(EVENT.RUN_CODE, code);
            }, pushToHistory (code) {
                history.push(code);
                if (history.length > historyMax) {
                    history.shift();
                }
                historyIndex = history.length;
                this.editor.code('');
                currentValue = '';
                write('history', history);
            }, focuConsole () {
                this.editor.focusEnd();
            }
        }
    };
</script>
<style lang="less">
    .console-w{
        position: relative;
        height: 100px;
        margin-top: 2px;
        .console-i{
            position: absolute;
        }
        .console-editor{
            padding-left: 7px;
            outline: none;
            font-size: 13px;
            position: relative;
            height: 100%;
        }
        .console-placeholder{
            font-size: 12px;
            position: absolute;
            padding-left: 21px;
            top: 2px;
            color: #bbb;
        }
        .monaco-editor, .monaco-editor .inputarea.ime-input,.monaco-editor .margin, .monaco-editor-background{
            background-color: transparent!important;
        }
        .console-mask{
            position: absolute;
            width: 100%;
            height: 100%;
        }
    }
    body.dark{
        .console-placeholder{
            color: #666;
        }
    }
</style>