export function main() {
  const p1 = new Promise<number>((resolve) => {
    setTimeout(() => resolve(42), 100);
  });
  p1.then((x) => x * 2).then((x) => console.log(x)); // 84

  // エラーパターン
  const p2 = new Promise<number>((_, reject) => {
    reject(new Error("failed"));
  });
  p2.catch((e) => console.log("caught:", e));
}
