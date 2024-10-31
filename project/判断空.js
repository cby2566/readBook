// 判空
export function isEmpty(val) {
  // "",null,undefined,NaN
  if (val === undefined || val === null || val === "" || Number.isNaN(val)) {
    return true;
  }
  // Array "",[]
  if (Array.isArray(val) && val.length === 0) {
    return true;
  }
  // Object {}
  if (
    Object.prototype.toString.call(val) === "[object Object]" &&
    Object.keys(val).length === 0
  ) {
    return true;
  }

  return false;
}
