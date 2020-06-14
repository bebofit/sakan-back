import crypto from 'crypto';
import config from '../../config';
import cryptojs from 'crypto-js';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { isString } from 'util';
const { CRYPTO_SECRET, JWT_SECRET } = config;

class Helpers {
  async generateToken(length = 64) {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex') // convert to hexadecimal format
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

  extractToken(authHeader: string): string {
    if (!isString(authHeader)) {
      return null;
    }
    const headerParts = authHeader.trim().split(' ');
    if (!(headerParts.length === 2 && headerParts[0] === 'Bearer')) {
      return null;
    }
    return headerParts[1];
  }

  verifyToken = (token: string): Promise<any> =>
    new Promise((resolve, reject) => {
      jwt.verify(
        token,
        JWT_SECRET,
        (err: VerifyErrors, authInfo: string | object) => {
          if (err) {
            return reject(err);
          }
          resolve(authInfo);
        }
      );
    });

  decodeToken = (token: string): any => jwt.decode(token);

  signJWT(data?: any, expiresIn: string | number = '24h'): Promise<string> {
    const options = data.exp ? {} : { expiresIn };
    return new Promise((resolve, reject) => {
      jwt.sign(data, JWT_SECRET, options, (err, token) => {
        if (err) {
          return reject(err);
        }
        resolve(token);
      });
    });
  }
}

export default new Helpers();
