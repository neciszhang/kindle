
/**
 * coverflow效果类
用法：

	var lcf = (function() {
		//config
		var p = p2//按钮父级
		var swipeP//手势区域
		
		var pageArr=[]
		for (var i = 0; i < 10; i++) {
			pageArr[i]=lImg(imgPath+"xz_"+(i)+".png",lcfDiv,0,0)
		}
		
		var pArr=[
			{left:0-300,autoAlpha:0,scale:0.5},
			{left:0,autoAlpha:1,scale:1},
			{left:0+300,autoAlpha:0,scale:0.5}
		]
		
		var lcf = lCoverFlow(pageArr,pArr,[0,2,1],2,true)
		
		//手势
		if(swipeP)
		{
			var hmCtrlObj_lcf = new Hammer(swipeP);
			//DIRECTION_HORIZONTAL
			hmCtrlObj_lcf.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL,velocity:0.1});
			hmCtrlObj_lcf.on('swipeleft', function(ev) 
			{
				lcf.nextPage()
			});
			hmCtrlObj_lcf.on('swiperight', function(ev) 
			{
				lcf.prevPage()
			});
		}
		
		//翻页按钮
		var rightBtn = lDiv(p,640-120,1008/2-200/2,120,200,"rgba(255,0,0,0.5)")
		var leftBtn = lDiv(p,0,1008/2-200/2,120,200,"rgba(255,0,0,0.5)")
		
		//翻页控制
		lBtn(leftBtn,function () {
			lcf.prevPage()
		},"none","none")
		lBtn(rightBtn,function () {
			lcf.nextPage()
		},"none","none")
		lcf.onChange=function(num)
		{
			console.log(num)//当前页
		}
		
		
		return lcf
	})()
	
	

属性：
tweenTime	默认时间
curPageId	当前页id（在loop模式下会进行余数运算，保证该数不会大于页总数）
curPId	当位置id
curP	当前动画帧
draggable	如果添加了拖动操作，该对象是draggable

方法：
turnToPage()	翻倒指定页面
nextPage()	下一页
prevPage()	上一页
setCurPagePoint()	设置当前动画帧
addDrag()	添加拖动操作
killTween()	停止翻页动画
killDragTween()	停止正在活动的拖动动作
killAllTween()	停止所有正在运行的Tween

事件：
onChange	当页面改变时
onUpdate	当动动画变化行时
onTurnToPageComplete	当翻页结束时

 * @param {Array} pageArr	页面数组
 * @param {Array} positionArr	位置数组
 * @param {Array} zIndexArr	深度素组数字越大越靠前
 * @param {Number} firstP	主要图片所在位置，从1开始（在位置数组中有个主要图片位置，将该位置传入）
 * @param {Boolean} loop	是否循环(开启循环必须图片数量大于positionArr)，默认flase
 */
