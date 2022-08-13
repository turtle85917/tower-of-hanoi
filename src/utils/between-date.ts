/**
 * 두 시간의 차이를 구함.
 * @param startedAt 시작 시간
 */
export default (startedAt: number): string => {
  const nowAt = Math.floor(Date.now() / 1000);
  const startAt = Math.floor(startedAt / 1000);

  const between = nowAt - startAt;
  if (between < 60) return `${between}초`;

  let second = between % 60;
  let minute = Math.floor(between / 60);

  if (minute < 60) return `${minute}분 ${second}초`;

  let hour = Math.floor(minute / 60);
  minute = Math.floor(between / 60 % 60);

  return `${hour}시간 ${minute}분 ${second}초`;
}