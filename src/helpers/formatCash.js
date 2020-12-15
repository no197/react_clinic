const formatCash = (price) => {
  const str = price + '';
  return str
    .split('')
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ',') + prev;
    });
};

export default formatCash;
