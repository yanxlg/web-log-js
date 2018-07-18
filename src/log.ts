/**
 * @disc:前端日志
 * 重定义console对象
 * @author:yanxinaliang
 * @time：2018/6/29 11:23
 */
import {Crypto,Base64Util} from "./crypto";

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
    private static sendToServer(level:string,content:string){
        if(!this.appId||!this.key){
            alert("请配置appId及appKey");
            return;
        }
        const image = new Image();
        image.src=`${this.host}/favicon.png?k=${this.appId}&d=${Crypto.encrypt(Base64Util.stringify(JSON.stringify({
            level:level,
            content:content
        })),this.key)}`;
    }
    private static toString(content:any[]){
        const _content = content.map((con:string|object)=>{
            return typeof(con) == 'string'?con:JSON.stringify(con);
        });
        return _content.join(" ");
    };
    static trace(...content:string[]){
        if(this.production){
            this.sendToServer("trace",this.toString(content));
        }else{
            logger.log(`%c${content.join(" ")}`,'color:blue');
        }
    }
    static debug(...content:string[]){
        if(this.production){
            this.sendToServer("debug",this.toString(content));
        }else{
            logger.log(`%c${content.join(" ")}`,'color:cyan');
        }
    }
    static info(...content:string[]){
        if(this.production){
            this.sendToServer("info",this.toString(content));
        }else{
            logger.log(`%c${content.join(" ")}`,'color:green');
        }
    }
    static warn(...content:string[]){
        if(this.production){
            this.sendToServer("warn",this.toString(content));
        }else{
            logger.log(`%c${content.join(" ")}`,'color:yellow');
        }
    }
    static error(...content:string[]){
        if(this.production){
            this.sendToServer("error",this.toString(content));
        }else{
            logger.log(`%c${content.join(" ")}`,'color:red');
        }
    }
    static fatal(...content:string[]){
        if(this.production){
            this.sendToServer("fatal",this.toString(content));
        }else{
            logger.log(`%c${content.join(" ")}`,'color:magenta');
        }
    }
}

window.onerror=function() {
    const {message="",name="",stack=""}=arguments[4]||{};
    Log.error(message,name,stack);
};

window.addEventListener("unhandledrejection",function(event:any) {
    Log.error(event.reason);
});
// window.console=Log;

export {Log};