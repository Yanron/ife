/**
 * Created by lenovo on 2018/8/19.
 */
// setup canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
// function to generate random number
function random(min,max) {
    var num = Math.floor(Math.random()*(max-min)) + min;
    return num;
}

function Ball(x,y,velX,velY,color,size){
    this.x=x;
    this.y=y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}
Ball.prototype.draw=function(){
    ctx.beginPath();
    ctx.fillStyle=this.color;
    ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
    ctx.fill();
}
Ball.prototype.update=function(){
    if((this.x+this.size)>=width||(this.x-this.size)<=0)
        this.velX=-(this.velX);
    if((this.y+this.size)>=height||(this.y-this.size)<=0){
        this.velY=-(this.velY);
    }
    this.x+=this.velX;
    this.y+=this.velY;
}
Ball.prototype.collisionDetect=function(){
    for(var j=0;j<balls.length;j++){
        if(!(this===balls[j])){
            var dx=this.x-balls[j].x;
            var dy=this.y-balls[j].y;
            var distance=Math.sqrt(dx*dx+dy*dy);

            if(distance<this.size+balls[j].size){
                //balls[j].color=this.color='rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255);
                //按照自己的想法让实现以下碰撞弹回去，但效果emmm...
                /*完全不知道碰撞要怎么写，不想算和速度直接分速度套公式？
                质量我直接用面积了哈哈哈哈哈*/
                var m1=this.size*this.size*Math.PI,
                    m2=balls[j].size*balls[j].size*Math.PI
                var v1x=((m1-m2)*this.velX+2*m2*balls[j].velX)/(m1+m2);
                var v1y=((m1-m2)*this.velY+2*m2*balls[j].velY)/(m1+m2),
                    v2x=((m2-m1)*balls[j].velX+2*m1*this.velX)/(m1+m2),
                    v2y=((m2-m1)*balls[j].velY+2*m1*this.velY)/(m1+m2);
                this.velX=v1x;this.velY=v1y;balls[j].velX=v2x;balls[j].velY=v2y;
            }
        }
    }
}
/*使小球动起来*/
var balls=[];
function loop(){
    ctx.fillStyle='rgba(0,0,0,0.25)';
    ctx.fillRect(0,0,width,height);
    while(balls.length<25){
        var ball=new Ball(
            random(0,width),
            random(0,height),
            random(-7,7),
            random(-7,7),
            'rgb('+random(0,255)+','+random(0,255)+ ',' + random(0,255) +')',
            random(10,20)
        );
        balls.push(ball);
    }
    for(var i=0;i<balls.length;i++){
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }
    requestAnimationFrame(loop);
}
loop();