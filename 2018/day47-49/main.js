/**
 * Created by lenovo on 2018/8/28.
 */
class Restaurant {
    constructor(obj) {
        this.cash = obj.cash;
        this.seats = obj.seats;
        this.staff = obj.staff;
    }

    hire(o) {
        this.staff.push(o);
        console.log('hire succeed');
    }

    fire(o) {
        if (this.staff.length > 0) {//staff用map/set比较好
            for (let i = 0; i < this.staff.length; i++) {
                if (this.staff[i].id == o.id) {
                    this.staff.splice(i, 1);
                    console.log('fire succeed');
                    return o.id;
                }
            }
        }
        console.log('nobody can be fire')
    }
}
class Staff {
    constructor(id, name, salary) {
        this.id = id;
        this.name = name;
        this.salary = salary
    }

    work() {
        console.log('finish work');
    }
}
let waiterSuauts = document.querySelector('.waiter .status p');
class Waiter extends Staff {
    constructor(id, name, salary) {
        super(id, name, salary);
        waiterSuauts.innerText = '空闲';
        this.instance = null;
    }

    static getInstance(id, name, salary) {//单例模式
        if (typeof this.instance !== 'object') {
            this.instance = new Waiter(id, name, salary);
        }
        return this.instance;
    }

    //走
    findCook(orderResult) {
        console.log('找厨师');
        waiterSuauts.innerText = 'walking';
        let promise = new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(orderResult);
                waiterSuauts.innerText = 'waiting cook';
            }, 500);
        });
        return promise;
    }

    findCustomer(food, idx) {
        console.log('上菜:', food[idx].name);
        waiterSuauts.innerText = 'walking';
        let orderListStatus = document.querySelectorAll('.orderListStatus');
        let promise = new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log(food[idx].name, '已上')
                orderListStatus[idx].innerText = '已上';
                resolve(food);
            }, 500);
        });
        return promise;
    }
    toCash(){
        console.log('to cash');
        let p=new Promise(function(resolve,reject){
            waiterSuauts.innerText = 'walking';
            setTimeout(function () {
                waiterSuauts.innerText = 'waiting customer';
                resolve();
            }, 500);
        })
        return p;
    }

    //收银
    cash(f) {
        console.log("开始收钱");
        waiterSuauts.innerText = '收钱';
        let price= f.reduce(function(accumulator,current){
            return accumulator+current.price
        },0);
        let cur=document.getElementById('currency'),
            money=Number(cur.innerText)+price;
        let promise = new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log('finish');
                waiterSuauts.innerText = 'waiting customer';
                cur.innerText=money;
                customers.shift();
                start();
                resolve('next');
            }, 2000);
        });
        return promise;
    }
}
let cookStauts = document.querySelector('.cook .status p');
let cookListStatus;
let waitingList = document.querySelector('.waiting-list')
class Cook extends Staff {
    constructor(id, name, salary) {
        super(id, name, salary);
        this.status = '空闲';
        this.instance = null;
        cookStauts.innerText = this.status;
    }

    static getInstance(id, name, salary) {
        if (typeof this.instance !== 'object') {
            this.instance = new Cook(id, name, salary);
        }
        return this.instance;
    }

    /*cookFood(food) {
     console.log(food[0].name);
     let str = `cooking ${food[0].name}`;
     resetTime(cookStauts,food[0].cost*1000,str);
     let i = 0,list='';
     food.map(function(val,idx){
     list+=`<li>${val.name}<span data-idx="${idx}" class="cookListStatus">等待</span></li>`
     })
     waitingList.innerHTML='';
     waitingList.innerHTML=list;
     //用于菜单的循环
     function cooking(resolve,food,i){
     setTimeout(function () {
     if (i+1 < food.length) {
     str = `cooking ${food[++i].name}`;
     resetTime(cookStauts,food[i].cost*1000,str);
     cookListStatus[i-1].innerText='完成';
     resolve(food[i-1]);
     cooking(resolve);
     }else{
     cookStauts.innerText ='空闲';
     cookListStatus[i].innerText='完成';
     resolve(food[i]);
     }
     }, food[i].cost * 1000);
     let promise= new Promise(function(resolve,reject){
     //做一些异步操作！！
     cookListStatus=document.querySelectorAll('.cookListStatus');
     cooking(resolve);
     console.log('cook done');
     })
     return promise;
     }

     }*/
    cookFood(food, idx) {
        let promise = new Promise(function (resolve, reject) {
            //做一些异步操作！！
            cookListStatus = document.querySelectorAll('.cookListStatus');
            let str = `cooking ${food[idx].name}`;
            resetTime(cookStauts, food[idx].cost * 1000, str);
            setTimeout(function () {
                cookListStatus[idx].innerText = '完成'
                resolve(food);
            }, food[idx].cost * 1000);
        })
        return promise;
    }
}
let customerSuauts = document.querySelector('.customer .status p');
let orderListStatus;
class Customer {
    constructor(id, name) {
        this.id = id;
        this.name = name
        customerSuauts.innerText = '空闲';
    }

