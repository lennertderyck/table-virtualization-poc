import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/nl-be';

dayjs.locale('nl-be');

interface ReferenceRelation {
  straggler: boolean;
  rowIndex: number;
  itemIndex: number;
}

export interface Item extends ReferenceRelation {
  /** Don't use this to get the date from a calendar */
  id: string;
  // reference: string;
  // format: string;
  date: string;
  navigate: null | 'forward' | 'backward';
};

const AMOUNT_ITEMS = 7;

type Row = Item[];
type CalendarView = Row[];

const generateCalendarView = (VIEW_REF: Dayjs, AMOUNT_ROWS: number, MONTH_REF: Dayjs): CalendarView => {
  return Array.from({ length: AMOUNT_ROWS }, (_, rowIndex) => {
    const row = VIEW_REF.add(rowIndex, 'week');
    
    return Array.from({ length: AMOUNT_ITEMS }, (_, itemIndex) => {
      const item = row.add(itemIndex, 'day');
      const straggler = !MONTH_REF.isSame(item, 'month');
      const navigateDirection = MONTH_REF.isBefore(item, 'day') ? 'forward' : 'backward';
      
      return {
        id: item.toISOString(),
        date: item.toISOString(),
        straggler: !MONTH_REF.isSame(item, 'month'),
        navigate: !straggler ? null : navigateDirection,
        rowIndex,
        itemIndex,
      }
    });
  });
}

export default generateCalendarView;