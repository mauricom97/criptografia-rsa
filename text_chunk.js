module.exports = class TextChunk {
  constructor(n) {
    if (typeof n === "bigint") {
      this.stringVal = this.bigIntToText(n);
    } else {
      this.stringVal = n;
    }
  }

  bigIntToText(n) {
    let big256 = BigInt("256");
    let big0 = BigInt("0");
    let strVal = "";
    if (n === big0) {
      strVal = "0";
    } else {
      while (n > big0) {
        let quot = n / big256;
        let rem = n % big256;

        let charNum = Number(rem);
        strVal += String.fromCharCode(charNum);

        n = quot;
      }
    }
    return strVal;
  }

  get bigIntValue() {
    let big256 = BigInt("256");
    let result = BigInt("0");

    for (let i = this.stringVal.length - 1; i >=0; i--) {
      result = result * big256;
      result = result + BigInt(this.stringVal.charCodeAt(i));
    }
    return result;
  }

  toString() {
    return this.stringVal;
  }

  static blockSize(n) {
    const big1 = BigInt("1");
    const big2 = BigInt("2");
    let bSize = 0;
    let temp = n - big1;

    while (temp > big1) {
      temp = (temp / big2);
      bSize++;
    }

    return Math.floor(bSize / 8);
  }
}