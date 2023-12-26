/**
 * @author wou
 */
// Functions to format date from sql timestamps
const parseAndFormatDate = (dateString) => {
  const parsedDate = new Date(dateString);

  // Get the month, day, year, hours, and minutes
  const month = parsedDate.toLocaleString('default', { month: 'short' });
  const day = parsedDate.getDate();
  const year = parsedDate.getFullYear();
  const hours = parsedDate.getHours();
  const minutes = parsedDate.getMinutes();

  // Format the date and time
  const formattedDate = `${month}. ${day}, ${year} | ${formatTime(hours, minutes)}`;

  return formattedDate;
}

const formatTime = (hours, minutes) => {
     // Format the time in 12-hour clock with AM/PM
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

export default parseAndFormatDate;