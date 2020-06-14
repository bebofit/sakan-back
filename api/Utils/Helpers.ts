import crypto from "crypto";
import config from "../../config";
import cryptojs from "crypto-js";
const { CRYPTO_SECRET } = config;

class Helpers {
  async generateToken(length = 64) {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString("hex") // convert to hexadecimal format
      .slice(0, length); // return required number of characters
  }

  hashPassword = (password: string): string =>
    cryptojs.AES.encrypt(password, CRYPTO_SECRET).toString();

  comparePasswordToHash = (
    candidatePassword: string,
    hash: string
  ): boolean => {
    const bytes = cryptojs.AES.decrypt(hash, CRYPTO_SECRET);
    const exisitngPassword = bytes.toString(cryptojs.enc.Utf8);
    return candidatePassword === exisitngPassword;
  };
}

export default new Helpers();
