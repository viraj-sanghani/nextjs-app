import CryptoJs from "crypto-js";

export const encryption = (val) => {
  try {
    return CryptoJs.AES.encrypt(
      JSON.stringify(val),
      process.env.NEXT_PUBLIC_CRYPTO_KEY
    ).toString();
  } catch (err) {
    return null;
  }
};

export const decryption = (val) => {
  try {
    const decStr = CryptoJs.AES.decrypt(
      val,
      process.env.NEXT_PUBLIC_CRYPTO_KEY
    ).toString(CryptoJs.enc.Utf8);
    return JSON.parse(decStr);
  } catch (err) {
    return null;
  }
};
