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
// 首字母大小
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase());
}

// 下划转驼峰
export function camelCase(str) {
  return str.replace(/-[a-z]/g, str1 => str1.substr(-1).toUpperCase());
}

