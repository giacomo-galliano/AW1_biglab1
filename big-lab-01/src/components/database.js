import dayjs from 'dayjs';

const database = [
  // id, description, important, private, deadline
  {id:1, description:"Complete lab 3", important:false, private:true, date:dayjs('2021-04-18').format('YYYY-MM-DD')},
  {id:2, description:"Buy some groceries", important:false, private:false, date:dayjs('2021-02-21').format('YYYY-MM-DD')},
  {id:3, description:"Read a good book", important:true, private:true},
  {id:4, description:"Watch Mr. Robot", important:false, private:true, date:dayjs('2021-04-29').format('YYYY-MM-DD')},
];

export {database};