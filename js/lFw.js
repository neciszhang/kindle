
//lFramework
var lFw={}

//初始化
lFw.init=function () {
	
	document.title=""//标题
	
	window.baseUrl = "https://www.baidu.com/"//基础地址
	
	//图片地址
	/*if(lIsLAN()==true)
	{
		window.imgPath = "img/"
	}else{
		//window.imgPath = "http://lzy-campaign.oss-cn-qingdao.aliyuncs.com/kindle_tm/"
	}*/
	
	window.imgPath = "img/"
	
	window.urlObj = lUrlToObj()//urlobj
	window.hashObj = lHashToObj()//hashObj
	
	if(lIsLAN()==true && urlObj.debug==undefined) urlObj.debug=1
	
	//debugDiv
	window.debugDiv = lDiv(document.body,0,0,"100%")
	
	//debugLog
	if(urlObj.log==1) lFw.deBugLog(debugDiv)
	console.log("urlObj",JSON.stringify(urlObj));
	
	//debug按钮---------------------------------------
	if (urlObj.debug == 1) {
		lFw.initDebug(debugDiv)
	}

	//取消iphone双击屏幕事件
	document.body.addEventListener("touchend",pDefault,{ passive: false })
	document.body.addEventListener("touchstart",pDefault,{ passive: false })
	document.body.addEventListener("touchmove",pDefault,{ passive: false })
	document.body.addEventListener("click",pDefault,{ passive: false })
	
	function pDefault (e) {
		
		var nodeName=e.target.nodeName.toLocaleLowerCase()
		//方向：true为横屏
		var orientation = window.orientation==90||window.orientation==-90
		if(nodeName=="div" || nodeName=="img" || e.type=="touchmove")
		{
			//console.log("orientation",orientation);
			//只在能完整显示页面的时候启用
			if(lFw.mainDiv.offsetHeight <= window.innerHeight || orientation==true)
			{
				if(e.target.id!="sc")
				{
					//console.log("取消默认事件");
					e.preventDefault()
				}
			}
		}
	}
	
}












//debugLog
lFw.deBugLog=function (tDiv) {
	window.debugLogDiv = lDebugLog(tDiv)
	var oldLog = console.log
	console.log=function(t) {
		if(t!=undefined)
		{
			oldLog.apply(console,arguments)
			if(t.success!=undefined)
			{
				lDebug.log(JSON.stringify(t))
			}else{
				lDebug.log.apply(lDebug,arguments)
			}
		}else{
			lDebug.log("undefined")
		}
	}
}

//横屏提示
lFw.initOTip=function () {
	var oTip={}
	lFw.oTip=oTip
	
	oTip.BigW=lDiv(document.body,0,0,"200%",50,"#000")//扩充屏幕用防止ios放大场景
	lRemoveChild(oTip.BigW)
	
	oTip.tDiv=lDiv(undefined,"0%","0%","100%","100%","#333")//tipDiv
	//var ass069=lImg(imgPath+"ass069.jpg",mF_tipDiv,0,0,"100%")
	
	oTip.span=lSpan("为了更好体验，请使用竖屏浏览",oTip.tDiv,"50%","80%",30,"#fff")//tip文案
	oTip.span.style.width="640px"
	oTip.span.style.textAlign="center"
	TweenMax.to(oTip.span,0,{x:"-50%",y:"-50%"})
	
	//oTip.pic建议高度用百分比
	oTip.pic=lImg(imgPath+"tip.png",oTip.tDiv,"50%","40%")
	TweenMax.to(oTip.pic,0,{x:"-50%",y:"-50%"})
	
	if(lIsAndroid()==true) TweenMax.to([oTip.pic,oTip.span],0,{scale:9/16})
	
	oTip.tl=new TimelineMax({repeat:-1,paused:true})//tip动画
	oTip.tl.to(oTip.pic,1,{rotation:90,ease:Power1.easeInOut})
	oTip.tl.to(oTip.pic,1,{rotation:0,ease:Power1.easeInOut})
	oTip.tl.render(0)
	
	oTip.ef=lTweenMaxEf(function () {
		oTip.tDiv.style.width=window.innerWidth+"px"
		oTip.tDiv.style.height=window.innerHeight+"px"
	})
	
	//解决在ios上屏幕翻转后不触发resize的问题
	oTip.checkResize = lTimesEf(function () {
		if(lFw.resize) lFw.resize()
	},0.2,5)
	
	oTip.checkResize.start()
	
	lOrientationTip(onOrientation)
	
	function onOrientation (h) {
		console.log("lFw: onOrientationchange");
		if(h==true)
		{
			document.body.appendChild(oTip.BigW)
			document.body.scrollTop=0
			document.body.appendChild(oTip.tDiv)
			
			oTip.ef.start()
			oTip.tl.play()
			
			TweenMax.to(lFw.mainDiv,0,{autoAlpha:0})
		}else{
			oTip.ef.stop()
			oTip.tl.stop()
			lRemoveChild(oTip.tDiv)
			lRemoveChild(oTip.BigW)
			TweenMax.to(lFw.mainDiv,0,{autoAlpha:1})
			oTip.checkResize.restart()
		}
	}
	lFw.onOrientation=onOrientation
}

