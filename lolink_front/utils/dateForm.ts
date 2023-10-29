import dayjs from 'dayjs';

export const getFormatDate = (at: Date) => {
  const date = new Date(at);
  const year = date.getFullYear();
  const month = (1 + date.getMonth());
  const mm = month >= 10 ? month : `0${month}`;
  const day = date.getDate();
  const dd =  day >= 10 ? day : `0${day}`

  const hour = date.getHours();
  const h = hour >= 10 ? hour : `0${hour}`;
  const min = date.getMinutes();
  const m = min >= 10 ? min : `0${min}`;

  return [`${year}/${mm}/${dd}`, `${h}:${m}`]; 
}

export const displayCreatedAt = (updatedAt: Date) => {
  const today = dayjs();
  const updated = dayjs(updatedAt);

  const time =
  ['y:년', 'M:달', 'd:일', 'h:시간', 'm:분', 's:초'].reduce((a, b) => {
    const [key, value] = b.split(':');
    const diff = today.diff(updated, key as "y" | "M" | "d" | "h" | "m" | "s");
    return !a && diff > 0 ? `${diff}${value} 전` : a;
  }, '') || '방금';
  return time;
}

// export const displayCreatedAt = (at: Date) => {
//   const startTime = new Date(at);
//   const nowTime = Date.now();
//   if (parseInt(startTime - nowTime) > -60000) {
//     return <Moment format="방금 전">{startTime}</Moment>;
//   }
//   if (parseInt(startTime - nowTime) < -86400000) {
//     return <Moment format="MMM D일">{startTime}</Moment>;
//   }
//   if (parseInt(startTime - nowTime) > -86400000) {
//     return <Moment fromNow>{startTime}</Moment>;
//   }
// }