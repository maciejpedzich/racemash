// Why not a standalone randomNumber function?
// I just couldn't be bothered creating a separate utils folder or installing a new package.

export function useRandomNumber() {
  // Shamelessly stolen from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
  return (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
}
