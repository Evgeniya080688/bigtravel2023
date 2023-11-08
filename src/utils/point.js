import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

const humanizeDueDate = (dueDate) => dayjs(dueDate).format('D MMMM');
const humanizeDueDateShort = (dueDate) => dayjs(dueDate).format('D MMM');
const beautyDate = (dueDate) => dayjs(dueDate).format('DD/MM/YY HH:mm');
const getHour = (dueDate) => {
  dueDate = dayjs(dueDate);
  return dayjs(dueDate).format('HH');
};
const getMinutes = (dueDate) => dayjs(dueDate).format('mm');

const duration = (dateFrom, dateTo) => {
  const due = dayjs(dateTo).diff(dayjs(dateFrom), 'm');
  let hours = '';
  let minutes = '';
  let days = '';
  let years = '';
  if (due < 60) {
    (due < 10) ? `0${due}M`: `${due}'M`;
  } else if (due>= 60 && due < 1440) {
    hours = dayjs(dateTo).diff(dayjs(dateFrom), 'hour');
    minutes = due - hours * 60;
    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    return (`${hours  }H ${  minutes  }M`);
  } else if (due >=1440 && due < 525600){
    days = dayjs(dateTo).diff(dayjs(dateFrom), 'day');
    hours = dayjs(dateTo).diff(dayjs(dateFrom), 'hour') - days*24;
    minutes = due - days*1440 - hours * 60;
    days = (days < 10) ? `0${days}` : days;
    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    return (`${days}D ${  hours  }H ${  minutes  }M`);
  } else {
    years = dayjs(dateTo).diff(dayjs(dateFrom), 'year');
    days = dayjs(dateTo).diff(dayjs(dateFrom), 'days') - years*365;
    hours = dayjs(dateTo).diff(dayjs(dateFrom), 'hours') - years*8760 - days*24;
    minutes = due - years*525600 - days*1440 - hours * 60;
    years = (years < 10) ? `0${years}` : years;
    days = (days < 10) ? `0${days}` : days;
    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    return (`${years }Y ${ days}D ${  hours  }H ${  minutes  }M`);
  }
};

const isPointFuture = (dateTo) => (dayjs(dateTo).diff(dayjs(new Date()), 'm') > 0) ;
const compareDates = (dateFrom, dateTo) => {
  if (dateFrom && dateTo ) {
    return (dayjs(dateTo).diff(dayjs(dateFrom), 'm') < 0);
  } else {
    return true;
  }
};

const sortPointsByTime = (pointA, pointB) => {
  const dueA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom), 'm');
  const dueB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom), 'm');
  return dueB - dueA;
};

const sortPointsByPrice = (pointA, pointB) => parseFloat(pointB.basePrice) - parseFloat(pointA.basePrice);

const sortPointsByDay = (pointA, pointB) => dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom), 'm');

export {humanizeDueDateShort, humanizeDueDate, getHour, getMinutes, duration, beautyDate, compareDates, isPointFuture, sortPointsByPrice, sortPointsByTime, sortPointsByDay};


