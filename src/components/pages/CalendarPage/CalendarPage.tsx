import { FC } from 'react';
import Calendar from '../../elements/Calendar/Calendar';

interface Props {};

const CalendarPage: FC<Props> = () => {
  
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="w-[700px] ">
          <Calendar />
      </div>
    </div>
  )
}

export default CalendarPage;