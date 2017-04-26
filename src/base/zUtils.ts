class zUtils {
	public static getText(t: eui.TextInput) {
		return t.textDisplay.$getText();
	}
	public static initInput(i: eui.TextInput, s: string) {
		i.prompt = s;
	}
	public static setLabelText(l: eui.Label, s: string) {
		if (typeof s === 'string') {
			l.$setText(s);
		} else {
			l.$setText(String(s));
		}
	}
	public static reSetInputText(i: eui.TextInput) {
		//console.log(i);
		i.text = "";
	}
	public constructor() {
	}
}