/**
 * 填充颜色
 * @param {Object} canvas
 * @param {Object} color
 * @param {Object} x
 * @param {Object} y
 * @param {Object} w
 * @param {Object} h
 */
function lFillColor(canvas,color,x,y,w,h)
{
	var ctx=canvas.getContext("2d");
	ctx.fillStyle=color;
	ctx.fillRect(x,y,w,h);
}

lCanvasUtils={}
lCanvasUtils.tmpCanvas = document.createElement('canvas');
lCanvasUtils.tmpCtx = lCanvasUtils.tmpCanvas.getContext('2d');

/**
 * 创建imgDate
 * @param {Object} w
 * @param {Object} h
 */
function lCreateImageData (w, h) {
	return lCanvasUtils.tmpCtx.createImageData(w, h);
};

/**
 * 调整imgDate的透明度
 * @param {Object} data
 * @param {Object} alpha
 */
function lSetImgDateAlpha (pixels,alpha) {
	if(alpha==undefined) alpha=1
	var output = lCreateImageData(pixels.width,pixels.height)
	var dst = output.data;
	var d = pixels.data;
	for (var i=0; i<d.length; i+=4) {
		dst[i] = d[i];
		dst[i+1] = d[i+1];
		dst[i+2] = d[i+2];
		dst[i+3] = d[i+3]*alpha;
	}
	return output;
}


function lFillText (uSpan,cvs,removeSpan) {
	if(removeSpan==undefined) removeSpan=false
	
	var tSpan = lSpan(uSpan.innerHTML)
	tSpan.style.cssText = uSpan.style.cssText
	
	var text = tSpan.innerHTML
	var tTxt=""
	for (var i = 0; i < text.length; i++) {
		tTxt+="<span>"+text[i]+"</span>"
	}
	
	tSpan.innerHTML = tTxt
	TweenMax.to(tSpan,0,{alpha:0})
	document.body.appendChild(tSpan)
	
	if(tSpan.style.left==undefined){var x = 0}else{var x = parseInt(tSpan.style.left)}
	if(tSpan.style.top==undefined){var y = 0}else{var y = parseInt(tSpan.style.top)}
	if(tSpan.style.fontSize==undefined){var size = 0}else{var size = parseInt(tSpan.style.fontSize)}
	if(tSpan.style.color==undefined){var color = 0}else{var color = tSpan.style.color}
	if(tSpan.style.fontFamily==undefined){var fontFamily = 0}else{var fontFamily = tSpan.style.fontFamily}
	if(tSpan.style.fontWeight==undefined){var fontWeight = "normal"}else{var fontWeight = tSpan.style.fontWeight}
	
	var c2d=cvs.getContext("2d")
	
	c2d.font=fontWeight+" "+lCheckUnit(size)+" "+fontFamily
	c2d.fillStyle=color
	
	var tx
	var ty
	var spanX=tSpan.offsetLeft
	var spanY=tSpan.offsetTop
	
	for (var i = 0; i < tSpan.childNodes.length; i++) {
		tx = tSpan.childNodes[i].offsetLeft
		ty = tSpan.childNodes[i].offsetTop
		//console.log(tx,ty);
		c2d.fillText(tSpan.childNodes[i].innerHTML,tx+spanX,ty+size+spanY);
	}
	
	lRemoveChild(tSpan)
	tSpan.innerHTML=""
	
	if(removeSpan==true)
	{
		lRemoveChild(uSpan)
		uSpan.innerHTML=""
	}
}

function lCvsImg(img,onComplete,p,x,y){
	//console.log("lCvsImg");
	if(img["localName"]=="img")
	{
		if(img.src=="" || img.complete==false)
		{
			//console.log(11111111111);
			img.addEventListener("load",onLoad)
		}else{
			//console.log(22222);
			onLoad ()
		}
	}else if(typeof(img) == "string"){
		var tSrc = img
		
		//解决bug不触发onload及安卓 'broken' state.
		if(tSrc.indexOf(".")!=-1)
		{
			if(tSrc.indexOf("?")==-1)
			{
				tSrc+="?rtime="+Math.random()
			}else{
				tSrc+="&rtime="+Math.random()
			}
		}
		
		img = lImg(undefined,p,x,y)
		
		//iphone地址是base64的时候设置crossOrigin会导致：不触发load，并且图片宽高都为0
		if(tSrc.indexOf("data:image")==-1)
		{
			//console.log("anonymous");
			img.crossOrigin = "anonymous"
		}
		
		
		img.src=tSrc
		img.addEventListener("load",onLoad)
		
		//console.log("img.complete",img.complete,tSrc);
		
		//解决不触发onload的bug
		var timerEf = lTimesEf(function () {
			//console.log(onloadF,img.src,img.complete);
			if(img.complete==true)
			{
				//console.log("timerEf_1");
				onLoad ()
			}
		},0.1,10)
		timerEf.start()
		
	}else{
		onLoad ()
	}
	
	function onLoad () {
		if(timerEf!=undefined) timerEf.stop()
		//console.log("onLoad");
		try{
			img.removeEventListener("load",onLoad)
		}catch(e){
			
		}
		
		
		TweenMax.delayedCall(0.01,function () {
		    if(onComplete!=undefined) onComplete(img)
		})
	}
	
	//console.log(img);
	return img
}

