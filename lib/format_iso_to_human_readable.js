const format_iso_to_human_readable = (iso_string) => {
  const date = new Date(iso_string);

  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();

  const day_suffix = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const time = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return `${month} ${day}${day_suffix(day)}, ${year} at ${time}`;
};

export default format_iso_to_human_readable;
