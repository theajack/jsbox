
import {getLoaderByFilePath} from './loader';
import {handleRelativePath, pathArrayToAbsolutePath} from './file-searcher';

const entry = '/index.html';

export const CompilePathStack = (() => {
    const stack = [entry];

    return {
        current () {
            return stack[stack.length - 1];
        },
        push (path) {
            const current =  pathArrayToAbsolutePath(
                handleRelativePath(this.current, path)
            );
            stack.push(current);
            return current;
        },
        pop () {
            return stack.pop();
        }
    };
})();

export function startCompileModules () {

    // console.log(entryFile);
    console.log(`编译开始，入口文件=${entry}`);
    const sandBoxResult = compileSingleFile(entry);

    console.log(sandBoxResult);

}

// 应返回 {style:[], dom:[], script: []}
// 当filePath 可传入绝对或相对路径
export function compileSingleFile (filePath) {
    const current = CompilePathStack.push(filePath);
    const loader = getLoaderByFilePath(current);
    const compileResult = loader.compileByAbsolutePath(current);

    console.log(filePath, loader, compileResult);
    CompilePathStack.pop();
}