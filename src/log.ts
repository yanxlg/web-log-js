/**
 * @disc:前端日志
 * 重定义console对象
 * @author:yanxinaliang
 * @time：2018/6/29 11:23
 */
import {Crypto} from "./crypto";

const logger=window["console"];

class Log{
    private static production:boolean=process.env.NODE_ENV === 'production'||process.env.NODE_ENV === 'prod';//生产环境
    private static appId:string;
    private static key:string;
    private static host:string;
    /**
     * @param host 服务地址
     * @param {string} appId 应用Id
     * @param {string} key 加解密秘钥
     */
    public static init(host:string,appId:string,key:string){
        this.host=host;
        this.appId=appId;
        this.key=key;
    }
    private static sendToServer(level:string,content:string,){
        if(!this.appId||!this.key){
            alert("请配置appId及appKey");
            return;
        }
        const image = new Image();
        image.src=`${this.host}/favicon.png?k=${this.appId}&d=${Crypto.encrypt(JSON.stringify({
            level:level,
            content:content
        }),this.key)}`;
    }
    static trace(...content:string[]){
        if(this.production){
            this.sendToServer("trace",content.join(" "));
        }else{
            logger.log(`%c${content.join(" ")}%c`,'color:blue');
        }
    }
    static debug(...content:string[]){
        if(this.production){
            this.sendToServer("debug",content.join(" "));
        }else{
            logger.log(`%c${content.join(" ")}%c`,'color:cyan');
        }
    }
    static info(...content:string[]){
        if(this.production){
            this.sendToServer("info",content.join(" "));
        }else{
            logger.log(`%c${content.join(" ")}%c`,'color:green');
        }
    }
    static warn(...content:string[]){
        if(this.production){
            this.sendToServer("warn",content.join(" "));
        }else{
            logger.log(`%c${content.join(" ")}%c`,'color:yellow');
        }
    }
    static error(...content:string[]){
        if(this.production){
            this.sendToServer("error",content.join(" "));
        }else{
            logger.log(`%c${content.join(" ")}%c`,'color:red');
        }
    }
    static fatal(...content:string[]){
        if(this.production){
            this.sendToServer("fatal",content.join(" "));
        }else{
            logger.log(`%c${content.join(" ")}%c`,'color:magenta');
        }
    }
}

window.onerror=function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
    const {message="",name="",stack=""}=errorObj||{};
    Log.error(message,name,stack);
};
// window.console=Log;

export {Log};