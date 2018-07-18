declare class Log {
    private static production;
    private static appId;
    private static key;
    private static host;
    /**
     * @param host 服务地址
     * @param {string} appId 应用Id
     * @param {string} key 加解密秘钥
     */
    static init(host: string, appId: string, key: string): void;
    private static sendToServer;
    private static toString;
    static trace(...content: string[]): void;
    static debug(...content: string[]): void;
    static info(...content: string[]): void;
    static warn(...content: string[]): void;
    static error(...content: string[]): void;
    static fatal(...content: string[]): void;
}
export { Log };
