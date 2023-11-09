interface Array<T> {
  toWindows(windowSize: number, onWindowAdded?: (window: any[]) => void): T[];
}
Array.prototype.toWindows = (size, onWindowAdded?: (window: any[]) => void) => {
  return this.reduce((acc, _, index, arr) => {
    if (index + size > arr.length) {
      //we've reached the maximum number of windows, so don't add any more
      return acc;
    }
    //add a new window of [currentItem, maxWindowSizeItem)
    if (onWindowAdded) {
      onWindowAdded([arr.slice(index, index + size)]);
    }
    return acc.concat(
      //wrap in extra array, otherwise .concat flattens it
      [arr.slice(index, index + size)]
    );
  }, []);
};

/**
 * Usage example
let test = [1, 2, 3, 4];
let windows = test.toWindows(1, (window) => {
  console.log(window);
});
*/
