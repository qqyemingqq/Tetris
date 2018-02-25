

var Loader = laya.net.Loader;
var Handler = laya.utils.Handler;

function MainUI() {
	var Event = laya.events.Event;
	MainUI.super(this);

	var autoDrop = setInterval(() => { dropBlock(); }, 1000)

	this.downBtn.on(Event.MOUSE_DOWN, this, moveBlockHandler, [dropBlock, true]);
	this.downBtn.on(Event.MOUSE_UP, this, moveBlockHandler, [dropBlock, true]);
	this.leftBtn.on(Event.MOUSE_DOWN, this, moveBlockHandler, [leftMove, false]);
	this.leftBtn.on(Event.MOUSE_UP, this, moveBlockHandler, [leftMove, false]);
	this.rightBtn.on(Event.MOUSE_DOWN, this, moveBlockHandler, [rightMove, false]);
	this.rightBtn.on(Event.MOUSE_UP, this, moveBlockHandler, [rightMove, false]);

	var moveInterval;
	function moveBlockHandler(func, isDownBtn, event) {
		console.log(func, isDownBtn, event);
		switch (event.type) {
			case 'mousedown':
				func();
				moveInterval = setInterval(func, 150);
				console.log('mousedown');
				if (this) {
					console.log(this);
				}
				if (isDownBtn) {
					clearInterval(autoDrop)
				}
				break;
			case 'mouseup':
				clearInterval(moveInterval);
				if (isDownBtn) {
					autoDrop = setInterval(() => { dropBlock(); }, 1000);
				}
				break;
			default:
				break;
		}
	}
	function onLeftBtnClick() {
		console.log(this.boardBg);
		console.log("object");
	}

	function onListRender(item, index) {
		//自定义list的渲染方式
		var label = item.getChildByName("label");
		if (index % 2) {
			label.color = "#ff0000";
		} else {
			label.color = "#000000";
		}
	}
}
Laya.class(MainUI, "MainUI", mainUI);


Laya.init(400, 600);
Laya.stage.scaleMode = "showall";

Laya.loader.load("res/atlas/comp.atlas", Handler.create(this, onAssetLoaded), null, Loader.ATLAS);

function onAssetLoaded() {
	Laya.stage.addChild(new MainUI());
	initBoardBlocks()

}

