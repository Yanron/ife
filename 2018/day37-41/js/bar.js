/**
 * Created by lenovo on 2018/8/6.
 */
var ComponentBar=function(name,cfg){
    /*CSS写的有问题，动画效果不对emmm*/
    var component=new ComponentBase(name,cfg);
    var max=Math.max(...cfg.data[0].sale);
    //console.log(cfg)
    var k=(cfg.height-15)/max;//为了不顶到头
    cfg.data[0].sale.forEach(function(value,idx,arr){
        var bar=document.createElement('div'),
            text=document.createElement('div'),
            sale=document.createElement('div'),
            item=document.createElement('div');
        bar.setAttribute('class','perBar');
        text.setAttribute('class','text');
        sale.setAttribute('class','sale');
        item.setAttribute('class','item');
        text.innerText=value;
        sale.innerText=`${idx+1}`;
        //bar.style.height=`0px`;
        bar.style.height=`${k*value}px`;
        item.style.width=`${Math.floor(cfg.width/cfg.data[0].sale.length)}px`;
        item.appendChild(text);
        item.appendChild(bar);
        item.appendChild(sale);
        component.appendChild(item);
    });
    var perBar=document.getElementsByClassName('perBar');
   /* var draw=function(per){
       for(let i=0;i<perBar.length;i++){
           perBar[i].style.height=`${k*cfg.data.sale[i]*per}px`;
       }
    }
    component.show=function(){
        var s=0;
        for(let i=0;i<=100;i++){
            setTimeout(function() {
                s+=.01;
                draw(s)
            }, i*10+500);
        }
    }*/
   return component;

}