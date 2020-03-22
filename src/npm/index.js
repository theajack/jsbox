let config = {};

export default function jsbox (options) {

};

jsbox.config = function (options) {

};

function handleConfig ({
    theme = 'normal',
    code = 'console.log("Hello JSBox!")',
    lib = null,
    config = null,
    id = null,
    env = null
}) {
    if (config) {
        
    } else if (env) {
        config;
    } else if (lib) {
        
    }
    
    return {
        theme, code, lib
    };
}
