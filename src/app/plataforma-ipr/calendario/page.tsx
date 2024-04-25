import type { Metadata } from 'next';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Calendar from '@/components/Calender';

export const metadata: Metadata = {
  title: 'Calendário',
  description: 'Calendário com programação IPR',
  // other metadata
};

const CalendarPage = () => {
  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="Calendário" />

      <Calendar />
    </div>
  );
};

export default CalendarPage;
