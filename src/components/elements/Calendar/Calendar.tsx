import classNames from 'classnames';
import dayjs from 'dayjs';
import 'dayjs/locale/nl-be';
import { FC, useMemo, useState } from 'react';
import styles from './Calendar.module.scss';
import generateCalendarView, { Item } from './utils/generator.beta';

dayjs.locale('nl-be');

interface Props {};

const Calendar: FC<Props> = () => {
  const [selected, setSelected] = useState<string | null>(null);
  
  const [view, setView] = useState<'week' | 'month'>('month');
  const [instance, setInstance] = useState(dayjs());
  
  const today = () => setInstance(dayjs().add(1, 'day'));
  const nextInstance = () => setInstance(dayjs(instance).add(1, view));
  const previousInstance = () => setInstance(dayjs(instance).subtract(1, view));
  
  const rows = view === 'week' ? 1 : 6;
  const data = useMemo(() => (
    generateCalendarView(
      instance.startOf(view).startOf('week'), 
      rows,
      instance,
    )
  ), [instance, rows, view]);
  
  const handleDayClick = (day: Item) => {
    setSelected(day.date);
    if (day.navigate === 'forward') nextInstance();
    if (day.navigate === 'backward') previousInstance(); 
  }
  
  return (
    <>
      <div className="flex justify-between">
        <button onClick={previousInstance}>Previous</button>
        <button onClick={today}><h1>{instance.format('MMMM YYYY')}</h1></button>
        <button onClick={nextInstance}>Next</button>
      </div>
      <div className="rounded-lg border border-stone-800 overflow-hidden">
        <div className={styles.month}>
          { data.map((week, weekIndex) => (
            <div key={weekIndex} className={styles.week}>
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  onClick={() => handleDayClick(day)} 
                  className={classNames(
                    styles.day, 
                    day.straggler && styles.straggler,
                    dayjs(day.date).isSame(dayjs(), 'day') && styles.today,
                  )}
                >
                  <div className={styles.content}>
                    <div className={styles.dayIndicator}>
                      {dayjs(day.date).format('D')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-center text-sm gap-2 mt-2">
        <button className={classNames(view === 'week' && 'underline underline-offset-2')} onClick={() => setView('week')}>week</button>
        <span>-</span>
        <button className={classNames(view === 'month' && 'underline underline-offset-2')} onClick={() => setView('month')}>month</button>
      </div>
    </>
  )
}

export default Calendar;