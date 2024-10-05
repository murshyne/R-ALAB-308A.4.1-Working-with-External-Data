// Create a Promise that resolves after one second.
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Guess this worked!");
  }, 1000);
});

// Add some then() methods to handle additional tasks.
myPromise
  .then((x) => x + " Again?")
  .then((x) => x + " Third time!")
  .then((x) => x + " Promises are cool.")
  .catch((err) => {
    console.error(err);
  });
