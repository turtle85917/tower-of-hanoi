import { stack } from "../components/Game"

/**
 * 원반을 불러옵니다.
 */
export default (quantity: number) => {
  const result: stack[] = [];

  for (let idx = 0; idx < quantity; idx++) {
    const humanNumber = idx + 1
    result.push({ level: humanNumber, position: humanNumber, status: "stack" });
  }

  return result;
}