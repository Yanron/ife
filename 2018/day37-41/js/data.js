
function processData(d){
    let data=[];
    let regionResult=regionWrapper.querySelectorAll('input:checked'),
    productResult=productWrapper.querySelectorAll('input:checked');
    if(regionResult[0].value=="全选"&&productResult[0].value=="全选"){
        return d;
    }else {
        d.map(function(val,idx,arr){
            for(let i=0;i<productResult.length;i++){
                if(val.product==productResult[i].value){
                    for(let j=0;j<regionResult.length;j++){
                        if(val.region==regionResult[j].value)data.push(val);
                    }
                }
            }
        });
        return data;
    }
}