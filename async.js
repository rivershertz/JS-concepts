// All of these functions are solutions to the challenges in https://www.csbin.io/async

/* CHALLENGE 2 */
function delayedGreet() {
  setTimeout(() => {
    console.log('C2');
  }, 3000);
}
// delayedGreet();

/* CHALLENGE 3 */
function helloGoodbye() {
  setTimeout(() => {
    console.log('C3');
  }, 2000);
  console.log('C3');
}
// helloGoodbye();

/* CHALLENGE 4 + 5 */
function brokenRecord() {
  let counter = 0;
  const id = setInterval(() => {
    if (counter > 4) return clearInterval(id);
    console.log('C4');
    counter++;
  }, 1000);
}
// brokenRecord();

/* CHALLENGE 6 */
function everyXsecsForYsecs(func, interval, duration) {
  const id = setInterval(() => {
    func();
  }, interval);

  setTimeout(() => {
    clearInterval(id);
  }, duration);
}
// everyXsecsForYsecs(
//   () => {
//     console.log('hi');
//   },
//   500,
//   2500
// );

/* CHALLENGE 7 */
function delayCounter(target, wait) {
  return () => {
    for (let i = 1; i < target; i++) {
      setTimeout(() => {
        console.log(i);
      }, wait * i);
    }
  };
}
const x = delayCounter(5, 1000);
// x();

/* CHALLENGE 8 */
function promised(val) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(val);
    }, 2000);
  });
}
const promise = promised('hello');
// promise.then((res) => console.log(res));

/* CHALLENGE 9 */
class SecondClock {
  constructor(cb) {
    this.cb = cb;
    this.counter = 0;
    this.intervalId = '';
  }
  start() {
    this.intervalId = setInterval(() => {
      this.cb((this.counter % 60) + 1);
      this.counter++;
    }, 1000);
  }
  reset() {
    clearInterval(this.intervalId);
    this.counter = 0;
    this.intervalId = '';
  }
}
const clock = new SecondClock((val) => console.log(val));
// console.log('starting clock');
// clock.start();
// setTimeout(() => {
//   clock.reset();
//   console.log('reset clock');
// }, 7000);

/* CHALLENGE 10 + adding leading feature*/
function debounce(callback, interval, {leading = false} = {}) {
  let timer;
  let isExecLeading = false;
  return (...args) => {
    if (leading && !isExecLeading) {
      callback.apply(this, ...args);
      isExecLeading = true;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (!leading) {
        callback.apply(this, ...args);
      }
      isExecLeading = false;
    }, interval);
  };
}

const xx = debounce(
  () => {
    console.log('debounced!!');
  },
  1000,
  {leading: true}
);
xx();
setTimeout(() => {
  xx();
}, 500);
setTimeout(() => {
  xx();
}, 1200);
