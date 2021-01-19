// 将下列代码使用Promise改进
setTimeout(function() {
    var a = 'hello';
    setTimeout(function() {
        var b = 'lagou';
        setTimeout(function() {
            var c = 'i enheng~ you'
            console.log(`${a} ${b}, ${c}`)
        }, (10));
    }, (10));
}, (10));

(new Promise(function(resolve, reject) {
    setTimeout(function(){
        resolve('hello');
    }, 10);
}))
.then(data => {
    return new Promise(function(resolve, reject) {
        setTimeout(function(){
            resolve(`${data} lagou`);
        }, 10);
    })
})
.then(data => {
    return new Promise(function(resolve, reject) {
        setTimeout(function(){
            resolve(`${data}, i enheng~ you`);
        }, 10);
    })
})
.then(data => {
    console.log(data);
})