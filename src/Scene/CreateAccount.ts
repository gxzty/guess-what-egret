class CreateAccount extends eui.Component implements eui.UIComponent {
	private static m_instance;
	private titleLabel: eui.Label;
	private leftBtn: eui.Button;
	private rightBtn: eui.Button;

	private accountInput: eui.TextInput;
	private passwordInput: eui.TextInput;
	private fullNameInput: eui.TextInput;
	private wechatInput: eui.TextInput;
	private qqInput: eui.TextInput;
	private cityInput: eui.TextInput;
	private provinceInput: eui.TextInput;

	private agentCreateBtn: eui.Button;
	public static getInstance(): CreateAccount {
		if (this.m_instance == null) {
			this.m_instance = new CreateAccount();
		}
		return this.m_instance;
	};
	public onEnter() {
		CreateAccount.getInstance().resetInput();
	}
	public constructor() {
		super();
		this.skinName = "resource/skin/Scene/CreateAccount/CreateAccount.exml";
		this.titleLabel.$setText("创建账号");
		this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
			SceneManager.getInstance().backToLobby();
		}, this);

		zUtils.initInput(this.accountInput, "登录账号必须是手机号码(必填)");
		zUtils.initInput(this.passwordInput, "请输入登录密码(必填)");
		zUtils.initInput(this.fullNameInput, "请输入联系人姓名(必填)");
		zUtils.initInput(this.wechatInput, "请输入微信号");
		zUtils.initInput(this.qqInput, "请输入QQ号");
		zUtils.initInput(this.cityInput, "");
		zUtils.initInput(this.provinceInput, "");

		this.agentCreateBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
			this.agentCreateBtn.$setEnabled(false);

			let createInfo = new eui.ArrayCollection();
			createInfo.addItem({ k: "username", v: zUtils.getText(this.accountInput) });
			createInfo.addItem({ k: "password", v: zUtils.getText(this.passwordInput) });
			createInfo.addItem({ k: "full_name", v: zUtils.getText(this.fullNameInput) });
			createInfo.addItem({ k: "wechat", v: zUtils.getText(this.wechatInput) });
			createInfo.addItem({ k: "qq", v: zUtils.getText(this.qqInput) });

			zHttp.getInstance().sendHttpRequest(this, "agent/create", egret.HttpMethod.POST, (e: egret.Event) => {
				CreateAccount.getInstance().agentCreateBtn.$setEnabled(true);
				let foo = zHttp.getInstance().onHttpCompleted(e);
				if (foo) {
					//console.log(foo['results']);
					Alert.showWithCallback(foo['message'], () => { SceneManager.getInstance().backToLobby(); });
				}
			}, createInfo);
		}, this);
	}
	public resetInput() {
		zUtils.reSetInputText(this.accountInput);
		zUtils.reSetInputText(this.passwordInput);
		zUtils.reSetInputText(this.fullNameInput);
		zUtils.reSetInputText(this.wechatInput);
		zUtils.reSetInputText(this.qqInput);
		zUtils.reSetInputText(this.cityInput);
		zUtils.reSetInputText(this.provinceInput);
	}
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

}