const sliceDescription = (description) => {
  const max = 210;
  if (description.length <= max) return description;
  let trimmed = description.substr(0, max);
  if (description[max] !== ' ') {
    trimmed = trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(' ')));
  }
  return trimmed + '...';
};

export default sliceDescription;
