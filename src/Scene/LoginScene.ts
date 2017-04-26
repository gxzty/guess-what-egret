class LoginScene extends eui.Component {
	private loginBtn: eui.Button;
	private regeditBtn: eui.Button;
	public username: eui.TextInput;
	public password: eui.TextInput;
	public autoLoginCheckBox: eui.CheckBox;
	public rememberPassCheckBox: eui.CheckBox;

	private static m_instance;
	public onEnter() {
		LoginScene.getInstance().resetInput();
	}
	public static getInstance(): LoginScene {
		if (this.m_instance == null) {
			this.m_instance = new LoginScene();
		}
		return this.m_instance;
	};

	public constructor() {
		super();
		this.skinName = "resource/skin/Scene/Login/LoginScene.exml";
		
		zUtils.initInput(this.username,"输入账号");
		zUtils.initInput(this.password,"输入密码");
		this.password.displayAsPassword = true;

		this.getLocalInfo();
		this.rememberPassCheckBox.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.Event) => {
			if (!this.rememberPassCheckBox.$selected) {
				this.autoLoginCheckBox.$setSelected(false);
		    }
		}, this);
		
		this.autoLoginCheckBox.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.Event) => {
			if (this.autoLoginCheckBox.$selected) {
				this.rememberPassCheckBox.$setSelected(true);
		    }
		}, this);

		let Login = () => { 
			UserObject.saveInfoToLocal();
			zWebSocket.getInstance();
		};

		if (this.autoLoginCheckBox.$selected) {
			Login();
		}
		this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
			Login();
		}, this);
		this.regeditBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
			//Login();
		 },this);
	}

	private getLocalInfo() { 

		this.username.text = egret.localStorage.getItem('username');
		if (egret.localStorage.getItem('isRememberPass') == '1') {
			this.rememberPassCheckBox.$setSelected(true);
			this.password.text = egret.localStorage.getItem('password');
		}
		if (egret.localStorage.getItem('isAutoLogin') == '1') {
			this.autoLoginCheckBox.$setSelected(true);
			this.rememberPassCheckBox.$setSelected(true);
		}
	}

	public resetInput() {
		zUtils.reSetInputText(this.username);
		zUtils.reSetInputText(this.password);
	}

	public getUsername() { 
		return this.username.text;
	}
	public getPassword() {
		return this.password.text;
	}
}
