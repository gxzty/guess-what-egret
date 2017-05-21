interface Socket {
	mCmd: number;
	sCmd: number;
	data: Object;
}
class zWebSocket {
	private sock: egret.WebSocket;
	private static m_instance: zWebSocket;
	private wsServer: string = "echo.websocket.org";
	private wsPort: number = 80;
	//private wsServer: string = "127.0.0.1";
	//private wsPort: number = 2346;

	public static getInstance() {
		if (!this.m_instance) {
			this.m_instance = new zWebSocket();
		}
		return this.m_instance;
	}

	public constructor() {
		this.sock = new egret.WebSocket();
		this.sock.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
		this.sock.addEventListener(egret.Event.CLOSE,this.onSocketClose,this);
		this.sock.addEventListener( egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this );
		
		this.sock.connectByUrl('ws://127.0.0.1:2346');
	}
	private onSocketClose() {
		console.log("onSocketClose");
	}
	private onSocketOpen() {
		console.log("onSocketOpen");
		let msg: Socket = {
			mCmd: zDefine.wsLogin.MAINCMD,
			sCmd: zDefine.wsLogin.LOGIN,
			data: {
				username: LoginScene.getInstance().getUsername(),
				password: LoginScene.getInstance().getPassword()
			}
		};
		console.log(msg);
		this.sendSocket(msg);
	}
	public sendSocket( _msg: Socket) {
		let _msgStr = JSON.stringify(_msg);
		this.sock.writeUTF(_msgStr);
	}


	private onReceiveMessage(e:egret.Event) {
		console.log("onReceiveMessage");
		zUtils.log(JSON.parse(this.sock.readUTF()));
		let msg:Socket = JSON.parse(this.sock.readUTF());
		console.log(msg);
		let _data:Object = msg['data'];
		switch (msg['mCmd']) {
			case zDefine.wsLogin.MAINCMD:
				switch (msg['sCmd']) {
					case zDefine.wsLogin.LOGIN:
						zUtils.log(msg);	
						// UserObject.setUsername(_data['username']);
						// UserObject.setLevel(_data['level']);
						// UserObject.setScore(_data['score']);
						break;
					case zDefine.wsLogin.REGEDIT:
						break;
				}
				break;	
		}
		
	}
}