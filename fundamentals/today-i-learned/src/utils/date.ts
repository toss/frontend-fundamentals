/**
 * 이번주 시작일(월요일)과 끝일(일요일) 계산
 */
export const getThisWeekRange = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 월요일로 조정

  const monday = new Date(today);
  monday.setDate(today.getDate() + diff);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { monday, sunday };
};
