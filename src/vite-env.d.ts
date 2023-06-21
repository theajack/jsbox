/*
 * @Author: theajack
 * @Date: 2023-04-04 23:20:27
 * @Description: Coding something
 */
// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

declare let __DEV__: boolean;

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<object, object, unknown>;
    export default component;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}