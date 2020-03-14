let list = [];
let json = {
    all: 'all',
    error: 'error',
    warn: 'warn',
    log: 'log',
    info: 'info',
    tc: 'tc',
    html: 'html'
};
for (var k in json) {
    if (json[k] !== json.all) {
        list.push(json[k]);
    }
}
json.list = list;
export default json;