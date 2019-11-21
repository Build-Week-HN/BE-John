function toDateTime(secs) {
  const time = new Date(1970, 0, 1); // Epoch
  time.setSeconds(secs);
  return time;
}

module.exports = toDateTime;