/**
 * 图片拉伸旋转并绘制到cvs
 * @param {Object} cvs	
 * @param {Object} img
 * @param {Number} x	位置
 * @param {Number} y
 * @param {object} param	参数
 * @p-config {Number} tW	宽高
 * @p-config {Number} tH
 * @p-config {Number} cPX	中心点百分比
 * @p-config {Number} cPY
 * @p-config {Number} tR	角度
 * @p-config {Number} tScaleX	拉伸
 * @p-config {Number} tScaleY
 * @p-config {Function} onComplete	完成时
 */
function lDrawImage (cvs,timg,x,y,param) {
	
	if(param==undefined) param={}
	
	if(param.cPX==undefined) param.cPX=0.5
	if(param.cPY==undefined) param.cPY=0.5
	if(param.tR==undefined) param.tR=0
	if(param.tScaleX==undefined) param.tScaleX=1
	if(param.tScaleY==undefined) param.tScaleY=1
	
	if(x==undefined) x=0
	if(y==undefined) y=0
	var cPX=param.cPX
	var cPY=param.cPY
	var tR=param.tR
	var tScaleX=param.tScaleX
	var tScaleY=param.tScaleY
	
	//console.log(param);
	var img = lCvsImg(timg,onLoad)
	
	function onLoad (img) {
		//console.log(img);
		if(param.tW==undefined) param.tW=img.width
		if(param.tH==undefined) param.tH=img.height
		
		var imgW = img.width
		var imgH = img.height
		
		//lDebug.log("lDrawImage",imgW,imgH)
		
		var ctx1 = cvs.getContext("2d")
		var xpos = imgW*cPX
		var ypos = imgH*cPY
		try{
			
			ctx1.save();
			ctx1.translate(x, y);
			ctx1.translate(xpos, ypos);
			ctx1.rotate(tR * Math.PI / 180);//旋转47度
			ctx1.scale(tScaleX,tScaleY);//旋转47度
			ctx1.translate(-xpos, -ypos);
			ctx1.drawImage(img, 0, 0,param.tW,param.tH);
			ctx1.restore();
		}catch(e){
			lDebug.log(e)
		}
		
		if(param.onComplete!=undefined) param.onComplete()
	}
	
	
}

/**
 * 将canvas的alpha通道拷贝到指定canvas（设置遮罩）
 */
function lCopyAlphaChannelToCanvas(oCanvas, alphaCanvas) {

	var oCanvasData = oCanvas.getContext("2d").getImageData(0, 0, oCanvas.width, oCanvas.height)
	var alphaCanvasData = alphaCanvas.getContext("2d").getImageData(0, 0, oCanvas.width, oCanvas.height)

	for (var i = 0; i < oCanvasData.data.length; i += 4) {
		oCanvasData.data[i + 3] = alphaCanvasData.data[i + 3]
			//console.log(i)
	}
	oCanvas.getContext("2d").putImageData(oCanvasData, 0, 0);
}

/**
 * 克隆cvs
 * @param {Object} cvs
 * @param {Object} left
 * @param {Object} top
 */
function lCloneCvs (cvs,p,left,top) {
	var newCvs = lCanvas(p,left,top,cvs.width,cvs.height)
	newCvs.c2d.putImageData(cvs.getContext("2d").getImageData(0, 0, cvs.width, cvs.height),0,0)
	return newCvs
}

//根据图片轮廓填充颜色
function lFillColorByImg (cvs,color,img) {
	cvs.c2d.save();
	cvs.c2d.globalCompositeOperation="source-over"  
	cvs.c2d.fillStyle=color;
	cvs.c2d.fillRect(0,0,cvs.width,cvs.height);
	cvs.c2d.globalCompositeOperation="destination-in"  
	cvs.c2d.drawImage(img,0,0)
	cvs.c2d.restore();
}
/**
 * 
	var data = lTintColor(cvs.c2d.getImageData(0,0,333,333),"#ff0000",0.5)
	cvs.c2d.putImageData(data,0,0)
 */
function lTintColor (pixels,color,alpha) {
	if(alpha==undefined) alpha=1
	var rgb = lHex2rgb(color)
	
	var output = lCreateImageData(pixels.width, pixels.height);
	var w = pixels.width;
	var h = pixels.height;
	var dst = output.data;
	var d = pixels.data;
	
	for (var i=0; i<d.length; i+=4) {
		dst[i] = d[i]+(rgb.r -d[i])*alpha;
		dst[i+1] = d[i+1]+(rgb.g-d[i+1])*alpha;
		dst[i+2] = d[i+2]+(rgb.b-d[i+2])*alpha;
		dst[i+3] = d[i+3];
	}
	return output;
}

/**
 * 提取img中的图像数据
 * @param	{object} img	传入图片或是图片路径
 * @param	{object} parent	父级
 * @param	{number} left	left值
 * @param	{number} top	top值
 * @param	{Function} onComplete	当结束时
 * @param	{object}    param	参数
 * @p-config    {number}    cw	canvas宽
 * @p-config    {number}    ch	canvas高
 * @p-config    {number}    dx	drawImage x
 * @p-config    {number}    dy	drawImage y
 * @p-config    {number}    dw	drawImage 宽
 * @p-config    {number}    dh	drawImage 高
 * @p-config    {number}    onComplete	当绘图完成时
 */
function lImgToCanvas(img,parent,left,top,onComplete,param) {
	var cvsImg = lCvsImg(img,onLoad)
	var canvas = lCanvas(parent,left,top)
	function onLoad () {
		canvas.width = cvsImg.width
		canvas.height = cvsImg.height
		
		if(param==undefined) param={}
		if(onComplete!=undefined){
			param.onComplete=function () {
				onComplete()
			}
		}
		
		lDrawImage(canvas,img,0,0,param)
	}
	
	return canvas
}