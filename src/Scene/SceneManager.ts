class SceneManager extends eui.UILayer {
	private static m_instance: SceneManager;
	private globalLayer;

	private currentLayer = null;
	public constructor(_globalLayer) {
		super();
		this.globalLayer = _globalLayer;
		this.currentLayer = LoginScene.getInstance();
		this.addChild(this.currentLayer);
	}

	public static getInstance(_globalLayer?): SceneManager {
		if (this.m_instance == null) {
			this.m_instance = new SceneManager(_globalLayer);
		}
		return this.m_instance;
	}
	public getRunningLayer() {
		return this.currentLayer;
	}
	public backToLobby() {
		this.replaceLayer(LobbyScene);
	}
	public replaceLayer(_layer: any): void {
		this.removeChild(this.currentLayer);
		this.currentLayer = _layer.getInstance();
		this.checkLayerChange(_layer);
		this.addChild(this.currentLayer);
	}
	public getWinSize() {
		return { width: this.globalLayer.stage.stageWidth, height: this.globalLayer.stage.stageHeight };
	}
	public getDirector() {
		return this.globalLayer;
	}
	private checkLayerChange(_layer) {
		_layer.getInstance().onEnter();
	}
}
