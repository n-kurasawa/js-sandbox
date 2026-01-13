export function main() {
  const p1 = new Promise<number>((resolve) => {
    setTimeout(() => resolve(42), 100);
  })
    .then(
      (x) =>
        new Promise<number>((resolve) => {
          setTimeout(() => resolve(x * 2), 100);
        })
    )
    .then(
      (x) =>
        new Promise<number>((resolve) => {
          setTimeout(() => resolve(x * 2), 100);
        })
    )
    .then((x) => console.log(x));

  // エラーパターン
  // const p2 = new Promise<number>((_, reject) => {
  //   reject(new Error("failed"));
  // });
  // p2.catch((e) => console.log("caught:", e));
}
