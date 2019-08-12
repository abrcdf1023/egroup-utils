const isString = id => typeof id === 'string';

const isLengthValid = id => id.length === 10;

const isFormatValid = id => /^[A-Z][12][0-9]{8}$/.test(id);

const isChecksumValid = id => {
  const IDLEN = 10;
  // each letter represents value from [10..35]
  const letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
  const letterIndex = letters.indexOf(id[0]) + 10;
  const letterValue =
    Math.floor(letterIndex / 10) + (letterIndex % 10) * (IDLEN - 1);
  const idTail = id.slice(1); // drop the letter
  let weight = IDLEN - 2; // minus letter digit and check digit
  let weightedSum = 0;
  for (let i = 0; i < idTail.length; i++) {
    const char = idTail[i];
    weightedSum += +char * weight;
    weight--;
  }
  // note: the check digit of 'id' is weighted 0
  const remainder = (letterValue + weightedSum + +id.slice(-1)) % 10;
  return remainder === 0;
};

export default function isTwId(id) {
  return (
    isString(id) &&
    isLengthValid(id) &&
    isFormatValid(id) &&
    isChecksumValid(id)
  );
}
