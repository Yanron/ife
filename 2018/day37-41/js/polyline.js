/*绘制折线图组件对象*/
var ComponentPolyline=function(name,cfg){
    var component=new ComponentBase(name,cfg);
    component.innerTex='test';
    //绘制网格线
    var w=cfg.width,h=cfg.height;
    var canvas=document.createElement('canvas'),
        ctx=canvas.getContext('2d')
        canvas.height=ctx.height=h;
        canvas.width=ctx.width=w;
    component.appendChild(canvas);
    var step=10;
    //水平线
    ctx.beginPath();
    ctx.lineWidth=1;
    ctx.strokeStyle="#AAA";
    window.ctx=ctx;
    for(var i=0;i<step+1;i++){
        var y=(h/step)*i;
        ctx.moveTo(0,y);
        ctx.lineTo(w,y);
    }
    //垂直线
    step=13;
    var text_w=w/step>>0;
    for(let i=0;i<step+1;i++){
        var x=(w/step)*i;
        ctx.moveTo(x,0);
        ctx.lineTo(x,h);
        if(i!=0&&i!=step){
            var text=document.createElement('div');
            text.setAttribute('class','text');
            text.innerText=`${i}月`;
            text.style.cssText=`width:${text_w}px;left:${x-text_w/2}px;`;
            component.appendChild(text);
        }
    }
    ctx.stroke();
    //绘制折线
    var canvas2=document.createElement('canvas'),
        ctx2=canvas2.getContext('2d');
    canvas2.width=ctx2.width=w;
    canvas2.height=ctx2.height=h;
    canvas2.setAttribute('class','line');
    component.appendChild(canvas2);
    var findMaxData=function(){
        var max=0;
        if(cfg.data.length==1)max=Math.max(...cfg.data[0].sale);
        else{
            for(let j=0;j<cfg.data.length;j++){
                let temp=Math.max(...cfg.data[j].sale);
                max=temp>max?temp:max;
            }
        }
        return max
    }
    /*绘图*/
    var draw=function(per){
      /*  canvas2.width=w;
        canvas2.height=h;*/
        ctx2.clearRect(0,0,w,h);
        ctx2.lineWidth=2;
        var max=findMaxData();
        var m= 0,n=[],k;//为了不顶到头
        //先寻找数据中的最大值好设置比例
        for(let j=0;j<cfg.data.length;j++){
            ctx2.beginPath();
            ctx2.strokeStyle=cfg.color[j];
            //等于一的话比例尺不同
            k=(h-15)/max;
            var row_w=(w / (cfg.data[j].sale.length+1));
            ctx2.fillStyle='black';
            for(let i=0;i<cfg.data[j].sale.length;i++){
                let item=cfg.data[j].sale[i];
                m=row_w*(i+1);
                n[i]=h-(item*k*per);
                ctx2.moveTo(m,n[i]);
                ctx2.arc(m,n[i],2,0,2*Math.PI);
                ctx2.font="13px ";
                ctx2.fillText(item,m,n[i]);
            }
            ctx2.moveTo(row_w,n[0]);
            for(i=1;i<cfg.data[j].sale.length;i++) {
                ctx2.lineTo(row_w * (i + 1), n[i]);
            }
            ctx2.stroke();
        }

      //  ctx2.strokeStyle='rgba(0,0,0,0)';
        //将路径闭合才可以fill,之前动画有些毛病不知道为什么每次不清空画布，所以就fill了。。。
        /*ctx2.lineTo(m,h);
        ctx2.lineTo(row_w,h);
        ctx2.lineTo(row_w,n[0]);
        ctx2.fillStyle='transparent'
        ctx2.fill();*/
    }
    component.show=function(){
        var s=0;
        /*for(let i=0;i<=100;i++){
            setTimeout(function() {
                s+=.01;
                draw(s)
            }, i*10+500);
        }*/
        draw(1);
    }
    return component;
}