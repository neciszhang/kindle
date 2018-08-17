/**
 * 增加弹窗
 * 用法：

	var popDiv = glbObj.addPop(mainDiv)
	
	//打开自定义弹窗，将自定义内容放在popDiv.spContentDiv中 用 lFrameAni([内容1,内容2,内容3]) 切换
	popDiv.openSpPop()
	
	
	//打开默认弹窗
	popDiv.openDftPop("标题","内容")
	
	
	//====添加文字弹窗
	
	var txtW=500
	var txtH=300
	
	var txtBack = lDiv(undefined,"50%","50%",txtW,txtH,"rgba(0,0,0,0.8)")
	TweenMax.to(txtBack,0,{x:"-50%",y:"-50%"})
	
	//标题
	var sp1 = lSpan("默认弹窗标题",txtBack,txtBack.offsetLeft,txtBack.offsetTop+40,29,"#fff")
	sp1.style.width=txtW+"px"
	sp1.style.textAlign="center"
	sp1.style.lineHeight="27px"
	TweenMax.to(sp1, 0, {textShadow:"2px 2px 0px #245c86"});
	
	//内容
	var sp2 = lSpan("默认弹窗内容默认弹窗内容默认弹窗内容默认弹窗内容默认弹窗内容",txtBack,"10%",90,24,"#fff")
	sp2.style.width="80%"
	sp2.style.textAlign="center"
	sp2.style.lineHeight="36px"//行距
	sp2.style.letterSpacing="3px"//字间距
	
	//关闭
	var closeBtn = lDiv(txtBack,txtBack.offsetLeft+txtW-70,txtBack.offsetTop,70,70)
	closeBtn.innerHTML="x"
	closeBtn.style.color="#ff0000"
	closeBtn.style.fontSize="70px"
	
	popDiv.addPop(txtBack,"text")
	
	lBtn(closeBtn,function () {
		popDiv.close()
	})
	
	
属性：
black	背景div
contentDiv	弹窗div

方法：
addPop(target,name)	增加pop
openPop(name,style)	打开pop
close(name,time)	关闭pop

事件：
onOpen()
onClose()

 * @param {Object} p	父级
 * @param {Number} tw	页面宽
 * @param {Number} th	页面高
 */
function lPop (p,tw,th) {
	//950, 537
	if(tw==undefined) tw = "100%"//页面宽
	if(th==undefined) th = "100%"//页面高
	
	var pop = lDiv(p,0,0,tw,th);
	var black = lDiv(pop,0,0,tw,th,"rgba(0,0,0,0.7)");
	
	//内容div
	var contentGrp= lDiv(pop,0,0,tw,th)

	//特殊内容div============================================
	var contentDiv = lDiv(contentGrp,0,0,tw,th)
	
	var openStyleArr=[]
	var openStyleNameArr=[]
	function addOpenStyle (fun,name) {
		openStyleArr.push(fun)
		openStyleNameArr.push(name)
	}
	
	var closeStyleArr=[]
	var closeStyleNameArr=[]
	function addCloseStyle (fun,name) {
		closeStyleArr.push(fun)
		closeStyleNameArr.push(name)
	}
	
	//默认效果
	addCloseStyle(function (time) {
		if(time==undefined) time=0.2
		TweenMax.to(contentGrp,time,{scale:0.6,ease:Power1.easeOut})
		TweenMax.to(pop,time,{autoAlpha:0})
	},"dft")
	
	
	addOpenStyle(function () {
		TweenMax.to(pop,0,{autoAlpha:0.01})
		TweenMax.to(pop,0.3,{autoAlpha:1})
		if(lIsAndroid()==true)
		{
			TweenMax.delayedCall(0.1,function () {
				TweenMax.to(contentGrp,0,{scale:0.6})
				TweenMax.to(contentGrp,1.2,{scale:1,ease:Elastic.easeOut.config(1, 0.7)})
			})
		}else{
			TweenMax.to(contentGrp,0,{scale:0.6})
			TweenMax.to(contentGrp,1.2,{scale:1,ease:Elastic.easeOut.config(1, 0.7)})
		}

	},"dft")
	
	//渐变效果
	addCloseStyle(function (time) {
		if(time==undefined) time=0.15
		//TweenMax.to(contentGrp,time,{scale:1,ease:Power1.easeOut})
		TweenMax.to(pop,time,{autoAlpha:0})
	},"tra")
	
	addOpenStyle(function () {
		TweenMax.to(contentGrp,0,{scale:1})
		TweenMax.to(pop,0,{autoAlpha:0})
		//TweenMax.to(contentGrp,0.6,{scale:1})
		TweenMax.to(pop,0.3,{autoAlpha:1})
	},"tra")
	
	
	function open(name,p) {
		

	}
	pop.close=function (name,time) {
		//console.log(111);
		
		if(name==undefined) name="dft"
		closeStyleArr[closeStyleNameArr.indexOf(name)](time)
		
		if(pop.onClose!=undefined) pop.onClose(curPopName)
		if(curPopName!=undefined && getCDiv(curPopName).onClose!=undefined){
			getCDiv(curPopName).onClose(curPopName)
		}
		
		pop.isOpen=false
	}
	
	var curPopName
	pop.isOpen=false
	//打开自定义弹窗
	pop.openPop = function (name,style) {
		
		if(pop.isOpen==true)
		{
			pop.close("dft",0)
		}
		
		pop.isOpen=true
		
		if(curPopName!=undefined) TweenMax.to(getCDiv(curPopName),0,{autoAlpha:0})
		
		
		//console.log(name);
		TweenMax.to(getCDiv(name),0,{autoAlpha:1})
		curPopName = name
		
		if(style==undefined) style="dft"
		openStyleArr[openStyleNameArr.indexOf(style)]()

		if(pop.onOpen!=undefined) pop.onOpen(name)
		if(getCDiv(curPopName).onOpen!=undefined) getCDiv(curPopName).onOpen(name)
	}
	
	//根据name取得content div
	function getCDiv (name) {
		return contentArr[contentNameArr.indexOf(name)]
	}
	
	var contentArr=[]
	var contentNameArr=[]
	pop.addPop = function (target,name) {
		contentArr.push(target)
		contentNameArr.push(name)
		contentDiv.appendChild(target)
		TweenMax.to(target,0,{autoAlpha:0})
	}
	
	pop.close("dft",0)
	
	
	pop.contentDiv = contentDiv
	pop.black = black
	
	return pop
}