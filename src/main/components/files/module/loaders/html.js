/*
 * @Author: tackchen
 * @Date: 2021-04-29 14:20:59
 * @LastEditors: theajack
 * @LastEditTime: 2021-04-29 23:17:49
 * @FilePath: \jsbox\src\main\components\files\module\loaders\html.js
 * @Description: Coding something
 */
import {compileSingleFile} from '..';
import {babelLoader} from './babel';
import {cssLoader} from './css';
import {jsLoader, jsxLoader} from './jsx';
import {lessLoader} from './less';
import {Loader} from './loader-base';

class HtmlLoader extends Loader {
    compiler = htmlCompiler;
    name = 'html';
}

function htmlCompiler (content) {
    const container = document.createElement('div');
    container.innerHTML = content;

    const script = checkScriptTag(container);

    const style = checkStyleTag(container);

    const nodes = container.childNodes;
    if (nodes.length === 1) {
        return nodes[0];
    }
    return {
        dom: nodes,
        script,
        style,
    };
}

function checkScriptTag (container) {
    const scripts = container.getElementsByTagName('script');
    
    const result = [];
    for (let i = 0; i < scripts.length; i++) {
        result.push(compileSingleScriptDom(scripts[i]));
    }
    return result;
}

function compileSingleScriptDom (script) {
    if (script.src) {
        return compileSingleFile(script.src);
    } else {
        let loader = null;
        if (script.getAttribute('jsx') === 'true') {
            loader = jsxLoader;
        } else if (script.getAttribute('babel') !== 'false') {
            loader = babelLoader;
        } else {
            loader = jsLoader;
        }
        return loader.compileContent(script.innerText);
    }
}

function checkStyleTag (container) {
    const styles = container.getElementsByTagName('style');
    const result = [];
    for (let i = 0; i < styles.length; i++) {
        result.push(compileSingleStyleDom(styles[i]));
    }
    return result;

}
function compileSingleStyleDom (style) {
    if (style.src) {
        return compileSingleFile(style.src);
    } else {
        let loader = null;
        if (style.getAttribute('less') === 'true') {
            loader = lessLoader;
        } else {
            loader = cssLoader;
        }
        return loader.compileContent(style.innerText);
    }
}

export const htmlLoader = new HtmlLoader();