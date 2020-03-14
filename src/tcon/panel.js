/**
 * plugin 显示面板
 */
import tool from './lib/tool'
import Arrow from './ui/arrow'
import {storageState,STATE} from './storageState'
let panel = {
    hasInit:false,
    parHeight : window.innerHeight,
    pluginList:[],
    uninitList:[],
    use(...plugins){
        if(!this.hasInit){
            this.uninitList.push(...plugins);
            return;
        }
        let pluginObjs=[]; 
        for(var i=0;i<plugins.length;i++){
            if(!plugins[i].__has_tcon_use){
                plugins[i].__has_tcon_use=true;
                pluginObjs.push(new plugins[i]());
                // 防止加载重复的plugin
            }
        }
        initPlugins(pluginObjs);
        this.pluginList.push(...pluginObjs);
        if(this.pluginList.length>0){
            this.el.main.style.display = 'block';
        }
    },
    active:0,
    el:{},
    init(el){
        initUI(el)
        initOnresize();
        initArrow(el);
        this.hasInit = true;
        if(this.uninitList.length>0){
            this.use(...this.uninitList);
            this.uninitList=[];
        }
    },
    setHeight(height){
        this.parHeight = height;
        if(this.hasInit){
            openState.render();
        }
    },
    resetLeft(width){
        panel.el.pages.style.transform = 'translate('+(-panel.active*width)+'px)';
    }
}

function initUI(el){
    let _main = tool.create('div','panel');
        let _tabs = tool.create('div','panel-tabs');
        let _pages_w = tool.create('div','panel-pages-w');
            let _pages = tool.create('div','panel-pages');
        tool.append(_pages_w,[_pages]);
    tool.append(_main,[_tabs,_pages_w]);
    tool.append(el,[_main]);
    panel.el.main = _main;
    panel.el.tabs = _tabs;
    panel.el.pages = _pages;
    panel.el.pagew = _pages_w;
}
function initPlugins(plugins){
    let res = generateTabsAndPages(plugins);
    tool.append(panel.el.tabs,res.tabs);
    tool.append(panel.el.pages,res.pages);
    let addToTcon = (typeof window ==='object' && window.TCon)
    plugins.forEach((item,index)=>{
        if(addToTcon){
            window.TCon.plugins[item.title] = item;
        }
        if(item.mounted)
            item.mounted();
    })
}
function generateTabsAndPages(plugins){
    let tabs=[],pages=[];
    let length = panel.pluginList.length;
    plugins.forEach((item,index)=>{
        let tab = tool.create('div','panel-tab'+((index===panel.active)?' active':''),item.title,()=>{
            if(panel.active === index){
                return;
            }
            if(item.onShow){
                item.onShow(index);
            }
            let active = panel.pluginList[panel.active];
            if(active.onHide){
                active.onHide(index)
            }
            active.tab.className = 'tc-panel-tab';
            panel.active = index;
            item.tab.className = 'tc-panel-tab tc-active';
            let width = item.page.offsetWidth;
            panel.resetLeft(width)
        });
        let page = tool.create('div','panel-page','',()=>{
        })
        item.tab = tab;
        item.page = page;
        item.tool = tool;
        item.index = length+index;
        tabs.push(tab);
        pages.push(page);
    })
    return {tabs,pages}
}
function initArrow(){
    panel.el.openArrow = new Arrow({
        direction:'left',
        parent:panel.el.main,
        click:()=>{
            openState.open();
        }
    })
    panel.el.hideArrow = new Arrow({
        direction:'right',
        parent:panel.el.main,
        click:()=>{
            openState.hide();
        }
    })
}




// 控制panel关闭打开
export let openState = {
    state : 'hide',// hide half open
    open(){
        if(this.state === 'hide'){
            this.state = 'half'
        }else if(this.state === 'half'){
            this.state = 'open'
        }
        this.render();
    },
    hide(){
        if(this.state === 'open'){
            this.state = 'half'
        }else if(this.state === 'half'){
            this.state = 'hide'
        }
        this.render();
    },
    render(){
        storageState(STATE.panelState,this.state)
        let width = window.innerWidth;
        let height = panel.parHeight - panel.el.tabs.offsetHeight;
        let translate = 100+'%';
        if(this.state === 'open'){
            translate = 0 +'%';
        }else if(this.state === 'half'){
            width *= 0.7;
            translate = window.innerWidth*0.3/width *100 +'%';
        }else{
            if(window.innerWidth!==window.document.documentElement.clientWidth){
                translate=window.document.documentElement.clientWidth+'px';
            }
        }
        panel.el.main.style.width=width+'px';
        panel.el.pagew.style.width=width+'px';
        panel.el.main.style.transform='translateX('+translate+')';
        panel.el.pages.parentNode.style.height = height+'px';
        let pages = panel.el.pages.children;
        for(var i=0;i<pages.length;i++){
            pages[i].style.height = height+'px';
            pages[i].style.width = width+'px';
        }
        panel.pageSize = {
            width,height
        }
        panel.pluginList.forEach((plugin)=>{
            if(plugin.onPageResize){
                plugin.onPageResize(panel.pageSize);
            }
        })
        panel.resetLeft(width);
    }
}
function initOnresize(){
    window.addEventListener('resize',function(){
        setTimeout(()=>{
            openState.render();
        },10)
    })
}
export default panel;