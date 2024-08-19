function createArray(array) {
  const original = [...array];

  function map(handler) {
    const copy = [];
    for (let i = 0; i < original.length; i++) {
      copy.push(handler(original[i], i, original));
    }
    return copy;
  }

  function filter(handler) {
    const copy = [];
    for (let i = 0; i < original.length; i++) {
      isTrue = !!handler(original[i], i, original);
      if (isTrue) copy.push(original[i]);
    }
    return copy;
  }

  function find(handler) {
    for (let i = 0; i < original.length; i++) {
      if (handler(original[i], i, original)) return original[i];
    }
  }

  function forEach(handler) {
    for (let i = 0; i < original.length; i++) {
      handler(original[i], i, original);
    }
  }

  return {map, filter, find, forEach};
}

// init arrays
const array = [1, 2, 3];
const objectsArray = [
  {name: 'nahar', age: 28},
  {name: 'ayala', age: 29},
  {name: 'dvir', age: 5},
  {name: 'maya', age: 2},
];

// create custom arrays from the function
const customArray = createArray(array);
const customObjectsArray = createArray(objectsArray);

// use all custom array functions

customArray.forEach((item, index, arr) => {
  // demonstrating the danger of mutating original array in forEach
  // this change will persist to next calls on customArray
  arr[index] = item * 2;
});
const mapped = customArray.map((item) => item ** 2);
const filtered = customObjectsArray.filter((item) => item.name.startsWith('a'));
const found = customArray.find((item) => item - 1 !== 0);

// log all values
console.table({mapped, filtered, found});
