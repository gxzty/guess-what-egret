class UserObject {
	private static UserName;
	private static FullName;
	private static Token;
	private static Level;
	private static Password;

	private static Score;

	private static getPassword() {
		return this.Password;
	}
	public static setPassword(_password) {
		this.Password = _password;
	}
	public static getScore() {
		return this.Score;
	}
	public static setScore(_score) {
		this.Score = _score;
	}
	public static getUsername() {
		return this.UserName;
	}
	public static setUsername(_username) {
		console.log("setUsername:"+_username);
		this.UserName = _username;
	}
	public static getLevel() {
		return this.Level;
	}
	public static setLevel(_level) {
		this.Level = _level;
	}
	public static saveInfoToLocal() {
		egret.localStorage.clear();
		egret.localStorage.setItem('username',LoginScene.getInstance().username.text);
		egret.localStorage.setItem('password',LoginScene.getInstance().password.text);
		egret.localStorage.setItem('isRememberPass',LoginScene.getInstance().rememberPassCheckBox.$selected?'1':'0');
		egret.localStorage.setItem('isAutoLogin', LoginScene.getInstance().autoLoginCheckBox.$selected ? '1' : '0');
    }
	public static userQuit() {
		this.Level = "";
		this.Token = "";
		this.FullName = "";
		this.UserName = "";
		this.Score = "";
		SceneManager.getInstance().replaceLayer(LoginScene);
	}


	public static getUserInfo() {
		let infoCallback = (e: egret.Event) => {
			let foo = zHttp.getInstance().onHttpCompleted(e);
			if (foo) {
				let result = foo['results'];
				UserObject.setScore(result['balance']);
				LobbyScene.getInstance().setBelence(UserObject.getScore());
				//console.log(UserObject);
			}
		};
		zHttp.getInstance().sendHttpRequest(this, "agent/info", egret.HttpMethod.POST, infoCallback);
	}

	public static getUsersAgentInfo() {
		//console.log("getUsersAgentInfo");
		zHttp.getInstance().sendHttpRequest(this, "agent/listing", egret.HttpMethod.POST, (e: egret.Event) => {
			AgentManager.getInstance().resetGroupItems();
			let foo = zHttp.getInstance().onHttpCompleted(e);
			if (foo) {
				//console.log(foo['results']);
				let agentArray = foo['results'];
				for (let _i = 0; _i < agentArray.length; ++_i) {
					let _agentItem = new AgentItem(agentArray[_i]);
					AgentManager.getInstance().addGroupItem(_agentItem);
					_agentItem.$setY(_i * (_agentItem.$getHeight() + 20));
				}
			}
		});
	}

	public static getChargeRecordInfo() {
		//console.log("getChargeRecordInfo");
		zHttp.getInstance().sendHttpRequest(this, "agent/listing", egret.HttpMethod.POST, (e: egret.Event) => {
			let foo = zHttp.getInstance().onHttpCompleted(e);
			if (foo) {
				//console.log(foo['results']);
				let chargeRecordArray = foo['results'];
				for (let _i = 0; _i < chargeRecordArray.length; ++_i) {
					let _chargeItem = new FinancialRecordItem(chargeRecordArray[_i]);
					FinancialRecord.getInstance().addGroupItem(_chargeItem);
					_chargeItem.$setY(_i * (_chargeItem.$getHeight() + 12));
				}
			}
		});
	}
}
