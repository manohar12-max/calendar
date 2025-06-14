export function useGetArrayOfDays(year, month) {
  
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const today = new Date();

  const daysArray = [];

  // Add null placeholders before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }

  // Add actual days
  for (let day = 1; day <= daysInMonth; day++) {
    
    const fullDate = new Date(year, month, day);

    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    daysArray.push({ date: day, isToday, fullDate });
  }

  return { daysArray, today };
}