//文字弹窗
lFw.addTextPop =function (mainDiv) {
	
	var popDiv = lPop(mainDiv)
	
	var alertWidth=460//弹窗宽度
	var margin=40;//上下间隔
	var bgColor="#f9f9f9"//背景色
	
	//外层div
	var bigDiv = lDiv(undefined,"50%","45%",alertWidth,500)
	TweenMax.to(bigDiv,0,{x:"-50%",y:"-50%"})
	
	//内容div
	var infoBg = lDiv(bigDiv,0,0,alertWidth,500,bgColor)
	infoBg.style.borderRadius="25px 25px 0px 0px"
	
	//内容文版
	var span = lSpan("内容",bigDiv,margin,margin,24,"#000")
	span.style.width=alertWidth-margin*2+"px"
	span.style.textAlign="center"
	
	//按钮
	var btnBg = lDiv(bigDiv,0,0,alertWidth,80,bgColor)
	btnBg.style.borderRadius="0px 0px 25px 25px"
	btnBg.style.borderTopStyle="solid"
	btnBg.style.borderTopWidth="1px"
	btnBg.style.borderTopColor="#e1e1e5"
	
	//按钮文案
	var btnSpan = lSpan("确定",btnBg,margin,22,25,"#006aff")
	btnSpan.style.width=alertWidth-margin*2+"px"
	btnSpan.style.textAlign="center"
	
	bigDiv.span = span
	
	bigDiv.onOpen=function () {
		//resize
		infoBg.style.height=(span.offsetTop+span.offsetHeight+margin)+"px"
		btnBg.style.top=(infoBg.offsetHeight)+"px"
		bigDiv.style.height=infoBg.offsetHeight+btnBg.offsetHeight+"px"
	}
	
	lBtn(btnBg,function () {
		popDiv.close()
	})
	
	popDiv.addPop(bigDiv,"text")
	
	//显示弹窗
	bigDiv.showText=function (text) {
		span.innerHTML=text
		popDiv.openPop("text")
	}
	
	//显示错误
	bigDiv.showErrText=function (text,msg) {
		bigDiv.showText(text+"<br/>"+'<span style="opacity: 0.3;font-size: 20px;">'+msg+'</span>')
	}
	
	return bigDiv
}

//分享页面
lFw.addSharePage = function (pop) {
	
	var share = lDiv(undefined,0,0,640,1039);
	
	
	var shareTl=new TimelineMax({repeat:-1,paused:true})
	//shareTl.to(target,0.5,{x:-20,y:20,ease:Power1.easeInOut})
	//shareTl.to(target,0.5,{x:-0,y:0,ease:Power1.easeInOut})
	shareTl.render(0)
	
	share.onOpen=function () {
		shareTl.play()
	}
	share.onClose=function () {
		shareTl.stop()
	}
	
	//关闭
	lBtn(share,function () 
	{
		pop.close("tra")
	},"none","none")
	
	pop.addPop(share,"share")
	
	return share
}


