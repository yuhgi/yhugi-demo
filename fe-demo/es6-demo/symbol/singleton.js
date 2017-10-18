//使用Symbol()避免单例被修改
const SINGLETON_KEY = Symbol.for('singleton');

function Singleton(){
  this.sayHello = () => {
    console.log('Hello World');
  };
}

if(!global[SINGLETON_KEY]){
  global[SINGLETON_KEY] = new Singleton();
}

module.exports = global[SINGLETON_KEY];