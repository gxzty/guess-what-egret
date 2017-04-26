class LobbyScene extends eui.Component {
	private static m_instance;
	private balanceText: eui.Label;
	private lobbyCreateAgentBtn: eui.Button;
	private lobbyFinancialRecordBtn: eui.Button;
	private lobbyAgentManagerBtn: eui.Button;
	private rightBtn: eui.Button;
	public onEnter() {
		UserObject.getUserInfo();
	}
	public static getInstance(): LobbyScene {
		if (this.m_instance == null) {
			this.m_instance = new LobbyScene();
		}
		return this.m_instance;
	};

	public constructor() {
		super();
		this.skinName = "resource/skin/Scene/Lobby/LobbyScene.exml";

		this.lobbyCreateAgentBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
			SceneManager.getInstance().replaceLayer(CreateAccount);
		}, this);
		this.lobbyFinancialRecordBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
			SceneManager.getInstance().replaceLayer(FinancialRecord);
		}, this);
		this.lobbyAgentManagerBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
			SceneManager.getInstance().replaceLayer(AgentManager);
		}, this);

		this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
			UserObject.userQuit();
		}, this);

		UserObject.getUserInfo();
	}
	public setBelence(_balance) {
		this.balanceText.$setText(_balance);
	}
}
