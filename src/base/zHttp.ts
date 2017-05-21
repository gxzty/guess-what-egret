class zHttp {
    private static m_instance: zHttp = null;
    private SERVER_ADDRESS: string = "http://127.0.0.1";
    private PORT: number = 1992;
    //private SERVER_ADDRESS: string = 'http://www.posttestserver.com/';
    //private SERVER_ADDRESS: string = 'http://httpbin.org/';
    public constructor() {
        this.create();
    }

    public static getInstance(): zHttp {
        if (this.m_instance == null) {
            this.m_instance = new zHttp();
        }
        return this.m_instance;
    };

    public create(): void {
        console.log("create zHttp");
    }
    public sendHttpRequest(obj, url: string, _type: string, completeCallback?, params?: eui.ArrayCollection, errorCallback?, progressCallback?): void {
        console.log(obj);
        let flag = false;
        if (params == null) {
            flag = true;
            console.log("empty http");
            params = new eui.ArrayCollection();
            let time = String(new Date().getTime());
            params.addItem({ k: 'timestamp', v: time });
            params.addItem({ k: 'key', v: Encrypt.md5(Encrypt.md5("4B7D9717C34B2FB64CC813EA0ACC6D29" + time)) });
        }
        var pUrl = "";
        if (params != null && params.length > 0) {
            //console.log("params.length=", params.length);
            if (!flag) {
                let time = String(new Date().getTime());
                params.addItem({ k: 'timestamp', v: time });
                params.addItem({ k: 'key', v: Encrypt.md5(Encrypt.md5("4B7D9717C34B2FB64CC813EA0ACC6D29" + time)) });
            }
            pUrl = "?";
            for (var i = 0; i < params.length; i++) {
                if (pUrl != "") {
                    pUrl = pUrl + "&";
                }
                pUrl = pUrl + params.getItemAt(i).k + "=" + params.getItemAt(i).v;
            }
        }


        console.log("url:" + this.SERVER_ADDRESS + url + pUrl);
        var request: egret.HttpRequest = new egret.HttpRequest();
        _type == egret.HttpMethod.POST ? request.open(this.SERVER_ADDRESS + url, _type)
            : request.open(this.SERVER_ADDRESS + url + pUrl, _type);

        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        _type == egret.HttpMethod.POST ? request.send(pUrl) : request.send();

        request.addEventListener(egret.Event.COMPLETE, completeCallback ? completeCallback : this.onHttpDone, obj);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, errorCallback ? errorCallback : this.onHttpIOError, obj);
        request.addEventListener(egret.ProgressEvent.PROGRESS, progressCallback ? progressCallback : this.onHttpProgress, obj);
    }

    private onHttpProgress(event: egret.ProgressEvent): void {
        //console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    }

    private onHttpIOError(event: egret.IOErrorEvent): void {
        console.log("HttpError");
        console.log(event);
    }

    private onHttpDone(event: egret.Event): void {
        console.log("HttpDone");
    }

    public onHttpCompleted(event: egret.Event): boolean {
        var _request = <egret.HttpRequest>event.currentTarget;
        var _response = _request.response;
        let foo = JSON.parse(_response[0]);
        //console.log('返回code:' + foo['code']);
        if (foo) {
            return foo;
        }
        return undefined;

    }
}
