export function aggregateValues(arrays: number[][]): number[] {
  if (arrays.length === 0) {
    return [];
  }

  const maxLength = Math.max(...arrays.map((arr) => arr?.length || 0));
  const result = Array(maxLength).fill(0);

  arrays?.forEach((array) => {
    array?.forEach((value, index) => {
      result[index] += value;
    });
  });

  return result;
}