/**
 * 音乐控制
用法：
	var mCtrl = lFw.music(mainDiv,586,14)
	mCtrl.autoPlay()
	
 * @param {Object} p
 * @param {Object} x
 * @param {Object} y
 */
lFw.music= function (p,x,y,waveColor) {
	if(x==undefined) x=640-30
	if(y==undefined) y=30
	if(waveColor==undefined) waveColor="#ff0000"
	
	var mDiv=lDiv(p,x,y,30,30,"rgba(255,0,0,0.0)")
	
	var musicUrl = imgPath+"music.mp3"
	
	var music = lAudio(musicUrl,false,true,onPlay,onPause)
	var music_howl = new Howl({
		src: [musicUrl],
		autoplay: false,
		loop: true,
		volume: 1,
		onplay :onPlay,
		onpause :onPause,
	});
	
	var curM=1
	if(lIsWeixin()==false)
	{
		curM=1
	}
	
	var styleWave=true
	if(styleWave)
	{
		//音波方式
		var mBtn = lMusicCtrl(5,6,4,30,3,waveColor)
		mDiv.appendChild(mBtn)
		var mbtnLine=lDiv(mBtn,0,32,28,3,waveColor)
		
		//投影
		/*var shadow = "1px 0px 0px 0px rgba(0, 0, 0,1)"
		for (var i = 0; i < mBtn.lineArr.length; i++) {
			TweenMax.to(mBtn.lineArr[i], 0.5, {boxShadow:shadow})
		}
		TweenMax.to(mbtnLine, 0.5, {boxShadow:shadow})*/
		
	}else{
		//按钮方式
		var m_off = lImg(imgPath+"m_off.png",mDiv,0,0)
		var m_on = lImg(imgPath+"m_on.png",mDiv,0,0)
		
		var mFrame = lFrameSimple([m_off,m_on])
	}
	
	function isPlaying () {
		if(curM==0){
			return !music.paused
		}else{
			return music_howl.playing()
		}
	}
	
	mDiv.isPlaying = isPlaying
	
	//改变颜色
	mDiv.changeColor=function (c) {
		for (var i = 0; i < mBtn.lineArr.length; i++) {
			mBtn.lineArr[i].style.background=c
		}
		mbtnLine.style.background=c
	}
	
	//由用户点击关闭。如果需要音乐恢复播放是可判断此项是否是由用户关闭
	mDiv.userPlay=false
	lBtn(mDiv,function () {
		
		if(isPlaying ())
		{
			mDiv.stop()
			mDiv.userPlay=false
		}else{
			mDiv.play()
			mDiv.userPlay=true
		}
		
	},"none","none")

	
	lAddClickArea(mDiv)
	
	//播放时触发
	function onPlay () {
		document.removeEventListener("WeixinJSBridgeReady",mDiv.play)
		if(styleWave){
			mBtn.startAni()
		}else{
			mFrame.gotoPage(1)
		}
	}
	
	//播放时触发暂停时触发
	function onPause () {
		if(styleWave){
			mBtn.stopAni()
		}else{
			mFrame.gotoPage(0)
		}
	}
	
	//播放
	mDiv.play = function () {
		//本地模式时不会播放
		if(curM==0)
		{
			music.play()
		}else{
			music_howl.play()
		}
		console.log("lFw：music_curM",curM);
	}
	//停止
	mDiv.stop = function () {
		music.pause()
		music_howl.pause()
		curM=1
	}
	
	//设置自动播放(本地模式时不会播放)
	mDiv.autoPlay = function () {
		
		if(urlObj.debug!=1)
		{
			mDiv.userPlay=true
			curM=0
			mDiv.play()
			document.addEventListener("WeixinJSBridgeReady",function () {
				music.play()
			})
			
		}
	}
	
	return mDiv
}

