// All of these functions are solutions to the challenges in https://www.csbin.io/closures

// challenge 1
function createFunction() {
  return () => {
    console.log('challenge 1: hello');
  };
}
const fn1 = createFunction();
// fn1();

// challenge 2
function createFunctionPrinter() {
  return (input) => {
    console.log(`challenge 2: ${input}`);
  };
}
const fn2 = createFunctionPrinter();
// fn2('woohoo');

// challenge 3
function addByX(x) {
  return (input) => {
    console.log(`challenge 3: ${input} + ${x} = ${input + x}`);
  };
}
const addBy10 = addByX(10);
// addBy10(2);

// challenge 4
function once(callback) {
  let wasCalled = false;
  let callbackV;
  return (input) => {
    if (!wasCalled) {
      callbackV = callback(input);
      wasCalled = true;
      return callbackV;
    }
    return callbackV;
  };
}

const calledOnce = once((input) => input + 10);
// console.log(calledOnce(2));
// console.log(calledOnce(12));
// console.log(calledOnce(200));

// challenge 5
function after(count, func) {
  let counter = 0;
  return () => {
    counter++;
    if (counter > count) {
      func();
    }
  };
}
const fn5 = after(3, () => {
  console.log('Finally ran after 3 times');
});
// fn5();
// fn5();
// fn5();
// fn5();

// CHALLENGE 6
function delay(func, wait) {
  return (...args) => {
    setTimeout(() => func(...args), wait);
  };
}

const delayedAddition = delay((num1, num2) => {
  console.log(`Timed out: ${num1}+${num2}=${num1 + num2}`);
}, 100);
// delayedAddition(1, -20);

// CHALLENGE 7
function rollCall(names) {
  let index = 0;
  return () => {
    if (index < names.length) {
      console.log(`name: ${names[index]}`);
      index++;
      return;
    }
    console.log('Everyone accounted for');
  };
}

const names = ['nahar', 'ayala', 'dvir', 'maya'];
const rollCalled = rollCall(names);
// rollCalled();
// rollCalled();
// rollCalled();
// rollCalled();
// rollCalled();

// CHALLENGE 8
function saveOutput(func, magicWord) {
  const valuesMap = {};
  return (input) => {
    if (input === magicWord) {
      return valuesMap;
    }
    const v = func(input);
    valuesMap[input] = v;
    return v;
  };
}
const fn8 = saveOutput((input) => input + input, 'sharamha');
// console.log(fn8(2));
// console.log(fn8('sharamha'));

// CHALLENGE 9
function cycleIterator(array) {
  let counter = 0;
  return (number) => {
    // "round robin" index - https://youtu.be/CiT-qMYouUc?si=W4yXd2LlbsxDZkoV&t=1266
    return array[counter++ % array.length];
  };
}
const fn9 = cycleIterator([1, 2]);
// console.log(fn9());
// console.log(fn9());

// CHALLENGE 10
function defineFirstArg(func, arg) {
  return (...args) => {
    return func(arg, ...args);
  };
}
const multiply = (num1, num2) => num1 * num2;
const multiplyBy10 = defineFirstArg(multiply, 10);
// console.log(multiplyBy10(10));

// CHALLENGE 11
function dateStamp(func) {
  return (...args) => {
    return {date: new Date().getTime(), output: func(...args)};
  };
}

const fn11 = dateStamp(multiply);
// console.log(fn11(2, 7));

// CHALLENGE 12
function censor() {
  const map = {};
  return (...args) => {
    if (args.length > 2) return;
    if (args.length === 2) {
      map[args[0]] = args[1];
      return;
    }
    let copy = args[0];
    Object.entries(map).forEach(([key, value]) => {
      const regex = new RegExp(key, 'g');
      copy = copy.replace(regex, value);
    });
    return copy;
  };
}
const switchWords = censor();
switchWords('warm', 'hot');
switchWords('storm', 'plot');
// console.log(
//   switchWords(
//     "Baklava so sweet and tea so warm, together they make the perfect storm! With flaky layers and honeyed bliss, sip your tea and take a bite—oh, what a treat you wouldn't want to miss!"
//   )
// );

