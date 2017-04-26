class Alert extends eui.Component {
	private titleDisplay: eui.Label;
	private alertContext: eui.Label;
	private commitBtn: eui.Button;
	private callback: Function;
	private alertGroup: eui.Group;
	public static show(_context: string, _title?: string) {
		let _alert = new Alert();
		_alert.alertContext.$setText(_context);
		if (_title) {
			_alert.titleDisplay.$setText(_title);
		}
		SceneManager.getInstance().addChild(_alert);
		return _alert;
	}
	public static showWithCallback(_context: string, _callback: Function, _title?: string) {
		let _alert = new Alert();
		_alert.alertContext.$setText(_context);
		if (_title) {
			_alert.titleDisplay.$setText(_title);
		}
		_alert.callback = _callback;
		SceneManager.getInstance().addChild(_alert);
		return _alert;
	}
	public constructor() {
		super();
		this.skinName = 'resource/skin/Misc/Alert/AlertSkin.exml';

		this.anchorOffsetX = this.width / 2;
		this.anchorOffsetY = this.height / 2;
		this.$setX(SceneManager.getInstance().getWinSize().width / 2);
		this.$setY(SceneManager.getInstance().getWinSize().height / 2);
		zAction.getInstance().TipsOpen(this.alertGroup);

		this.commitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
			zAction.getInstance().TipsClose(this.alertGroup, (() => {
				if (this.callback) {
					this.callback();
				}
				this.parent.removeChild(this);
			}).bind(this));
		}, this);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

}