//解决Howl第一次TouchStart不播放的bug
lFw.initHowl=function () {
	
	window.addEventListener("touchstart",playEpt)
	var ept = new Howl({
		src: [imgPath+"ept.mp3"],
		autoplay: false,
		loop: false,
		volume: 0.1
	});
	function playEpt () {
		window.removeEventListener("touchstart",playEpt)
		ept.play()
	}
}

//页面动画
lFw.initFlipObj=function (pageDiv,pageArr) {
	for (var i = 0; i < pageArr.length; i++) {
		pageArr[i].id="def"
	}
	
	var lFlipObj = lFlip(pageDiv,pageArr)
	
	//设置横向翻页或纵向翻页(默认纵向翻页)
	//lFlipObj.setDfEfHorizontal(640,true,4,0.5)
	lFlipObj.setDfEfVerticality(1240,true,4,0.5)
	
	//监听翻页变化
	var lastP=0
	lFlipObj.onChange=function (num) 
	{
		
		if(pageArr[num].pageName!=undefined)
		{
			//lFw.track("进入"+pageArr[num].pageName+"页")
			console.log("lFlipObj：进入第"+num+"页("+pageArr[num].pageName+")");
		}else{
			console.log("lFlipObj：进入第",num,"页")
		}
		
		//动画控制
		if(pageArr[lastP].stopAni!=undefined)
		{
			//console.log("lFlipObj：第 "+(lastP+1)+" 页 stopAni()")
			try{
				pageArr[lastP].stopAni()
			}catch(e){
				console.log(e);
			}
		}
		
		if(pageArr[num].playAni!=undefined)
		{
			//console.log("lFlipObj：第 "+(num+1)+" 页 playAni()")
			try{
				pageArr[num].playAni()
			}catch(e){
				console.log(e);
			}
		}
		
		lastP=lFlipObj.curPageId
	}
	
	lFw.lFlipObj = lFlipObj
	lFw.pageArr=pageArr
	return lFlipObj
}

//debug按钮
lFw.initDebug=function (tDiv) {
	var debugObj = lFw.deBug(tDiv)
	
	debugObj.addBtn("up",function () {
		if(lFw.lFlipObj) lFw.lFlipObj.prevPage()
	})
	debugObj.addBtn("down",function () {
		if(lFw.lFlipObj) lFw.lFlipObj.nextPage()
	})
	debugObj.addBtn("play",function () {
		if(lFw.lFlipObj) lFw.pageArr[lFw.lFlipObj.curPageId].playAni()
	})
	debugObj.addBtn("stop",function () {
		if(lFw.lFlipObj) lFw.pageArr[lFw.lFlipObj.curPageId].stopAni()
	})
	var ctrlObj
	debugObj.addBtn("ctrlT",function () {
		if(addTargeted==false)
		{
			addTargeted=true
			ctrlObj = lAddTargetCtrl(document.body)
			document.body.addEventListener("mousemove", onM)
			document.body.addEventListener("keydown",onKD)
		}
	})
	var addTargeted=false
	var line946 = lDiv(tDiv,0,946,640,1,"rgba(255,0,0,0.1)")
	line946.style.pointerEvents="none"
	
	
	var te
	var mouseX
	var mouseY
	var tempP
	function onM(e) {
		
		if (e.changedTouches == undefined) {
			te = e
		} else {
			te = e.changedTouches[0]
		}

		mouseX = parseInt(te.clientX / window.resizeSc)
		mouseY = parseInt(te.clientY / window.resizeSc)

	}
	function onKD (e) {
		if(e.code=="KeyP" && mouseX!=undefined && mouseY!=undefined && ctrlObj.curTarget!=undefined)
		{
			tempP = lGetGlobalPoint(ctrlObj.curTarget)
			
			console.log('相对位置：transformOrigin:"'+(mouseX - tempP.x)+"px "+(mouseY - tempP.y)+'px"');
		}
	}
}