function lCoverFlow (pageArr,positionArr,zIndexArr,firstP,loop) 
{
	if(loop==undefined) loop=false
	if(firstP==undefined) firstP=0
	firstP = lNumRange(firstP,1,pageArr.length)
	if(zIndexArr.length!=positionArr.length) throw "zIndexArr长度须与positionArr长度一致"
	var cfObj={}
	cfObj.ease = Power3.easeOut//默认ease
	cfObj.tweenTime=0.7;//默认时间
	cfObj.curPageId=0;//当前页（该页面会根据firstP变化）
	cfObj.lastPageId=-1;//上一页
	cfObj.curPId=0;//当前动画位置（整数）
	cfObj.curP=0;//当前动画位置
	cfObj.lastP=undefined;//上一个动画帧位置
	cfObj.maxPageNum=pageArr.length
	var tlArr = []
	var pArrLength=positionArr.length//位置长度
	var sortArr = []//排序arr
	var lastSortP=-1;//上次排序位置
	var i
	cfObj.pageArr = pageArr
	
	//pageArr = lRollArray(pageArr,pageArr.length,-firstP+1,true)
	
	
	//排序
	for (i = 0; i < pageArr.length; i++) {
		sortArr[i]=i;
	}
	
	function zOder(num) {
		var rArr = lRollArray(sortArr,positionArr.length,-num,true)
		var crArr = lCloneArray(rArr)
		
		//console.log(1,rArr)
		rArr.sort(onSortFun)
		//console.log(2,rArr)
		function onSortFun(a,b)
		{
			
		     var v1=zIndexArr[crArr.indexOf(a)]
		     var v2=zIndexArr[crArr.indexOf(b)]
		     if(v1> v2)
		     {
		          return 1
		     }else if(v1<v2){
		          return -1
		     }else {
		          return 0
		     }
		}
		
		for (i = 0; i < rArr.length; i++) {
			if(rArr[i]!=undefined && pageArr[rArr[i]]!=undefined)
			{
				//console.log(pageArr[rArr[i]],pageArr)
				if(pageArr[rArr[i]].parentNode)
				{
					pageArr[rArr[i]].parentNode.appendChild(pageArr[rArr[i]])
				}
				//sortArr[i].parentNode.appendChild(sortArr[i])
			}
			
		}
		//console.log("zoder")
	}
	
	
	//生成tl
	for (i = 0; i < positionArr.length; i++) {
		positionArr[i].ease=Power0.easeNone
	}
	
	for (i = 0; i < pageArr.length; i++) {
		
		tlArr[i] = new TimelineMax()
		
		TweenMax.set(pageArr[i],positionArr[0])
		
		for (var j = 0; j < positionArr.length; j++) 
		{
			if(j==0)
			{
				tlArr[i].to(pageArr[i],0,positionArr[j])
			}else{
				tlArr[i].to(pageArr[i],1,positionArr[j])
			}
			
		}
		
		tlArr[i].pause()
	}
	
	/**
	 * 翻到指定页
	 * @param {Number} num	页数
	 * @param {Number} time	时间
	 * @param {Object} ease	缓动
	 */
	cfObj.turnToPage = function(num,time,ease)
	{
		//如果添加了拖动互动则停止，否则会影响翻页动画
		cfObj.killDragTween()
		cfObj.killTween()
		
		if(time==undefined) time = cfObj.tweenTime
		if(ease==undefined)	ease = cfObj.ease
		
		if(loop==false)
		{
			num = lNumRange(num,0,pageArr.length-1)
		}
		
		setCurPageId(Math.round(num))
		
		run()
		
		function run () 
		{
			TweenMax.to(cfObj,time,
				{
					ease:ease,
					onComplete:cfObj.onTurnToPageComplete,
					curP:num,
					onUpdate:cfObj.setCurPagePoint
				})
			
		}
		
	}
	
	/**
	 * 上一页
	 * @param {Number} time	时间
	 * @param {Object} ease	缓动
	 */
	cfObj.prevPage = function (time,ease)
	{
		cfObj.turnToPage(cfObj.curPId-1,time,ease)
	}
	
	/**
	 * 下一页
	 * @param {Number} time	时间
	 * @param {Object} ease	缓动
	 */
	cfObj.nextPage = function(time,ease)
	{
		cfObj.turnToPage(cfObj.curPId+1,time,ease)
	}
	

	/**
	 * 改变当前也位置
	 * @param {Number} num	位置
	 */
	cfObj.setCurPagePoint =  function(num) 
	{
		
		if(num==undefined)
		{
			//由tweenmax调用
			num=cfObj.curP
		}else{
			//手动调用
			cfObj.curP = num
			setCurPageId(Math.round(num))
		}
		num=-num
		num+=firstP-1//偏移
		
		
		var tPoint
		
		if(cfObj.lastP!=cfObj.curP)
		{
			for (i = 0; i < pageArr.length; i++) {
				
				if(loop)
				{
					tPoint = (num+i)%pageArr.length
					
					if(tPoint<0)
					{
						tPoint = tPoint+pageArr.length
					}
					
				}else{
					tPoint = num+i
				}
				
				if(tPoint>pArrLength-1 || tPoint<0)
				{
					if(pageArr[i].style.display!="none") $(pageArr[i]).hide()
				}else{
					if(pageArr[i].style.display!="") $(pageArr[i]).show()
					tlArr[i].seek(tPoint)
				}
				
			}
			
			cfObj.lastP=tPoint
			
			//排序
			var curRoundP = Math.round(num)
			if(lastSortP!=curRoundP)
			{
				lastSortP = curRoundP
				zOder(curRoundP)
			}
				
			//upadate事件
			if(cfObj.onUpdate!=undefined)
			{
				cfObj.onUpdate(num)
			}
			
			$(cfObj).trigger("onUpdate");
		}
		
		
	}
	
	//设置当前页,并发布事件
	function setCurPageId (num) 
	{
		if(cfObj.curPId!=num)
		{
			cfObj.curPId = num
			
			cfObj.lastPageId = cfObj.curPageId
			cfObj.curPageId = num%cfObj.maxPageNum
			if(cfObj.curPageId<0)
			{
				cfObj.curPageId+=cfObj.maxPageNum
			}

			if(cfObj.onChange!=undefined)
			{
				cfObj.onChange(cfObj.curPageId)
			}
			//$(cfObj).trigger("onChange");
		}
	}
	
	//删除tween动画
	cfObj.killTween = function () 
	{
		TweenMax.killTweensOf(cfObj)
	}
	
	
	var onDraging=false
	/**
	 * 给lcf添加拖动操作
	 * 用法：
		var areaDiv = lDiv(p7,320-159,261,159,582,"rgba(0,255,0,0.5)")
		lcf.addDrag(areaDiv,"x") 
	 * 
	 * 给lcf添加拨动区域
	 * @param {Object} areaDiv	鼠标互动区域
	 * @param {String} v	方向(x或y)
	 * @param {Number} scaleNum	移动比例
	 */
	cfObj.addDrag=function (areaDiv,v,scaleNum) 
	{
		if(scaleNum==undefined) scaleNum=130
		if(v==undefined) v="x"
		
		//空对象
		var nullObj=lDiv(undefined,0,0,0,0,"rgba(255,0,0,0.5)")
		nullObj.style.zIndex=20
		
		var maxDragNum = scaleNum*(cfObj.maxPageNum-1)
		
		cfObj.draggable = Draggable.create(nullObj,
		{
			trigger:areaDiv,
			dragResistance: 0.37,
			throwProps: true,
			type:v, 
			zIndexBoost: false,
			onDrag:onDrag,
			onDragStart:onDragStart,
			onThrowUpdate: onDrag,
			onThrowComplete: onThrowComplete,
			onPress: onPress,
			onRelease: onRelease,
			onDragEnd:onDragEnd,
			liveSnap:{
				x:function (v) {
					if(loop==false)
					{
						if(v>0)
						{
							v = v*0.2
						}else if(v<-maxDragNum){
							v=-maxDragNum +(v+maxDragNum)*0.2
						}
					}
					return v
				},
				y:function (v) {
					if(loop==false)
					{
						if(v>0)
						{
							v = v*0.2
						}else if(v<-maxDragNum){
							v=-maxDragNum +(v+maxDragNum)*0.2
						}
					}
					return v
				}
			},
			snap:{
				x: function(endValue) {
					endValue = Math.round(endValue / scaleNum) * scaleNum
					if(loop==false)
					{
						endValue = lNumRange(endValue,-maxDragNum,0)
					}
					return endValue
				},
				y: function(endValue) {
					endValue = Math.round(endValue / scaleNum) * scaleNum
					if(loop==false)
					{
						endValue = lNumRange(endValue,-maxDragNum,0)
					}
					return endValue
				}
			}
		});
		
		$(cfObj).bind("onUpdate",function () {
			
			if(onDraging==false)
			{
				//console.log("同步");
				TweenMax.set(nullObj,{x:-cfObj.curP*scaleNum,y:-cfObj.curP*scaleNum,overwrite:true})
			}
		});
		
		function onThrowComplete () {
			onDraging=false
			//console.log("onThrowComplete");
		}
		
		function onDrag (e) {
			onDraging=true
			cfObj.setCurPagePoint(-nullObj._gsTransform[v]/scaleNum)
			//console.log("onDrag");
		}
		function onDragStart (e) 
		{
			//console.log("onDragStart");
		}
		function onPress () {
			cfObj.killTween()
		}
		function onRelease () {
			//console.log("onRelease",onDraging);
			if(onDraging==false)
			{
				//console.log("xxx");
				//修正因为onPress而停止的tween
				cfObj.turnToPage(Math.round(cfObj.curP))
			}
			onDraging=false
		}
		function onDragEnd () {
			
			//console.log("onDragEnd");
		}
	}
	
	//停止正在活动的拖动动作
	cfObj.killDragTween=function() {
		if(cfObj.draggable!=undefined)
		{
			cfObj.draggable[0].kill()
			cfObj.draggable[0].enabled(true)
			onDraging=false
		}
	}
	
	//停止所有正在运行的Tween
	cfObj.killAllTween=function() {
		cfObj.killDragTween()
		cfObj.killTween()
	}
	
	cfObj.setCurPagePoint(0)
	
	
	return cfObj
	//cfObj.turnToPage(10,10)
}
