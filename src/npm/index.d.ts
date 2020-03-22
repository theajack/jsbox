declare interface config {
    theme?: string;
    code?: string;
    lib?: Array<string>;
    config?: string;
    id?: string;
    env?: string;
};

declare interface JSBoxStatic {
    (options?: config): void;
    config(options?: config):config;
};

declare const JSBox:JSBoxStatic;

export default JSBox;