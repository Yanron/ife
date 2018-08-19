//路由模块，表单模块，数据处理模块，表格模块，图表模块。
//    数据处理
function processData(d) {
    let data = [],regionIdx=[],productIdx=[];
    regionResult = regionWrapper.querySelectorAll('input:checked');
    productResult = productWrapper.querySelectorAll('input:checked');
    setHash(regionResult,productResult);
    if (regionResult[0].value == "全选" && productResult[0].value == "全选") {
        return d;
    } else {
        d.map(function (val, idx, arr) {
            for (let i = 0; i < productResult.length; i++) {
                if (val.product == productResult[i].value) {
                    for (let j = 0; j < regionResult.length; j++) {
                        if (val.region == regionResult[j].value)data.push(val);
                    }
                }
            }
        });
        return data;
    }
}

//    表格渲染
function renderForm(data) {
    regionResult = regionWrapper.querySelectorAll('input:checked');
    productResult = productWrapper.querySelectorAll('input:checked');
    let th = document.querySelectorAll('.show th');
    th[0].innerText = '商品';
    th[1].innerText = '地区';
    let parent = document.getElementsByTagName('tbody')[0],
        str = '', len = data.length;
    if (productResult.length == 1) {
        //商品一个,多个地区;都是一个[我商品都在0号，地区都在一号]
        str += `<tr><td rowspan="${data.length}">${data[0].product}</td>`;
        data.forEach(function (value, idx, arr) {
            str += `<td data-row="${idx}">${value.region}</td>`;
            str = str + monthData(value.sale) + '</tr>'
        })
    } else if (regionResult.length == 1) {
        //地区一个商品多个,少起始的tr标签但浏览器自动补全了。。
        th[1].innerText = '商品';
        th[0].innerText = '地区';
        str += `<tr><td rowspan="${data.length}">${data[0].region}</td>`;
        data.forEach(function (value, idx, arr) {
            str += `<td data-row="${idx}">${value.product}</td>`;
            str = str + monthData(value.sale) + '</tr>'
        })
    } else {
        //都是多个
        let i = 0, s, j;
        if (regionResult[0].value == "全选") {
            regionResult = Array.prototype.slice.call(regionResult);
            regionResult.shift();
        }
        if (productResult[0].value == "全选") {
            productResult = Array.prototype.slice.call(productResult)
            productResult.shift();
        }
        for (let k = 0; k < productResult.length; k++) {
            s = i;
            while (i < data.length && productResult[k].value == data[i].product) {
                i++;
            }
            str += `<tr class="test" data-row="${i}"><td rowspan="${i - s}">${data[s].product}</td>`
            for (j = s; j < i; j++) {
                if (j == s) {
                    str += `<td>${data[j].region}</td>`
                } else {
                    str += `<tr data-row="${j}"><td>${data[j].region}</td>`
                }
                str = str + monthData(data[j].sale) + '</tr>';
            }
        }
    }
    parent.innerHTML = '';
    parent.innerHTML = str;
}
let monthData = function (d) {
    let str = '';
    for (let i = 0; i < d.length; i++)str += `<td data-month="${i}"><span class="d">${d[i]}</span><input type="text" class="num" value=""><span class="editor">编辑</span><span class="commit">确认</span><span class="cancel">取消</span></td>`
    return str;
}
let tbody = document.querySelectorAll('.show tbody')
//    数据编辑,没做事件委托了
tbody[0].addEventListener('click', function (e) {
    let parent = e.target.parentNode;
    let active=this.querySelector('.active')
    let input = parent.querySelectorAll('.num')[0];
    if (e.target && e.target.classList[0]==='editor') {
        //有别的点了编辑就先把别的取消掉
        if(active)active.classList.remove('active');
        parent.classList.add('active');
    }else if(e.target.classList[0]=="commit"||e.target.classList[0]=="cancel"){
        if(e.target.classList[0]=="commit")updateLocal(input.value,parent);
        parent.classList.remove('active');
    }
})
/*处理hover事件,因为hover触发的问题会导致不同的单元格都有一次动画，所以我直接去了动画*/
function hoverShow(ele, over, out) {
    ele.addEventListener('mouseover', over, false);
    ele.addEventListener('mouseout', out, false);
}
hoverShow(tbody[0], function (e) {
   // console.log('in');
    if (e.target) {
        let data = [], row;
        if (e.target.nodeName === 'TD') {
            row = e.target.parentNode
        } else {
            row = e.target.parentNode.parentNode
        }
        for (let i = row.childNodes.length, k = 0; k < 12; i--, k++)
            data.unshift(row.childNodes[i - 1].children[0].innerText);
        bar_cfg.data = cfg.data = [];
        bar_cfg.data.push({sale: data});
        cfg.data.push({sale: data})
//           重新渲染图标;不明白为什么TD里面的不算TD
        updateGraph();
    }
}, function (e) {
   // console.log('leave');
    bar_cfg.data = cfg.data = localData;
    updateGraph();
//        当鼠标移出tbody时显示所有数据，用localStorage里的
    /*  if(e.currentTarget&& e.currentTarget.nodeName==='TBODY'){
     //woc用currentNode只要当前不是tbody就换，而不是包括在body里面就行

     }*/
})
function updateLocal(val,td){
    let month,product;
    if(!isNaN(Number(val))){
        td.children[0].innerText=val;
        let idx=td.parentNode.children.length-13;
        product=td.parentNode.children[idx].getAttribute('data-row');
        month=td.getAttribute('data-month');
        localData[product].sale[month]=Number(val);
        localStorage.localData=JSON.stringify(localData);
    }
}

