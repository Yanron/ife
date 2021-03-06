/*基本组件对象*/
var ComponentBase = function (name, cfg) {
    var cfg = cfg || {}
    var id
    var cls = `component_${cfg.type} component_name_${name}`;
    var component = document.createElement('div');
    component.setAttribute('class', 'component_' + cls + ' ');
    cfg.text && (component.innerText = cfg.text);
    if(cfg.css){
        for(let attr in cfg.css)
            component.style[attr]=cfg.css[attr];
    }
    if(typeof cfg.onclick==='function')component.addEventListener('click',cfg.onclick);
    return component;
}
function updateGraph(){
    let polyline=ComponentPolyline('polyline',cfg);
    var bar=ComponentBar('bar',bar_cfg);
    canvas.innerHTML=''
    canvas.appendChild(polyline);
    canvas2.innerHTML='';
    canvas2.appendChild(bar);
    polyline.show();
}