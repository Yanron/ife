/**
 * Created by lenovo on 2018/8/19.
 */
//餐厅
function Restaurant(obj){
    this.cash=obj.cash;
    this.seats=obj.seats;
    this.staff=obj.staff;
}
Restaurant.prototype.hire=function(o){
    this.staff.push(o);
    console.log('hire');
}
Restaurant.prototype.fire=function(o){
    if(this.staff.length>0){//staff用map/set比较好
        for(let i=0;i<this.staff.length;i++) {
            if (this.staff[i].id == o.id) {
                this.staff.splice(i,1);
                console.log('fire succeed');
                return o.id;
            }
        }
    }
    console.log('nobody can be fire')
}
//职员
function Staff(id,name,salary){
    this.id=id;
    this.name=name;
    this.salary=salary;
}
Staff.prototype.work=function(){
    console.log('finish work');
}
//服务员
function Waiter(id,name,salary){
    Staff.call(this,id,name,salary);
}
Waiter.prototype=Object.create(Staff.prototype);
Waiter.prototype.constructor=Waiter;
Waiter.prototype.work=function(attr){
    if(Array.isArray(attr)){
        console.log('Order:'+attr.join(','));
    }else{
        console.log('dishes done');
    }
}
//厨师
function Cook(id,name,salary){
    Staff.call(this,id,name,salary);
}
Cook.prototype=Object.create(Staff.prototype);
Cook.prototype.constructor=Cook;
Cook.prototype.work=function(){
    console.log('cook done');
}
//顾客
function Customer(obj){
    this.id=obj.id;
    this.name=obj.name;
}
Customer.prototype.order=function(food){
    console.log('order '+food);
}
Customer.prototype.eat=function(food){
    console.log('eat '+food);
}
//菜品
function Dishes(obj){
    this.name=obj.name;
    this.cost=obj.cost;
    this.price=obj.price;
}

var ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 20,
    staff: []
});

var newCook = new Cook("0","Tony", 10000);
var newWaiter = new Waiter({
    id:2,
    name:'Sara'
})
ifeRestaurant.hire(newCook);
ifeRestaurant.hire(newWaiter);
console.log(ifeRestaurant.staff);
newWaiter.work(['food1','food2']);
ifeRestaurant.fire(newCook);
console.log(ifeRestaurant.staff);