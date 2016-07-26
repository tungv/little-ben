const hashCode = str =>
  str.split('').reduce((hash, char) => char.charCodeAt(0) + ((hash << 5) - hash), 0);

function intToRGB(i) {
  const c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

  return '#00000'.substring(0, 7 - c.length) + c;
}

export default (str = '') => intToRGB(hashCode(str));
