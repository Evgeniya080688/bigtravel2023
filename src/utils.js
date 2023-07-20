import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeTaskDueDate = (dueDate) => dayjs(dueDate).format('D MMMM');
const getHour = (dueDate) => dayjs(dueDate).format('HH');
const getMinutes = (dueDate) => dayjs(dueDate).format('mm');
const duration = (dateFrom, dateTo) => {
  let due = dayjs(dateTo).diff(dayjs(dateFrom), 'm');
  let hours = '';
  let minutes = '';
  let days = '';
  let years = '';
  if (due < 60) {
    (due < 10) ? `0${due}`: due;
    return (due + 'M');}
  else if (due>= 60 && due < 1440) {
    hours = dayjs(dateTo).diff(dayjs(dateFrom), 'hour');
    minutes = due - hours * 60;
    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    return (hours + 'H ' + minutes + 'M');
  } else if (due >=1440 && due < 525600){
    days = dayjs(dateTo).diff(dayjs(dateFrom), 'day');
    hours = dayjs(dateTo).diff(dayjs(dateFrom), 'hour') - days*24;
    minutes = due - days*1440 - hours * 60;
    days = (days < 10) ? `0${days}` : days;
    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    return (days+'D ' + hours + 'H ' + minutes + 'M');
  } else {
    years = dayjs(dateTo).diff(dayjs(dateFrom), 'year');
    days = dayjs(dateTo).diff(dayjs(dateFrom), 'days') - years*365;
    hours = dayjs(dateTo).diff(dayjs(dateFrom), 'hours') - years*8760 - days*24;
    minutes = due - years*525600 - days*1440 - hours * 60;
    years = (years < 10) ? `0${years}` : years;
    days = (days < 10) ? `0${days}` : days;
    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    return (years+'Y '+ days+'D ' + hours + 'H ' + minutes + 'M');
  }
};

export {getRandomInteger, humanizeTaskDueDate, getHour, getMinutes, duration};


