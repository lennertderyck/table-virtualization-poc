import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/nl-be';

dayjs.locale('nl-be');

const generateCalendarDayData = (referenceMonth: Dayjs, referenceWeek: Dayjs, dayIndex: number) => {
  const day = referenceWeek.add(dayIndex, 'day');
  const inWeek = referenceMonth.month() === day.month();
    
  return ({
    ref: referenceMonth.format('MMMM'),
    straggler: !inWeek,
    date: day.toISOString(),
    format: day.format('dddd DD')
  })
}

interface GeneratorOptions {
  debug: boolean;
  maximumWeeks: number;
  maximumDays: number;
}


export const generateCalendarData = (input: Dayjs | string | Date | number | undefined = new Date(), options?: Partial<GeneratorOptions>) => {
  const 
    REFERENCE_DATE = dayjs(input),
    DAYS = options?.maximumDays || 7,
    WEEKS = options?.maximumWeeks || 6
  ;
    
  const 
    referenceMonth = REFERENCE_DATE.startOf('month'),
    firstMonth = referenceMonth.startOf('week'),
    firstWeek = firstMonth.startOf('week')
  ;
      
  return Array.from({ length: WEEKS }, (_, weekInMonthIndex) => {
    const thisWeek = firstWeek.add(weekInMonthIndex, 'week');
    return Array.from(
      { length: DAYS }, 
      (_, dayInWeekIndex) => generateCalendarDayData(
        referenceMonth, 
        thisWeek, 
        dayInWeekIndex
      )
    );
  });
}