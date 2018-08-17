var wx_shareUrl = "https://artisans.net.cn/p/kindle";//首页

$(window).ready(function () {
	/*
	try{
		var share = window.PROJECT.wechatShare;
		share.set('appmessage', 'title', "我想对你说的话已被#穿阅情报局#成功加密");
		share.set('appmessage', 'desc', "也许话里有话？");
		share.set('timeline', 'title', "我想对你说的话已被#穿阅情报局#成功加密");
		share.set('appmessage', 'img_url', window.PROJECT.cdn+"img/share.jpg");
		share.set('timeline', 'img_url', window.PROJECT.cdn+"img/share.jpg");
		share.set('appmessage', 'link', wx_shareUrl);
		share.set('timeline', 'link', wx_shareUrl);
		share.update()//更新分享内容
	}catch(e){
		
	}
	*/
})


/*
var wx_curUrl = location.href.split('#')[0];

var wx_debug=false
if(urlObj.wxdebug==1){wx_debug=true}

var wx_serverUrl='http://campaign.zyleague.com/weixin_oauth2_lzy/weixin_config.php'
var wx_apiList=['checkJsApi','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ',
'onMenuShareWeibo','onMenuShareQZone','hideMenuItems','showMenuItems','hideAllNonBaseMenuItem',
'showAllNonBaseMenuItem','translateVoice','startRecord','stopRecord','onVoiceRecordEnd',
'playVoice','onVoicePlayEnd','pauseVoice','stopVoice','uploadVoice','downloadVoice',
'chooseImage','previewImage','uploadImage','downloadImage','getNetworkType','openLocation',
'getLocation','hideOptionMenu','showOptionMenu','closeWindow','scanQRCode','chooseWXPay',
'openProductSpecificView','addCard','chooseCard','openCard','getLocalImgData']


//分享图片不能使用相对链接
var wx_sharePic = imgPath+"share.jpg";//分享图片

var shareCArr=[
	{pyq:"我想对你说的话已被#穿阅情报局#成功加密",pyT:"我想对你说的话已被#穿阅情报局#成功加密",pyD:"也许话里有话？"}
]

var shareC = lRandomOne(shareCArr)

var wx_pyqTitle=shareC.pyq//朋友圈
var wx_pyTitle=shareC.pyT//朋友标题
var wx_pyDesc=shareC.pyD//朋友内容

console.log(shareC.pyq);
console.log(shareC.pyT);
console.log(shareC.pyD);
console.log(wx_shareUrl);
console.log(wx_sharePic);

function onWxPyCom () {
	if(lFw.track) lFw.track("朋友分享成功")
}
function onWxPyqCom () {
	if(lFw.track) lFw.track("朋友圈分享成功")
}

if(window["wx"])
{
	wx_jssdkInit ()
}

function wx_jssdkInit () {
	$.ajax({
		type:'post',
		url:wx_serverUrl,
		data:{url:wx_curUrl},
		dataType:'json',
		success:function(data){
			console.log("jssdk：授权成功",JSON.stringify(data))
			
			wx.config({
				debug:wx_debug,
				appId:data.appid,
				timestamp:data.timestamp,
				nonceStr:data.noncestr,
				signature:data.signature,
				url:wx_curUrl,
				jsApiList:wx_apiList
			});
			wx.error(function(res){
				console.log("jssdk：error_res",JSON.stringify(res))
			    //config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
			});
			
			wx.checkJsApi({
				success: function(res){
					console.log("jssdk：checkJsApi_res",JSON.stringify(res))
					if (!res["errMsg"]=="checkJsApi:ok")
					{
						console.log("jssdk：您的微信版本太低，请升级到最新版本微信",JSON.stringify(res))
						//alert('您的微信版本太低，请升级到最新版本微信!');	
					}else{
						console.log("jssdk：版本支持",JSON.stringify(res))
						//alert('版本支持');
					}
				},
				fail:function (res) {
					console.log("jssdk：checkJsApi_fail_res",JSON.stringify(res))
				},
				complete:function (res) {
					console.log("jssdk：heckJsApi_complete_res",JSON.stringify(res))
				}
			});
			wx.ready(function(){
				//alert("微信JS可以使用");
				console.log("jssdk：微信JS可以使用")

				wxSetShareCopy (wx_pyTitle,wx_pyDesc,wx_pyqTitle,wx_shareUrl,wx_sharePic)
				
			});
		},
		
	});
}

function wxSetShareCopy (wxPyT,wxPyD,wxPyqT,wxUrl,wxPic) {
	console.log("jssdk：设置分享",wxPyT,wxPyD,wxPyqT,wxUrl,wxPic);
	wx.onMenuShareTimeline({
		title:wxPyqT, // 分享标题
		link:wxUrl, // 分享链接
		imgUrl:wxPic, // 分享图标
		success:function(){
			//alert("分享朋友圈成功");
			onWxPyqCom()
		},
		cancel:function(){ 
			//alert("分享朋友圈失败");
		},
		fail:function (res) {
			console.log("jssdk：onMenuShareTimeline_fail_res",JSON.stringify(res))
		},
		complete:function (res) {
			console.log("jssdk：onMenuShareTimeline_com_res",JSON.stringify(res))
		}
	});
	wx.onMenuShareAppMessage({
		title: wxPyT, // 分享标题
		desc: wxPyD, // 分享描述
		link: wxUrl, // 分享链接
		imgUrl: wxPic, // 分享图标
		type: 'link', // 分享类型,music、video或link，不填默认为link
		dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		success: function () { 
			//alert("分享好友成功");
			onWxPyCom()
		},
		cancel: function () { 
			//alert("分享好友失败");
		},
		fail:function (res) {
			console.log("jssdk：onMenuShareAppMessage_fail_res",JSON.stringify(res))
		},
		complete:function (res) {
			console.log("jssdk：onMenuShareAppMessage_com_res",JSON.stringify(res))
		}
	});
}*/