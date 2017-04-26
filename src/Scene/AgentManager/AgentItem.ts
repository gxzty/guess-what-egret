class AgentItem extends eui.Component {
	private idLabel: eui.Label;
	private wechatLabel: eui.Label;
	private provinceLabel: eui.Label;
	private fullNameLabel: eui.Label;
	private accountLabel: eui.Label;
	private qqLabel: eui.Label;
	private cityLabel: eui.Label;
	private balanceLabel: eui.Label;

	private chargeBtn: eui.Button;


	private rechargeToken: string;

	public constructor(_agentItem) {
		super();
		this.skinName = "resource/skin/Scene/AgentManager/ChoseAccountToChargeItem.exml"
		//console.log(_agentItem);
		zUtils.setLabelText(this.idLabel, _agentItem.id);
		zUtils.setLabelText(this.accountLabel, _agentItem.username);
		zUtils.setLabelText(this.fullNameLabel, _agentItem.full_name);
		zUtils.setLabelText(this.wechatLabel, _agentItem.wexin);
		zUtils.setLabelText(this.qqLabel, _agentItem.qq);
		zUtils.setLabelText(this.provinceLabel, _agentItem.province);
		zUtils.setLabelText(this.cityLabel, _agentItem.city);
		zUtils.setLabelText(this.balanceLabel, _agentItem.balance);
		this.rechargeToken = _agentItem.token;


		this.chargeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
			let chargeInfo = new eui.ArrayCollection();
			chargeInfo.addItem({ k: "recharge_token", v: this.rechargeToken });
			new InputTips(this.accountLabel.text, chargeInfo);
		}, this);
	}
}