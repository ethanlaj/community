import { format, parseISO } from 'date-fns';

const formatDate = (inputDate?: string | Date, inputFormat: string = 'yyyy-MM-dd') => {
  if (!inputDate) { return ''; }
  const date = typeof inputDate === 'string' ? parseISO(inputDate) : inputDate;

  const dateOnly = new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000);

  const formattedDate = format(dateOnly, inputFormat);
  return formattedDate;
};

export default formatDate;
