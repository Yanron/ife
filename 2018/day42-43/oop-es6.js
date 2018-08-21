/**
 * Created by lenovo on 2018/8/20.
 */
class Restaurant{
    constructor(obj){
        this.cash=obj.cash;
        this.seats=obj.seats;
        this.staff=obj.staff;
    }
    hire(o){
        this.staff.push(o);
        console.log('hire succeed');
    }
    fire(o){
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
}
class Staff{
    constructor(id,name,salary){
        this.id=id;
        this.name=name;
        this.salary=salary
    }
    work(){
        console.log('finish work');
    }
}
class Waiter extends Staff{
    constructor(id,name,salary){
        super(id,name,salary)
    }
    work(attr){
        if(Array.isArray(attr)){
            console.log('Order:'+attr.join(','));
        }else{
            console.log('dishes done');
        }
    }
}
class Cook extends Staff{
    constructor(id,name,salary){
        super(id,name,salary)
    }
    work(){
        console.log('cook done');
    }
}
class Customer{
    constructor(id,name){
        this.id=id;
        this.name=name
    }
    order(food){
        console.log('order '+food);
    }
    eat(food){
        console.log('eat '+food);
    }
}
class Dishes{
    constructor(name,cost,price){
        this.name=name
        this.cost=cost
        this.price=price
    }
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