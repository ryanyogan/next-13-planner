export function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(1), time);
  });
}
