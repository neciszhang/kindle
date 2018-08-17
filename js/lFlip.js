function lFlip(p,pageArr,tl1Order,tl2Order) {
	var lFlipObj = lDiv(p, 0, 0)
	var pNone=lDiv(lFlipObj,0,0)
	TweenMax.to(pNone,0,{autoAlpha:0})
	pNone.style.display="none"
	var p1 = lDiv(lFlipObj, 0, 0,parseFloat(pageArr[0].style.width),parseFloat(pageArr[0].style.height))
	var p2 = lDiv(lFlipObj, 0, 0,parseFloat(pageArr[0].style.width),parseFloat(pageArr[0].style.height))
	p1.id = "lFlip_p1"
	p2.id = "lFlip_p2"

	if(tl1Order == undefined) tl1Order = true
	if(tl2Order == undefined) tl2Order = false

	for(var i = 0; i < pageArr.length; i++) {
		lRemoveChild(pageArr[i])
	}

	p1.appendChild(pageArr[0])
	p2.appendChild(pageArr[1])

	//动画时间
	lFlipObj.tweenTime = 0.7;

	//当前页
	lFlipObj.curPageId = 0;
	//上一页
	lFlipObj.lastPageId = -1;

	//当翻页动画位置（用于tweenmax画时间线）
	lFlipObj.curPagePoint = 0;

	//easing
	lFlipObj.ease = Power3.easeOut

	//在翻页动画结束前不接受新的翻页指令
	lFlipObj.waitingForAni = false

	//动画是否在运行中
	lFlipObj.onAni = false

	//不要动态修改
	lFlipObj.pageArr = pageArr
	lFlipObj.maxPageNum = pageArr.length
	lFlipObj.lastPagePoint = 0; //上一个页面位置（用来判断往上翻还是往下翻）
	lFlipObj.turn = true //方向true代表往下翻，false代表往回翻
	lFlipObj.lastTurn = true //上次方向

	//动画结束
	lFlipObj.onAniCom = function() {
		lFlipObj.onAni = false
	}

	//跳转之前的当前页
	lFlipObj.jumpTarget
	lFlipObj.jumpPoint = 0
	//lFlipObj.jumpTurn
	/**
	 * 
	 * @param {Number} num
	 * @param {Object} op
	 * @p-config {Number} time	时间
	 * @p-config {Object} ease	ease
	 * @p-config {Boolean} turn	方向
	 */
	lFlipObj.jumpToPage = function(num, time, ease, turn) {

		num = Math.max(num, 0)
		num = Math.min(num, lFlipObj.pageArr.length - 1)
		
		//如果未指定翻页，则判断翻页
		if(turn == undefined)
		{
			if(lFlipObj.curPageId<num)
			{
				turn=true
			}else{
				turn=false
			}
		}
		if(time == undefined) time = lFlipObj.tweenTime
		if(ease == undefined) ease = lFlipObj.ease
		
		//console.log("jumpToPage",lFlipObj.curPageId,num);
		//console.log("jumpToPage",lFlipObj.curPageId-num,turn);
		//如果是相邻的页面，且方向和turnToPage默认方向一致则转换为turnToPage
		if(lFlipObj.curPageId - num==-1 && turn==true ||lFlipObj.curPageId - num==1 && turn==false) 
		{
			//console.log("turnToPage");
			lFlipObj.turnToPage(num, time, ease)

		} else if(num != lFlipObj.curPageId) {
			//console.log("jumpToPage",num);

			TweenMax.killTweensOf(lFlipObj)
			lFlipObj.jumpTarget = num

			//立即到当前页
			//lFlipObj.setCurPagePoint(lFlipObj.curPageId)
			//console.log(lFlipObj.curPagePoint);
			lFlipObj.curPagePoint_lastI=-1//强制更新页面
			lFlipObj.lastTurn=-1//强制更新页面
			lFlipObj.curPagePoint=num
			//触发
			setCurPageId(Math.round(num))
			//只做方向动画
			if(turn) {
				//console.log(111111111111111);
				lFlipObj.turn = true
				lFlipObj.jump.render(0)
				lFlipObj.jump.seek(0)
			} else {
				//console.log(2222222222222222);
				lFlipObj.turn = false
				lFlipObj.jump2.render(0)
				lFlipObj.jump2.seek(0)
			}
			
			if(lFlipObj.turn == true)
			{
				//console.log("lFlipObj.turn",lFlipObj.turn,"111111");
				if(tl1Order==true)
				{
					lSendToTop(p1)
				}else{
					lSendToTop(p2)
				}
			}else{
				//console.log("lFlipObj.turn",lFlipObj.turn,"2222");
				if(tl2Order==true)
				{
					lSendToTop(p2)
				}else{
					lSendToTop(p1)
				}
			}
			
			for (var i = 0; i < pageArr.length; i++) 
			{
				pNone.appendChild(pageArr[i])
			}
			
			p1.appendChild(pageArr[lFlipObj.curPageId])
			p2.appendChild(pageArr[lFlipObj.lastPageId])
			
			p1.style.display=""
			p2.style.display=""

			if(lFlipObj.waitingForAni == false) //等待动画
			{
				run()

			} else if(lFlipObj.onAni == false) //
			{
				run()
			}
		}
		function onJumpAniStart () {
			
		}
		function run() {
			lFlipObj.jumpPoint = 0
			TweenMax.to(lFlipObj, time, {
				onStart:onJumpAniStart,
				ease:ease,
				onComplete: tweenCom,
				jumpPoint: 1,
				onUpdate: lFlipObj.setCurPagePoint_Jump
			})
		}

		function tweenCom() {
			lFlipObj.curPagePoint = lFlipObj.jumpTarget
			lFlipObj.jumpTarget = undefined
			if(lFlipObj.onTurnToPageComplete != undefined) lFlipObj.onTurnToPageComplete()
		}
	}
	lFlipObj.setCurPagePoint_Jump = function() {
		//console.log("jumpPoint",lFlipObj.jumpPoint);
		checkDisplay (lFlipObj.jumpPoint)
		if(lFlipObj.turn == true) {
			lFlipObj.jump.seek(lFlipObj.jumpPoint)
		} else {
			lFlipObj.jump2.seek(lFlipObj.jumpPoint)
		}
	}

	/**
	 * 翻到指定页
	 * @param {Number} num	页数
	 * @param {Number} time	时间
	 * @param {Object} ease	缓动
	 */
	lFlipObj.turnToPage = function(num, time, ease) {
		//console.log("turnToPage", lFlipObj.curPagePoint, num);
		if(time == undefined) time = lFlipObj.tweenTime
		if(ease == undefined) ease = lFlipObj.ease

		num = Math.max(num, 0)
		num = Math.min(num, lFlipObj.pageArr.length - 1)

		if(lFlipObj.curPagePoint != num) {
			lFlipObj.jumpTarget = undefined

			TweenMax.killTweensOf(lFlipObj)
			setCurPageId(Math.round(num))

			if(lFlipObj.waitingForAni == false) //等待动画
			{
				run()

			} else if(lFlipObj.onAni == false) //
			{
				run()
			}
		}

		function run() {
			TweenMax.to(lFlipObj, time, {
				ease: ease,
				onComplete: lFlipObj.onTurnToPageComplete,
				curPagePoint: num,
				onUpdate: lFlipObj.setCurPagePoint
			})
		}

	}

	/**
	 * 下一页
	 * @param {Number} time	时间
	 * @param {Object} ease	缓动
	 */
	lFlipObj.nextPage = function (time,ease)
	{
		lFlipObj.turnToPage(lFlipObj.curPageId+1,time,ease)
	}
	
	/**
	 * 上一页
	 * @param {Number} time	时间
	 * @param {Object} ease	缓动
	 */
	lFlipObj.prevPage = function(time,ease)
	{
		lFlipObj.turnToPage(lFlipObj.curPageId-1,time,ease)
	}

	lFlipObj.curPagePoint_i //整数
	lFlipObj.curPagePoint_d //小数
	lFlipObj.curPagePoint_lastI = 0 //当前显示页
	/**
	 * 改变当前也位置
	 * @param {Number} num	位置
	 */
	lFlipObj.setCurPagePoint = function(num) {

		if(num == undefined) {
			//console.log("由tweenmax调用",lFlipObj.curPagePoint);
			//由tweenmax调用
			num = lFlipObj.curPagePoint
		} else {
			//手动调用
			lFlipObj.curPagePoint = num
			setCurPageId(Math.round(num))
		}
		//console.log("setCurPagePoint", num, lFlipObj.turn, lFlipObj.lastPagePoint)
		//timeline的bug，从时间线最后跳至0时有问题,必须先经过一个其他的点
		if(lFlipObj.lastPagePoint == lFlipObj.maxPageNum - 1 && num == 0) {
			lFlipObj.setCurPagePoint(0.1)
			lFlipObj.setCurPagePoint(0)
			return
		}

		lFlipObj.curPagePoint_i = Math.floor(num)
		lFlipObj.curPagePoint_d = num % 1

		//console.log(lFlipObj.curPageId,lFlipObj.lastPageId)

		if(num != lFlipObj.lastPagePoint) {
			//console.log(lFlipObj.curPagePoint_d,num);
			//方向控制
			if(num > lFlipObj.lastPagePoint) {
				//console.log("setCurPagePoint_Turn",true,lFlipObj.curPagePoint_d);
				lFlipObj.turn = true
				lFlipObj.timeLine.seek(lFlipObj.curPagePoint_d)
			} else {
				//console.log("setCurPagePoint_Turn",false,lFlipObj.curPagePoint_d);
				lFlipObj.turn = false
				lFlipObj.timeLine2.seek(lFlipObj.curPagePoint_d)
			}

			//改变层次
			//console.log(lFlipObj.lastTurn,lFlipObj.turn);
			if(lFlipObj.lastTurn != lFlipObj.turn) {
				//console.log("indexOrder");
				indexOrder()
				//清楚上次改变显示状态的页面
			}

			//console.log(lFlipObj.curPagePoint_d,num);
			//更换动画容器中的页面
			if(lFlipObj.jumpTarget == undefined) {
				if(lFlipObj.curPagePoint_i != lFlipObj.curPagePoint_lastI) {
					//console.log(lFlipObj.curPagePoint_i,lFlipObj.curPagePoint);

					for (var i = 0; i < pageArr.length; i++) 
					{
						pNone.appendChild(pageArr[i])
					}

					if(pageArr[lFlipObj.curPagePoint_i]) {
						p1.appendChild(pageArr[lFlipObj.curPagePoint_i])
					}

					if(pageArr[lFlipObj.curPagePoint_i + 1]) {
						p2.appendChild(pageArr[lFlipObj.curPagePoint_i + 1])
					}

					lFlipObj.curPagePoint_lastI = lFlipObj.curPagePoint_i
				}
			}
			
			checkDisplay(num)
			//checkDisplay(num)
			
			lFlipObj.lastTurn = lFlipObj.turn //上次方向
			lFlipObj.lastPagePoint = num //记录上次变换位置
			//console.log(num)

			//upadate事件
			if(lFlipObj.onUpdate != undefined) {
				lFlipObj.onUpdate(num)
			}
		}
	}
	
	var checkDisplay_last
	var checkDisplay_cur
	function checkDisplay (n) {
		if(n%1==0){
			checkDisplay_cur=1
		}else{
			checkDisplay_cur=2
		}
		if(checkDisplay_cur!=checkDisplay_last)
		{
			if(checkDisplay_cur==1)
			{
				p1.style.display=""
				p2.style.display="none"
			}else{
				p1.style.display=""
				p2.style.display=""
			}
			checkDisplay_last=checkDisplay_cur
		}
	}
	
	//改变p1,p2的前后顺序
	function indexOrder() {

		if(lFlipObj.turn == true) {

			if(tl1Order) {
				order1()
			} else {
				order2()
			}

		} else {

			if(tl2Order) {
				order1()
			} else {
				order2()
			}
		}

		function order1() {
			//console.log("order1");
			lSendToTop(p2)
		}

		function order2() {

			//console.log("order2");
			lSendToTop(p1)
		}
	}

	//设置当前页,并发布事件
	function setCurPageId(num) {
		if(lFlipObj.curPageId != num) {
			lFlipObj.lastPageId = lFlipObj.curPageId;
			lFlipObj.curPageId = num

			if(lFlipObj.onChange != undefined) {
				lFlipObj.onChange(num)
			}
		}
	}

	/**
	 * 设置默认效果(垂直翻页)
	 * @param {number}	height	页面高度（默认为window.innerHeight）
	 * @param {Boolean}	useTransform	true使用x,y;false则使用left,top
	 * @param {number}	outEase	推出页面缓动效果，默认是4
	 * @param {number}	outAlpha	推出页面alpha，默认是0.5
	 */
	lFlipObj.setDfEfVerticality = function(height, useTransform, outEase, outAlpha) {
		if(height == undefined) height = window.innerHeight
		if(useTransform == undefined) useTransform = true
		if(outEase == undefined) outEase = 4
		if(outAlpha == undefined) outAlpha = 0.5

		if(useTransform == true) {
			//向下翻页效果
			lFlipObj.next_currentStart = {x: 0,y: 0,autoAlpha: 1}//原始页_开始
			lFlipObj.next_currentEnd = {x: 0,y: -height / outEase,autoAlpha: outAlpha}//原始页_结束

			lFlipObj.next_enterStart = {x: 0,y: height,autoAlpha: 1}//进入页_开始
			lFlipObj.next_enterEnd = {x: 0,y: 0,autoAlpha: 1}//进入页_结束

			//向上翻页效果
			lFlipObj.prev_currentStart = {x: 0,y: 0,autoAlpha: 1}
			lFlipObj.prev_currentEnd = {x: 0,y: height / outEase,autoAlpha: outAlpha}

			lFlipObj.prev_enterStart = {x: 0,y: -height,autoAlpha: 1}
			lFlipObj.prev_enterEnd = {x: 0,	y: 0,autoAlpha: 1}
		} else {
			//向下翻页效果
			lFlipObj.next_currentStart = {left: 0,top: 0,autoAlpha: 1}
			lFlipObj.next_currentEnd = {left: 0,top: -height / outEase,autoAlpha: outAlpha}

			lFlipObj.next_enterStart = {left: 0,top: height,autoAlpha: 1}
			lFlipObj.next_enterEnd = {left: 0,top: 0,autoAlpha: 1}

			//向上翻页效果
			lFlipObj.prev_currentStart = {left: 0,top: 0,autoAlpha: 1}
			lFlipObj.prev_currentEnd = {left: 0,top: height / outEase,autoAlpha: outAlpha}

			lFlipObj.prev_enterStart = {left: 0,top: -height,autoAlpha: 1}
			lFlipObj.prev_enterEnd = {left: 0,top: 0,autoAlpha: 1}
			//console.log(1111111)
		}

		lFlipObj.applyStyle()
	}

	/**
	 * 设置默认效果(横向翻页)
	 * @param {number}	width	页面宽度（默认为window.innerWidth）
	 * @param {Boolean}	useTransform	true使用x,y;false则使用left,top
	 * @param {number}	outEase	推出页面缓动效果，默认是4
	 * @param {number}	outAlpha	推出页面alpha，默认是0.5
	 */
	lFlipObj.setDfEfHorizontal = function(width, useTransform, outEase, outAlpha) {
		if(width == undefined) width = window.innerWidth
		if(useTransform == undefined) useTransform = true
		if(outEase == undefined) outEase = 4
		if(outAlpha == undefined) outAlpha = 0.5

		if(useTransform == true) {
			//向下翻页效果
			lFlipObj.next_currentStart = {x: 0,y: 0,autoAlpha: 1}
			lFlipObj.next_currentEnd = {x: -width / outEase,y: 0,autoAlpha: outAlpha}

			lFlipObj.next_enterStart = {x: width,y: 0,autoAlpha: 1}
			lFlipObj.next_enterEnd = {x: 0,y: 0,autoAlpha: 1}

			//向上翻页效果
			lFlipObj.prev_currentStart = {x: 0,y: 0,autoAlpha: 1}
			lFlipObj.prev_currentEnd = {x: width / outEase,y: 0,autoAlpha: outAlpha}

			lFlipObj.prev_enterStart = {x: -width,y: 0,autoAlpha: 1}
			lFlipObj.prev_enterEnd = {x: 0,y: 0,autoAlpha: 1}

		} else {
			//向下翻页效果
			lFlipObj.next_currentStart = {	left: 0,top: 0,autoAlpha: 1}
			lFlipObj.next_currentEnd = {	left: -width / outEase,top: 0,autoAlpha: outAlpha}

			lFlipObj.next_enterStart = {left: width,top: 0,autoAlpha: 1}
			lFlipObj.next_enterEnd = {left: 0,top: 0,autoAlpha: 1}

			//向上翻页效果
			lFlipObj.prev_currentStart = {left: 0,top: 0,autoAlpha: 1}
			lFlipObj.prev_currentEnd = {left: width / outEase,top: 0,autoAlpha: outAlpha}

			lFlipObj.prev_enterStart = {left: -width,top: 0,autoAlpha: 1}
			lFlipObj.prev_enterEnd = {left: 0,top: 0,autoAlpha: 1}

		}

		lFlipObj.applyStyle()
	}

	/**
	 * 建立动画时间线
	 */
	lFlipObj.applyStyle = function() {

		//清除
		if(lFlipObj.timeLine != undefined) {
			lFlipObj.timeLine.clear()
			lFlipObj.timeLine.kill()
		}

		if(lFlipObj.timeLine2 != undefined) {
			lFlipObj.timeLine2.clear()
			lFlipObj.timeLine2.kill()
		}

		lFlipObj.next_currentStart.ease = Linear.easeNone
		lFlipObj.next_currentEnd.ease = Linear.easeNone
		lFlipObj.next_enterStart.ease = Linear.easeNone
		lFlipObj.next_enterEnd.ease = Linear.easeNone

		lFlipObj.prev_currentStart.ease = Linear.easeNone
		lFlipObj.prev_currentEnd.ease = Linear.easeNone
		lFlipObj.prev_enterStart.ease = Linear.easeNone
		lFlipObj.prev_enterEnd.ease = Linear.easeNone

		//动画1

		lFlipObj.timeLine = new TimelineLite({paused: true});

		lFlipObj.timeLine.to(p1, 0, lFlipObj.next_currentStart)
		lFlipObj.timeLine.to(p1, 1, lFlipObj.next_currentEnd)

		lFlipObj.timeLine.to(p2, 0, lFlipObj.next_enterStart, "-=" + 1)
		lFlipObj.timeLine.to(p2, 1, lFlipObj.next_enterEnd, "-=" + 1)

		//动画2

		lFlipObj.timeLine2 = new TimelineLite({paused: true});

		lFlipObj.timeLine2.to(p1, 0, lFlipObj.prev_enterEnd)
		lFlipObj.timeLine2.to(p1, 1, lFlipObj.prev_enterStart)

		lFlipObj.timeLine2.to(p2, 0, lFlipObj.prev_currentEnd, "-=" + 1)
		lFlipObj.timeLine2.to(p2, 1, lFlipObj.prev_currentStart, "-=" + 1)

		//jumpAni
		//留下p1
		lFlipObj.jump = new TimelineLite({paused: true});
		
		lFlipObj.jump.to(p2, 0, lFlipObj.next_currentStart)
		lFlipObj.jump.to(p2, 1, lFlipObj.next_currentEnd)

		lFlipObj.jump.to(p1, 0, lFlipObj.next_enterStart, "-=" + 1)
		lFlipObj.jump.to(p1, 1, lFlipObj.next_enterEnd, "-=" + 1)

		lFlipObj.jump2 = new TimelineLite({paused: true});
		
		lFlipObj.jump2.to(p2, 0, lFlipObj.prev_currentStart)
		lFlipObj.jump2.to(p2, 1, lFlipObj.prev_currentEnd)

		lFlipObj.jump2.to(p1, 0, lFlipObj.prev_enterStart, "-=" + 1)
		lFlipObj.jump2.to(p1, 1, lFlipObj.prev_enterEnd, "-=" + 1)

		lFlipObj.lastPagePoint = -1

		lFlipObj.setCurPagePoint(0)
		lFlipObj.timeLine.render(0)
		indexOrder()
	}

	return lFlipObj
}