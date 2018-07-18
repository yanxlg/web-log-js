/**
 * @disc:AES 加密
 * @author:yanxinaliang
 * @time：2018/6/29 13:47
 */
declare class Crypto {
    static encrypt(data: string, key: string): any;
    static decrypt(cipherText: string, key: string): any;
}
declare class Base64Util {
    static stringify(word: string): string;
    static parse(base64: string): any;
}
export { Crypto, Base64Util };
