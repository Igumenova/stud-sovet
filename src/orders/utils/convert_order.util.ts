import moment = require('moment');

export const convertDate: (date: Date) => string = (date: Date) =>
  moment(date).locale('ru').format('LL');
