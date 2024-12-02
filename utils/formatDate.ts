function formatDate(dateString: string | Date) {
  const date = new Date(dateString);
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.getTime() + userTimezoneOffset);

  const day = String(adjustedDate.getUTCDate()).padStart(2, '0');
  const month = String(adjustedDate.getUTCMonth() + 1).padStart(2, '0'); // UTCMonth é zero-indexado
  const year = adjustedDate.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export default formatDate;
