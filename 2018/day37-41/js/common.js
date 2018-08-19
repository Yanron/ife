/*Hash*/
function resolveHash() {
    let val = JSON.parse(decodeURI(window.location.hash.slice(1)));
    return val;
}
function setHash(regionResult, productResult) {
    let r=[],p=[];
    regionResult = [].slice.call(regionResult);
    for(let i in regionResult)r.push(regionResult[i].value);
    productResult = [].slice.call(productResult)
    for(let j in productResult)p.push(productResult[j].value);
    let hash = {region: r, product: p}
    location.hash = JSON.stringify(hash);
}
function updateInput(region,product){
    let regionInput=regionWrapper.querySelectorAll('input'),
        productInput=productWrapper.querySelectorAll('input');
    if(region[0]=='全选'){
        for(let j=0;j<regionInput.length;j++)regionInput[j].checked=true;
    }
    else{
        //重置
        for(let j=0;j<regionInput.length;j++)regionInput[j].checked=false;
        for(let i=0;i<region.length;i++){
            for(let j=i+1;j<regionInput.length;j++){
                //console.log(region[i],regionInput[j].value);
                if(region[i]==regionInput[j].value)regionInput[j].checked = true;
            }
        }
    }
    if(product[0]=='全选'){
        for(let j in productInput)productInput[j].checked=true;
    }
    else{
        for(let j=0;j<productInput.length;j++)productInput[j].checked=false;
        for(let i=0;i<product.length;i++){
            for(let j=i+1;j<productInput.length;j++){
                if(product[i]==productInput[j].value)productInput[j].checked = true;
            }
        }
    }
}
// 有hash就按hash的来。
if(location.hash){
    let region, product;
    region =resolveHash().region;
    product=resolveHash().product;
    updateInput(region,product);
}
/*history hash的改变也可以后退！？不用push进去*/
window.onpopstate=function(){
    let region, product;
    region =resolveHash().region;
    product=resolveHash().product;
    updateInput(region,product);
    localData = processData(sourceData);
    bar_cfg.data = cfg.data = localData;
    updateGraph();
    renderForm(localData);
}