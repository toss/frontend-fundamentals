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

export const getWeekOfMonth = (date = new Date()) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysBeforeFirstMonday = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  return Math.ceil((date.getDate() + daysBeforeFirstMonday) / 7);
};

export const getWeeklyTopLabel = (date = new Date()) => {
  const month = date.getMonth() + 1;
  const weekOfMonth = getWeekOfMonth(date);

  return `${month}월 ${weekOfMonth}째주 인기글`;
};

export const formatDateForSearchQuery = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getThisWeekSearchRange = () => {
  const { monday, sunday } = getThisWeekRange();

  return {
    startDate: formatDateForSearchQuery(monday),
    endDate: formatDateForSearchQuery(sunday)
  };
};