// CHALLENGE 13
function createSecretHolder(secret) {
  let v = secret;
  function getSecret() {
    return v;
  }
  function setSecret(secret) {
    v = secret;
  }
  return {getSecret, setSecret};
}
const {getSecret, setSecret} = createSecretHolder('secret');
// console.log(getSecret());
// setSecret('new secret');
// console.log(getSecret());

// CHALLENGE 14
function callTimes() {
  let counter = 1;
  return () => counter++;
}

const counterFunc = callTimes();
// console.log(counterFunc());
// console.log(counterFunc());

// CHALLENGE 15
function roulette(num) {
  let counter = 0;
  return () => {
    counter++;
    if (counter < num) return 'spin';
    if (counter === num) return 'win';
    if (counter > num) return 'pick a number to play again';
  };
}

const newRoulette = roulette(3);
// console.log(newRoulette());
// console.log(newRoulette());
// console.log(newRoulette());
// console.log(newRoulette());

// CHALLENGE 16
function average() {
  const nums = [];
  let average = 0;

  return (num) => {
    if (num === undefined) return average;
    nums.push(num);
    return calcAverage();
  };

  function calcAverage() {
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
      sum += nums[i];
    }
    average = sum / nums.length;
    return average;
  }
}
const averageCalculator = average();
// console.log(averageCalculator());
// console.log(averageCalculator(2));
// console.log(averageCalculator());
// console.log(averageCalculator(8));

// CHALLENGE 17
function makeFuncTester(arrOfTests) {
  return (callback) => {
    return arrOfTests.every(
      (subArray) => callback(subArray[0]) === subArray[1]
    );
  };
}
const testArr1 = [1, 2];
const testArr2 = [3, 6];
const testArr3 = [2, 3];
const checkIfFirstIsHalfOfSecond = makeFuncTester([
  testArr1,
  testArr2,
  testArr3,
]);
// console.log(checkIfFirstIsHalfOfSecond((input) => input * 2));

// CHALLENGE 18
function makeHistory(limit) {
  const history = [];
  function addToHistory(str) {
    if (history.length === limit) {
      history.shift();
    }
    history.push(str);
  }
  function removeLastItemFromHistory() {
    return history.splice(-1);
  }
  function handleUndo() {
    if (history.length === 0) return `nothing to undo`;
    const removedLastItem = removeLastItemFromHistory();
    return `${removedLastItem} undone`;
  }
  return {
    handleHistory: (input) => {
      if (input === 'undo') {
        handleUndo();
      }
      addToHistory(input);
      return `${input} done`;
    },
    getHistory: () => history,
  };
}

const {handleHistory, getHistory} = makeHistory(3);
// console.log(handleHistory('undo'));
// console.log(handleHistory('first'));
// console.log(handleHistory('undo'));
// console.log(handleHistory('first'));
// console.log(handleHistory('second'));
// console.log(handleHistory('third'));
// console.log(getHistory());

// CHALLENGE 19
function blackjack(array) {
  let counter = 0;
  const players = {};
  return (num1, num2) => {
    const key = `${num1}-${num2}`;
    players[key] = {lastSum: 0, isBust: false, isFirstTurn: true};
    return () => {
      const player = players[key];
      if (player.isFirstTurn) {
        player.lastSum = num1 + num2;
        player.isFirstTurn = false;
        return player.lastSum;
      }
      if (!player.isFirstTurn) {
        if (player.isBust) return 'you are done!';
        player.lastSum += array[counter];
        counter++;
        const is21OrUnder = player.lastSum <= 21;
        if (is21OrUnder) {
          return player.lastSum;
        }
        player.isBust = true;
        return 'bust';
      }
    };
  };
}

const deck = [
  2, 6, 1, 7, 11, 4, 6, 3, 9, 8, 9, 3, 10, 4, 5, 3, 7, 4, 9, 6, 10, 11,
];
const deal = blackjack(deck);
const player1 = deal(4, 5);
const player2 = deal(2, 2);
console.log(player1()); // should log 9
console.log(player2()); // should log 4
console.log(player1()); // should log 11
console.log(player2()); // should log 10
console.log(player1()); // should log 12
console.log(player2()); // should log 17
console.log(player1()); // should log bust
console.log(player2()); // should log 21
console.log(player1()); // should log you are done!
