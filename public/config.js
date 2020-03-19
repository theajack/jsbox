window.jsbox_config = {
    libs: {
        // 'cnchar': 'https://cdn.jsdelivr.net/gh/theajack/cnchar/dist/cnchar.latest.min.js',
        // 'jQuery': 'https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js',
        // 'easy-icon': {
        //     type: 'style',
        //     versio: '1.0.1',
        //     url: 'https://cdn.jsdelivr.net/gh/theajack/easy-icon/dist/easy-icon.min.css'
        // },
        'jsbox.cnchar': '',
        'cnchar-order': 'jsbox.cnchar-order',
    },
    codes: { //
        'helloWorld': 'console.log("Hello world")', // 默认使用上面定义的所有依赖
        'testCnchar': {
            code: 'cnchar.spell("你好")',
            dep: ['cnchar-order'], // 定义依赖，优先从当前文件中查找，如果没有会尝试在jsbox预定义库中查找
        },
    }
};

// https://cdn.jsdelivr.net/npm/virtual-dom@2.1.1/dist/virtual-dom.js