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

// 判断数字 正则 含正负
export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str);
}

/**
   * @description 将图片转为base4
   */
export function toBase64() {
  const self = this;
  const reader = new FileReader();
  reader.onload = e => {
    // 返回base64
    self.imgURL = e.target.result;
    self.insertImg();
  };
  reader.readAsDataURL(self.file);
}