//debug
lFw.deBug = function(tDiv) {
	
	var deBugUtils={}
	
	deBugUtils.btnArr=[]
	deBugUtils.deBugDiv=lDiv(tDiv,"100%",500,0)
	TweenMax.to(deBugUtils.deBugDiv,0,{y:"-50%"})
	var curH=0
	//添加按钮
	deBugUtils.addBtn=function (btnName,onClick,btnSize,textSize) {
		if(btnSize==undefined) btnSize=55
		if(textSize==undefined) textSize=17
		deBugUtils.btnSize = btnSize
		
		var btn = lDiv(deBugUtils.deBugDiv, -btnSize-2, 0, btnSize, btnSize*0.8, "rgba(14,33,18,0.3)")
		btn.style.border = "1px solid rgba(63, 178, 63, 1)"
		btn.style.position="relative"
		btn.style.float="left"
		btn.style.borderRadius="5px"
		
		if(btnName!=undefined)
		{
			var sp = lSpan(btnName,btn,0,0,textSize,"#f4fff4")
			sp.style.width=btnSize+"px"
			sp.style.textAlign="center"
			TweenMax.to(sp, 0, {textShadow:"1px 1px 3px rgba(0, 138, 11, 1)"});
			lAlignByNum(sp,btnSize,btnSize*0.8)
		}
		
		if(onClick!=undefined) lBtn(btn,onClick)
		
		deBugUtils.btnArr.push(btn)
		curH+=btnSize*0.8
		deBugUtils.deBugDiv.style.height=curH+"px"
		//deBugUtils.resize()
	}
	
	//按下ctrl件并点击鼠标打印当前坐标
	document.body.addEventListener("touchend", onClick)
	document.body.addEventListener("mouseup", onClick)

	function onClick(e) {

		var te
		if (e.changedTouches == undefined) {
			te = e
		} else {
			te = e.changedTouches[0]
		}

		var mouseX = parseInt(te.clientX / window.resizeSc)
		var mouseY = parseInt(te.clientY / window.resizeSc)

		if (e.ctrlKey == true) {
			console.log("lFw: 坐标位置", "{x:"+mouseX + ",y:" + mouseY+"},");
		}

	}
	
	return deBugUtils
}

//resize
lFw.initResize=function () {
	var mResize={}
	window.resizeSc=1
	var tH
	var wRect
	var lastTW
	
	$(window).resize(resize)
	resize()
	function resize() {
		wRect=lWindowRect()
		wRect.height = wRect.height/window.resizeSc
		
		if(lastTW!=wRect.width+"_"+wRect.height)
		{
			
			if(lIsMobile()==false)
			{
				window.resizeSc = lScaleByWidth(lFw.mainDiv, 640, 1008, wRect, 1)
				//lRemoveChild(lFw.mainDiv)
				//document.body.appendChild(lFw.mainDiv)
			}
			
			tH=wRect.height
			tH=lNumRange(tH,lFw.minH,lFw.maxH)
			
			lFw.mainDiv.style.height=tH+"px"
		
			lastTW=wRect.width+"_"+wRect.height
			console.log("lFw：resize",JSON.stringify(wRect));
			
			//调用ui自适应
			if(lFw.uiResize!=undefined) lFw.uiResize(wRect)
		}
		
		//检查方向
		var orientation = window.orientation==90||window.orientation==-90
		if(orientation==true)
		{
			lFw.onOrientation(true)
		}
	}
	lFw.resize = resize
}

//追踪代码
lFw.track = function(name,type) {
	
	if(type==undefined)	type='event'
	
	//来源追踪
	var pSt=""
	if(urlObj.v!=undefined && urlObj.v!="")
	{
		pSt+="_v"+urlObj.v
	}
	
	if(urlObj.f!=undefined && urlObj.f!="")
	{
		pSt+="_"+urlObj.f
	}
	
	if(window._hmt!=undefined)
	{
		console.log("lFw: track",name+pSt);
		_hmt.push(['_trackEvent', type+pSt, name, name+pSt])
	}else{
		console.log("lFw: 未安装百度检测",name+pSt);
	}
}

lFw.init()