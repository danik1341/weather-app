export function dateAndTimeConvert(dateTime: string) {
  const dateRegex = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})([+-]\d{2}:\d{2})$/;
  const match = dateTime.match(dateRegex);

  if (match) {
    const [, dateString] = match;
    const date = new Date(dateString);

    const formattedDate = `${date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })} ${date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

    return formattedDate;
  }

  console.error("Invalid date string format");
  return "";
}

export function extractDayMonth(dateTime: string) {
  const dateRegex = /^(\d{4}-\d{2}-\d{2})T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/;
  const match = dateTime.match(dateRegex);

  if (match) {
    const [, dateString] = match;
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
    });

    return formattedDate;
  }

  console.error("Invalid date string format");
  return "";
}
