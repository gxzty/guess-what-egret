class InputTips extends eui.Component {
	private commitBtn: eui.Button;
	private cancelBtn: eui.Button;
	private chargeInput: eui.TextInput;
	private balanceLabel: eui.Label;
	private chargeToLabel: eui.Label;
	private chargeInputGroup: eui.Group;
	private callback: Function;

	public constructor(_chargeTo: string, chargeInfo: eui.ArrayCollection) {
		super();

		this.skinName = 'resource/skin/Misc/InputTips/InputTips.exml';
		this.anchorOffsetX = this.width / 2;
		this.anchorOffsetY = this.height / 2;
		this.$setX(SceneManager.getInstance().getWinSize().width / 2);
		this.$setY(SceneManager.getInstance().getWinSize().height / 2);
		zAction.getInstance().TipsOpen(this.chargeInputGroup);

		zUtils.setLabelText(this.balanceLabel, UserObject.getScore());
		zUtils.setLabelText(this.chargeToLabel, _chargeTo);

		function IsNum(s) {
			if (s != null) {
				var r, re;
				re = /\d*/i; //\d 表示数字,* 表示匹配多个数字
				r = s.match(re);
				return (r == s) ? true : false;
			}
			return false;
		}
		zUtils.initInput(this.chargeInput, "充值金额");
		this.commitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
			let chargeNumber = zUtils.getText(this.chargeInput);
			if (!IsNum(chargeNumber)) {
				Alert.show("请输入一个正整数");
				this.chargeInput.textDisplay.$setText("");
				return;
			} else {
				chargeInfo.addItem({ k: "qty", v: Number(chargeNumber) });
				zHttp.getInstance().sendHttpRequest(this, "agent/recharge", egret.HttpMethod.POST, (e: egret.Event) => {
					let foo = zHttp.getInstance().onHttpCompleted(e);
					if (foo) {
						Alert.show(foo['message']);
						UserObject.getUserInfo();
						UserObject.getUsersAgentInfo();
					}
				}, chargeInfo);
				this.parent.removeChild(this);
			}
		}, this);

		this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
			zAction.getInstance().TipsClose(this.chargeInputGroup, (() => {
				this.parent.removeChild(this);
			}).bind(this));
		}, this);


		SceneManager.getInstance().addChild(this);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

}