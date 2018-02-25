var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var mainUI=(function(_super){
		function mainUI(){
			
		    this.rightBtn=null;
		    this.boardBg=null;
		    this.leftBtn=null;
		    this.downBtn=null;
		    this.rotateBtn=null;

			mainUI.__super.call(this);
		}

		CLASS$(mainUI,'ui.mainUI',_super);
		var __proto__=mainUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(mainUI.uiView);

		}

		mainUI.uiView={"type":"View","props":{"width":400,"height":600},"child":[{"type":"Button","props":{"y":370,"x":154,"width":80,"var":"rightBtn","skin":"comp/button.png","sizeGrid":"4,4,4,4","rotation":0,"label":"→","height":80}},{"type":"Sprite","props":{"y":30,"x":30,"var":"boardBg"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/cubebg.png"}},{"type":"Image","props":{"y":100,"x":0,"skin":"comp/cubebg.png"}},{"type":"Image","props":{"y":0,"x":100,"skin":"comp/cubebg.png"}},{"type":"Image","props":{"y":100,"x":100,"skin":"comp/cubebg.png"}},{"type":"Image","props":{"y":200,"x":100,"skin":"comp/cubebg.png"}},{"type":"Image","props":{"y":200,"x":0,"skin":"comp/cubebg.png"}}]},{"type":"Button","props":{"y":370,"x":30,"width":80,"var":"leftBtn","skin":"comp/button.png","sizeGrid":"4,4,4,4","rotation":0,"label":"←","height":80}},{"type":"Button","props":{"y":475,"x":92,"width":80,"var":"downBtn","skin":"comp/button.png","sizeGrid":"4,4,4,4","rotation":0,"label":"↓","height":80}},{"type":"Button","props":{"y":416,"x":272,"width":100,"var":"rotateBtn","skin":"comp/button.png","sizeGrid":"4,4,4,4","rotation":0,"label":"〇","height":100}}]};
		return mainUI;
	})(View);