    order(menu) {
        let orderResult = [], orderList = document.querySelector('.order-list');
        let p = new Promise(function (resolve, reject) {
            if (menu) {
                resetTime(customerSuauts, 3000, '点菜中');
                orderList.innerHTML = '';
                let num, food;
                num = Math.floor(Math.random() * menu.length);//点菜的数量
                num = num ? num : 1;//防止是0额
                while (num--) {
                    food = Math.floor(Math.random() * menu.length);
                    orderResult.push(menu[food]);
                }
                setTimeout(function () {
                    customerSuauts.innerText = '等上菜';
                    let str = '';
                    orderResult.map(function (val, idx) {
                        str += `<li>${val.name}<span class="orderListStatus">等待</span></li>`
                    })
                    orderList.innerHTML = str;
                    resolve(orderResult);
                }, 3000);
            } else {
                reject(new Error('菜单不能为空'));
            }
        });
        return p;
        /* let promise = new Promise(function (resolve, reject) {
         if (menu) {
         resetTime(3000);
         console.log('order');
         resolve(menu);
         } else {
         reject();
         }
         });
         let orderResult = [], orderList = document.querySelector('.order-list');
         promise.then(function (menu) {
         let num, food;
         num = Math.floor(Math.random() * menu.length);//点菜的数量
         while (num--) {
         food = Math.floor(Math.random() * menu.length);
         orderResult.push(menu[food]);
         }

         setTimeout(function () {
         customerSuauts.innerText = '等上菜';
         let str = '';
         orderResult.map(function (val, idx) {
         console.log(val);
         str += `<li>${val.name}<span>等待</span></li>`
         })
         orderList.innerHTML = '';
         orderList.innerHTML = str;
         }, 3000);
         return orderResult;
         }).catch(function () {
         throw new Error('菜单不能为空');
         })*/
    }

    eat(food, idx) {
        //我是不是应该监听状态的改变？万一吃的快，这边总不能不顾上菜就循环完了吧。。。
        console.log(food, idx);
        customerSuauts.innerText = customers[0].name+' eat ' + food[idx - 1].name;
        let orderListStatus = document.querySelectorAll('.orderListStatus');
        let promise = new Promise(function (resolve, reject) {
            setTimeout(function () {
                orderListStatus[idx - 1].innerText = '吃完';
                console.log(food[idx - 1].name, '一吃完');
               /* //hhhh原来还可以在里面调用，我实现的也是及其扭曲，不能在里面调用次数不对。。。
                if (idx < foodlist.length && orderListStatus[idx].innerText === '已上') {
                    //while(orderListStatus[idx].innerText!=='已上');
                    customers[0].eat(food, ++idx);
                }*/
                resolve(food);
            }, food[idx - 1].eatTime * 1000)
        })
        return promise;
    }

    payCheck(cost) {
        console.log(cost);
    }
}
class Dishes {
    constructor(obj) {
        this.name = obj.name
        this.cost = obj.cost
        this.price = obj.price
        this.eatTime = obj.eatTime
    }
}
//倒计时
function resetTime(obj, time, str) {
    var timer = null;
    var t = time;
    var s = 0;
    s = Math.floor(t / 1000);
    obj.innerText = str + ' 还剩' + s + '秒';
    function countDown() {
        s--;
        if (s <= 0) {
            clearInterval(timer);
        }
        obj.innerText = str + ' 还剩' + s + '秒';
        ;
    }

    timer = setInterval(countDown, 1000);
}
var menu,customers;
(function init(){
    menu = [
        new Dishes({name: 'Salad', cost: 2, price: 5, eatTime: 5}),
        new Dishes({name: 'Sandwich', cost: 4, price: 6, eatTime: 4}),
        new Dishes({name: 'Pizza', cost: 6, price: 10, eatTime: 10}),
        new Dishes({name: 'Spaghetti', cost: 5, price: 10, eatTime: 8}),
        new Dishes({name: 'Cola', cost: 2, price: 5, eatTime: 5}),
        new Dishes({name: 'Coffee', cost: 3, price: 7, eatTime: 5})
    ]
    customers = [
        new Customer('0','Tony'),
        new Customer('1','Shawn'),
        new Customer('2','Lily'),
        new Customer('3','Ryan'),
        new Customer('4','Molly'),
        new Customer('5','Kelly')
    ]
})()

/*test*/
let run=document.getElementById('run');
run.onclick=function(e){
    start();
}
var waiter = Waiter.getInstance('1', 'Liko', 666);
var cook = Cook.getInstance('2', 'Sam', 909);
var wPromise, cPromise;
function subPromise(food, idx) {
    console.log('subPromise：',idx);
    if (idx < food.length-1) {
        cook.cookFood(food, idx)
            .then(function (f) {
                waiter.findCustomer(f, idx).then(function (food) {
                    //这里面的function取不到外面的变量。。。
                    console.log(idx);
                    if(idx!==food.length)wPromise = waiter.findCook(food);
                    cPromise = customers[0].eat(food, idx);
                });
                subPromise(food, ++idx);
            })
    } else if(idx===food.length-1){
        cook.cookFood(food, idx)
            .then(function (f) {
                waiter.findCustomer(f, idx).then(function (food) {
                    console.log(idx);
                    cPromise = customers[0].eat(food, idx).then(waiter.cash);;
                });
                subPromise(food, ++idx);
            })
    } else {
        cookStauts.innerText = '空闲';
        waiter.toCash();
        let p=new Promise(function(resolve,reject){
            resolve();
        });
    }
}
function start(){
    if(customers.length){
        let customerList='',queue=document.querySelector('.waiting')
        for(let i=1;i<customers.length;i++){
            customerList+=`<li>${customers[i].name}</li>`
        }
        queue.innerHTML='';queue.innerHTML=customerList;
        customers[0].order(menu).then(waiter.findCook)
            .then(function (food) {
                let list = '';
                food.forEach(function (val, idx,arr) {
                    list += `<li>${val.name}<span data-idx="${idx}" class="cookListStatus">等待</span></li>`
                })
                waitingList.innerHTML = '';
                waitingList.innerHTML = list;
                //subPromise
                let index = 0;
                let promise=subPromise(food, index);
                return promise;
            }).then(console.log('out'));
    }
}

