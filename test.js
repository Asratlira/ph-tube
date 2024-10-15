function getTimeString(time) {
  const hour = parseInt(time / 3600);
  let remaingsecond = time % 3600;
  const minitue = parseInt(remaingsecond / 60);
  remaingsecond = remaingsecond % 60;

  return `${hour} hour  ${minitue} minitue  ${remaingsecond}  second ago`;
}
console.log(getTimeString(6700));
