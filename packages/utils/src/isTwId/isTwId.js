const isString = id => typeof id === 'string';

const isLengthValid = id => id.length === 10;

const isFormatValid = id => /^[A-Z][12][0-9]{8}$/.test(id);

/**
 * 身分證字號規則 http://web.fg.tp.edu.tw/~anny/idtest.htm
 * @param {String} id
 */
const isTwIdValid = id => {
  // 第一碼英文字母轉換為二位數字碼
  const letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
  const firstLetterNumber = letters.indexOf(id[0]) + 10;
  // 轉換型態方便待會拆數字
  const firstLetterNumberString = String(firstLetterNumber);
  // 第一個字母的加權值
  const firstLetterValue =
    Number(firstLetterNumberString.charAt(0)) * 1 +
    Number(firstLetterNumberString.charAt(1)) * 9;
  // 準備計算後面 8 碼(扣除驗證碼)的加權值
  let idTailSum = 0;
  const idTail = id.slice(1, 9);
  // 權重由 8 開始遞減至 1
  let weight = 8;
  for (let i = 0; i < idTail.length; i++) {
    const number = Number(idTail[i]);
    idTailSum += number * weight;
    weight--;
  }
  // 驗證檢查碼是否正確
  const checkNumber = Number(id.slice(-1));
  const remainder = (firstLetterValue + idTailSum) % 10;
  // 由模數減去餘數得檢查號碼，若餘數為 0 時，則設定其檢查碼為 0
  if (remainder === 0) {
    return checkNumber === 0;
  }
  return checkNumber === 10 - remainder;
};

export default function isTwId(id) {
  return (
    isString(id) && isLengthValid(id) && isFormatValid(id) && isTwIdValid(id)
  );
}
