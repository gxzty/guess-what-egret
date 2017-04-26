class AgentManager extends eui.Component implements eui.UIComponent {
	private static m_instance;
	private titleLabel: eui.Label;
	private leftBtn: eui.Button;
	private rightBtn: eui.Button;
	private agentGroup: eui.Group;
	public onEnter() {
		UserObject.getUsersAgentInfo();
	}
	public static getInstance(): AgentManager {
		if (this.m_instance == null) {
			this.m_instance = new AgentManager();
		}
		return this.m_instance;
	};
	public constructor() {
		super();
		this.skinName = "resource/skin/Scene/AgentManager/AgentManager.exml";
		this.titleLabel.$setText("代理管理");
		this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
			SceneManager.getInstance().backToLobby();
		}, this);
		UserObject.getUsersAgentInfo();
	}
	public addGroupItem(s) {
		this.agentGroup.addChild(s);
	}
	public resetGroupItems() {
		this.agentGroup.removeChildren();
	}
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

}