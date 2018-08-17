
/**
 * 音乐控制动画
 * 
var musicCtrl = lMusicCtrl()
parent.appendChild(musicCtrl)

musicCtrl.style.cursor="pointer";
$(musicCtrl).click(function () {
	if(musicCtrl.isPlay)
	{
		musicCtrl.stopAni()
	}else{
		musicCtrl.startAni()
	}
	
})

 * @param {number} lineNum	线数量
 * @param {number} lineD	线间隔
 * @param {number} lineW	线宽度
 * @param {number} lineMaxH	线最高高度
 * @param {number} lineMinH	线最低高度
 * @param {number} color	线颜色
 * @param {number} tweenTime	变换时间
 * @param {number} speed	变换速度
 */
function lMusicCtrl(lineNum,lineD,lineW,lineMaxH,lineMinH,color,tweenTime,speed)
{
	var lineDiv=document.createElement("div")
	lineDiv.style.position="absolute";
	lineDiv.lineArr=[]
	lineDiv.lineNum=lineNum!=undefined?lineNum:4//线数量
	lineDiv.lineD=lineD!=undefined?lineD:4//线间隔
	lineDiv.lineW=lineW!=undefined?lineW:1//线宽度
	lineDiv.lineMaxH=lineMaxH!=undefined?lineMaxH:27//线最高高度
	lineDiv.lineMinH=lineMinH!=undefined?lineMinH:5//线最低高度
	lineDiv.color=color!=undefined?color:"#ffffff"//线颜色
	lineDiv.tweenTime=tweenTime!=undefined?tweenTime:0.5//变换时间
	lineDiv.speed=speed!=undefined?speed:10//变换速度
	
	lineDiv.isPlay=false//是否在播放状态
	lineDiv.setInterval
	
	lineDiv.style.width=lineDiv.lineNum*lineDiv.lineD+"px"
	lineDiv.style.height=lineDiv.lineMaxH+"px"
	lineDiv.style.background="rgba(255,0,0,0)"
	
	for (var i = 0; i < lineDiv.lineNum; i++) {
		var line = lDiv(lineDiv,lineDiv.lineD*i,0,lineDiv.lineW,lineDiv.lineMaxH,lineDiv.color)
		lineDiv.lineArr.push(line)
	}
	
	lineDiv.startAni=function () 
	{
		lineDiv.isPlay=true
		clearInterval(lineDiv.setInterval)
		lineDiv.setInterval=setInterval(function () {
			TweenMax.to(lineDiv.lineArr[parseInt(lineDiv.lineArr.length*Math.random())],lineDiv.tweenTime/2+(lineDiv.tweenTime/2)*Math.random(),{scaleY:Math.random(),transformOrigin:"0% 100%"})
		},lineDiv.speed)
	}
	
	lineDiv.stopAni=function () 
	{
		lineDiv.isPlay=false
		clearInterval(lineDiv.setInterval)
		
		for (var i = 0; i < lineDiv.lineArr.length; i++) {
			TweenMax.to(lineDiv.lineArr[i],0.3,{scaleY:lineDiv.lineMinH/lineDiv.lineMaxH,transformOrigin:"50% 100%"})
		}
	}
	lineDiv.stopAni()
	return lineDiv
}