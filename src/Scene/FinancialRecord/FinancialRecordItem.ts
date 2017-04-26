class FinancialRecordItem extends eui.Component {
	private idLabel: eui.Label;
	private receiverLabel: eui.Label;
	private countLabel: eui.Label;
	private afterChargeLabel: eui.Label;
	private chargeTime: eui.Label;



	public constructor(_agentItem) {
		super();
		this.skinName = "resource/skin/Scene/FinancialRecord/FinancialRecordItem.exml"
		//console.log(_agentItem);
		zUtils.setLabelText(this.idLabel, _agentItem.receiver);
		zUtils.setLabelText(this.receiverLabel, _agentItem.receiver);
		zUtils.setLabelText(this.countLabel, _agentItem.receiver);
		zUtils.setLabelText(this.afterChargeLabel, _agentItem.receiver);
		zUtils.setLabelText(this.chargeTime, _agentItem.receiver);
	}
}