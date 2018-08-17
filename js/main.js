$(window).ready(function () {
	
	var bodyColor="#040932"
	var pageColor="#040932"
	document.body.style.background = bodyColor
	
	var maxH=1240
	var minH=940
	lFw.maxH=maxH
	lFw.minH=minH
	
	//主div---------------------------------------
	var mainDiv = lDiv(document.body, 0, 0, 640, maxH)
	mainDiv.style.overflow = "hidden"
	lFw.mainDiv=mainDiv
	
	//页面---------------------------------------
	var pageDiv=lDiv(mainDiv,0,0)

	//解决Howl播放问题
	lFw.initHowl()
	
	//音乐控制---------------------------------------
	var mCtrl = lFw.music(mainDiv,589+7,10,"#fff")
	mCtrl.autoPlay()
	
	//pop---------------------------------------
	var popDiv = lPop(mainDiv)
	popDiv.black.style.background="none"
	
	//分享---------------------------------------
	//var sharePopDiv = lPop(mainDiv)
	//var shareDiv = lFw.addSharePage(sharePopDiv)
	//sharePopDiv.openPop("share","tra")
	
	//文字弹窗---------------------------------------
	var txtPop = lFw.addTextPop(mainDiv)
	//txtPop.showText("测试文案")
	//txtPop.showErrText("提交错误","错误1")
	
	//loading---------------------------------------
	/*var lloading = lLoading(mainDiv,640)
	lloading.style1()
	
	lloading.bgDiv.style.background="rgba(0,0,0,0.4)"//背景色
	lloading.circle.shape.style.stroke = "#f03d80"//圆圈颜色
	lloading.circle.bgShape.style.stroke = "#980c3e"//圆圈底色
	lFw.lloading = lloading
	lloading.showLoading()//显示loading
	*/
	
	mainDiv.appendChild(window.debugDiv)
	
	
	var base64Coder = new Base64();
	
	var result = base64Coder.encode("愿你生命中<br/>有够多的云翳<br/>来造成一个<br/>美丽的黄昏");
	console.log(result);
	var result2 = base64Coder.decode(result);
	console.log(result2);

	

	
	//横屏提示---------------------------------------
	lFw.initOTip()
	
	//openid
	/*var storageOpenid=localStorage.getItem("vox_openid")
	if(lIsLAN()==false && storageOpenid!=decodeURIComponent(urlObj.openid))
	{
		window.location.href="http://www.voxverbi.com/weixin_oauth/index.php?pid=eba01ddc054ddf7bc25152c074c732f7";
	}
	
	if(urlObj.openid==undefined){
		
		urlObj.openid="91g1g2+bxUn7dQduJ3csevYEKLn6Z3hNjFM4f4J6A3SPCPNLz6QIAcwAhCIcaNxwShSxVLlS6ouGWHJPKFzhaT3q9dWloUsuCBv9KxUbt9LY8Z3LfxXYmn0CdTCSN2Q0"
	}
	localStorage.setItem("vox_cur_openid",urlObj.openid)
	
	*/
	
	//var ef00 = new Howl({src: [imgPath+"ef00.mp3"],autoplay: false,loop: false,volume: 0.5});
	var ef00 = lAudio(imgPath+"ef00.mp3")
	//var ef01 = new Howl({src: [imgPath+"ef01.mp3"],autoplay: false,loop: false,volume: 1});
	var ef02 = new Howl({src: [imgPath+"ef02.mp3"],autoplay: false,loop: false,volume: 0.3});
	var ef03 = new Howl({src: [imgPath+"ef03.mp3"],autoplay: false,loop: false,volume: 0.2});
	
	
	var copyArr = [
		{
			xq:"聚起来",
			copyArr:[
				{copy:"只有思念的人能相聚",z:"安东尼•德•圣-埃克苏佩里《小王子》"},
				{copy:"宇宙正在倾斜<br/>所以大家渴望相识",z:"谷川俊太郎《二十亿光年的孤独》"},
				{copy:"这世界最美的风景<br/>是一个个活出<br/>各自模样和体系的人",z:"蔡崇达《皮囊》"}
			]
		},
		{
			xq:"保重啊",
			copyArr:[
				{copy:"来了，爱了<br/>给了她一颗星星<br/>走了",z:"刘慈欣《三体全集》"},
				{copy:"走得突然<br/>我们来不及告别<br/>这样也好，因为我们永远不告别",z:"三毛《我的宝贝》"},
				{copy:"走过山重水复的流年<br/>笑看风尘起落的人间",z:"白落梅《你若安好 便是晴天》"}
			]
		},
		{
			xq:"爱你",
			copyArr:[
				{copy:"此时此刻的云<br/>二十来岁的你",z:"冯唐《冯唐诗百首》"},
				{copy:"深深的话<br/>我们浅浅地说<br/>长长的路<br/>我们慢慢地走",z:"毕淑敏《恰到好处的幸福》"},
				{copy:"我看到了你<br/>方才知道<br/>我为什么来到了<br/>这个世界",z:"纪伯伦《纪伯伦全集：泪与笑》"}
			]
		},
		{
			xq:"我好想你",
			copyArr:[
				{copy:"我明白你会来<br/>所以我等",z:"沈从文《沈从文小说全集》"},
				{copy:"你再不来<br/>我要下雪了",z:"木心《云雀叫了一整天》"},
				{copy:"每想你一次<br/>天上飘落一粒沙<br/>从此形成了撒哈拉!",z:"三毛《撒哈拉的故事》"}
			]
		},
		{
			xq:"比心",
			copyArr:[
				{copy:"你不是我<br/>却又像<br/>世界上的另一个我",z:"克莉丝汀•汉娜《萤火虫小巷》"},
				{copy:"当我走向你的时候<br/>我原想收获一缕春风<br/>你却给了我整个春天",z:"汪国真《汪国真诗精编》"},
				{copy:"最是那一低头的温柔<br/>像一朵水莲花<br/>不胜凉风的娇羞",z:"徐志摩《志摩的诗》"}
			]
		},
		{
			xq:"确认过眼神",
			copyArr:[
				{copy:"不须耳鬓常厮伴<br/>一笑低头意已倾",z:"朱生豪《朱生豪情书集》"},
				{copy:"我跑到生命尽头看了看<br/>看到我们<br/>果然白头偕老了",z:"加•泽文《玛格丽特小镇》"},
				{copy:"我看到那些岁月<br/>如何奔驰<br/>挨过了冬季<br/>便迎来了春天",z:"梭罗《瓦尔登湖》"}
			]
		},
		{
			xq:"今天也要开心呀",
			copyArr:[
				{copy:"我们都会上岸<br/>阳光万里<br/>去哪里都是鲜花开放",z:"张嘉佳《从你的全世界路过》"},
				{copy:"当你在我身旁时<br/>我感到百花齐放<br/>鸟唱蝉鸣",z:"夏洛蒂•勃朗《简•爱》"},
				{copy:"我好久没有<br/>以小步紧跑<br/>去迎接一个人的<br/>那种快乐了",z:"木心《琼美卡随想录》"}
			]
		},
		{
			xq:"对不起",
			copyArr:[
				{copy:"你如果认识从前的我<br/>也许你会原谅现在的我",z:"张爱玲《倾城之恋》"},
				{copy:"你是我种下的前因<br/>我又是谁的果报",z:"林徽因《你是人间四月天》"},
				{copy:"如果一开始<br/>就是一种错误<br/>那么为什么<br/>它会错的那样美丽",z:"席慕蓉《席慕蓉散文》"}
			]
		},
		{
			xq:"举高高",
			copyArr:[
				{copy:"愿你生命中<br/>有够多的云翳<br/>来造成一个<br/>美丽的黄昏",z:"冰心《冰心散文精选》"},
				{copy:"要坚强，要勇敢<br/>不要让<br/>绝望和无休止的苦恼<br/>压倒了你",z:"亚米契斯《爱的教育》"},
				{copy:"只有用水<br/>将心上的雾气淘洗干净<br/>荣光才会照亮<br/>最初的梦想",z:"加西亚•马尔克斯《百年孤独》"}
			]
		},
		{
			xq:"来抱抱",
			copyArr:[
				{copy:"黑暗中<br/>他们温柔相待<br/>似乎明白彼此的脆弱<br/>和不堪一击",z:"伍绮诗《无声告白》"},
				{copy:"你将看到我的疤痕<br/>知道我曾经受伤<br/>也曾经痊愈",z:"泰戈尔《飞鸟集》"},
				{copy:"去向世界<br/>发出我们的声音<br/>我一个人是不敢的<br/>有了你，我就敢",z:"王小波《爱你就像爱生命》"}
			]
		},
		{
			xq:"为你打call",
			copyArr:[
				{copy:"勇敢是，当你还未开始<br/>就已知道自己会输<br/>可你依然要去做<br/>而且无论如何<br/>都要把它坚持到底。",z:"哈珀•李《杀死一只知更鸟》"},
				{copy:"浇灌这些天赋的<br/>是不断的无休止的<br/>好奇心<br/>以及对挑战的探寻",z:"卡罗尔•德韦克《终身成长》"},
				{copy:"世上只有一种英雄主义<br/>就是在<br/>认清生活真相之后<br/>依然热爱生活",z:"罗曼·罗兰《巨人三传》"}
			]
		},
		{
			xq:"笑而不语",
			copyArr:[
				{copy:"心中渐渐有一分明白<br/>如月光泻地",z:"龙应台《目送》"},
				{copy:"要知道<br/>每一颗钻石在被发现前<br/>都要经受<br/>埋藏尘埃的寂寞时光",z:"毕淑敏《非洲三万里》"},
				{copy:"从话语中<br/>你很少能学到人性<br/>从沉默中却能",z:"王小波《沉默的大多数 (王小波集) 》"}
			]
		},
		{
			xq:"请开始你的表演",
			copyArr:[
				{copy:"每一个灵魂都是独特的<br/>都有各自的美德和过错",z:"克莱儿·麦克福尔《摆渡人》"},
				{copy:"每个人身上都藏着<br/>一个不满足的苏格拉底",z:"周国平《灵魂只能独行 (周国平经典散文)》"},
				{copy:"别人耍小聪明的时候<br/>我们就装傻<br/>直到他们吐露真相",z:"丁丁张《人生需要揭穿》"}
			]
		},
		{
			xq:"当然是选择原谅你啊",
			copyArr:[
				{copy:"我千百次想过要离开你<br/>但仅凭一己之力<br/>我做不到",z:"马克•李维《偷影子的人》"},
				{copy:"打是疼骂是爱<br/>事后把一切当成笑话<br/>和解多么省事",z:"严歌苓《小姨多鹤》"},
				{copy:"一个人<br/>越是有许多事情<br/>能够放得下<br/>他越是富有",z:"梭罗《瓦尔登湖》"}
			]
		},
		{
			xq:"冷漠.jpg",
			copyArr:[
				{copy:"冷漠和淡薄<br/>是对不喜欢的人和事<br/>最有力的反击。",z:"刘同《你的孤独，虽败犹荣》"},
				{copy:"原来人世冷暖<br/>只如盲人摸象",z:"独木舟《我亦飘零久》"},
				{copy:"在古代，力量来自<br/>有权获得资料<br/>而到今天，力量却<br/>来自于该忽略什么",z:"尤瓦尔•赫拉利《未来简史》"}
			]
		}
	]
	
	//loading---------------------------------------
	var loading = lDiv(pageDiv,0,0,640,maxH,pageColor)
	
	var loadDiv = lDiv(loading,0,0,640,maxH)

	/*
	var btn = lDiv(mainDiv,0,0,111,311,"rgba(255,0,0,0.5)")
	copy("asdfasdf")
	function copy(invite_code) {
	    var text = document.createElement("input");
	    text.id = 'webcopyinput';
	    text.value = invite_code;
	    text.style.position = 'fixed';
	    text.style.top = '0px';
	    document.body.appendChild(text);
	    var copied = false;
	    console.log("Copy Init");
	    var copyEvent = function () {
	            text.focus();//给input输入框聚焦
	            text.setSelectionRange(0, text.value.length);//设置input框选中的范围
	            copied = document.execCommand('Copy');//执行复制操作
	            text.blur();
	            copied=false;
	            console.log(copied);
	    }
	    btn.addEventListener('touchstart', copyEvent, true);
	}*/
	
	var lastLoadP=0
	//多重加载
	var multiLoad= lMultiLoad([1,0.3],function(p,p2) {
		if(parseInt(p*10)!=lastLoadP)
		{
			lastLoadP = parseInt(p*10)
			console.log(p,p2,multiLoad.pArr);
		}
		
		loadSp.innerHTML=parseInt(p*100)+"%"
	},function() {
		//加载完成
		lc.stop()
		TweenMax.to(lc,0.3,{autoAlpha:0})
		TweenMax.to(loadSp,0.3,{autoAlpha:0})
		
		if(lFlipObj.curPageId==0)
		{
			lFlipObj.turnToPage(1)
		}
		if(lFlipObj.curPageId==1)
		{
			console.log("p1tl3.play()");
			p1tl3.play()
		}else if(lFlipObj.curPageId==5)
		{
			
			p5playAni()
		}
	})
	
	//最短加载时间
	var loadMinTime={num:0,time:1.5}
	if(urlObj.debug==true) loadMinTime.time=0.1
	TweenMax.to(loadMinTime,loadMinTime.time,{num:1,onUpdate:onUpdate,ease:Power0.easeNone})
	function onUpdate () {
		//console.log(obj.num)
		multiLoad.setP(1,loadMinTime.num)
	}
	
	//主页面加载
	lImgLoaderInfo.onLoad=function (p,i,t) 
	{
		var tP = 1//加载比例
		//根据加载比例计算新的加载进度
		var p = i/(lImgLoaderInfo.totalNum*tP)
		p=lNumRange(p,0,1)
		
		multiLoad.setP(0,p)
	}

	
	loading.playAni=function () {
		
	}
	loading.stopAni=function () {
		
	}
	
	//p1==================================================================
	var p1 = lDiv(pageDiv,0,0,640,maxH,pageColor)
	p1.aniArr=[]
	
	//var ass001 = lImg(imgPath+"ass001.jpg",p1,0,0)
	var p1bg = lDiv(p1,0,0,640,1240)
	var p001 = lImg(imgPath+"p001.jpg",p1bg,0,-50)
	
	var p018 = lImg(imgPath+"p006.png",p1bg,214,116,252,227)
	var p018c1 = lImg(imgPath+"p006.png",p1bg,214,116,252,227)
	var p018c2 = lImg(imgPath+"p006.png",p1bg,214,116,252,227)
	var p018c3 = lImg(imgPath+"p006.png",p1bg,214,116,252,227)
	
	var p007 = lImg(imgPath+"p007.png",p1bg,10,38,73,72)
	var p007c1 = lImg(imgPath+"p007.png",p1bg,537,348,73,72)
	var p007c2 = lImg(imgPath+"p007.png",p1bg,65,346,73,72)
	var p007c3 = lImg(imgPath+"p007.png",p1bg,295,305,73,72)
	var p007c4 = lImg(imgPath+"p007.png",p1bg,337,121,73,72)
	
	var p002 = lDiv(p1,0,843,640)
	var p002Img = lImg(imgPath+"p002.png",p002,0,0,640/0.3)
	var p010 = lImg(imgPath+"p010.jpg",p1,0,0)
	var p1d1 = lDiv(p1,0,0,640,1240)
	var p003 = lImg(imgPath+"p003.png",p1d1,0,909,640,404)
	var p004 = lImg(imgPath+"p004.png",p1d1,135,658,338,317)
	var p005 = lImg(imgPath+"p005.png",p1d1,293,857,78/0.1,915)
	var p009d = lDiv(p1d1,346,876,489*0.03,704*0.03)
	//var p009 = lImg(imgPath+"p009.png",p009d,0,0,489*0.03)
	var p009 = lImg(imgPath+"p009.png",p009d,0,0,489)
	//var p008 = lImg(imgPath+"p008.png",p009d,0,0,489*0.03)
	var p008 = lImg(imgPath+"p008.png",p009d,0,0,489)
	TweenMax.to(p008,0,{scale:0.03,transformOrigin:"0% 0%"})
	TweenMax.to(p009,0,{x:5,scale:0.03,transformOrigin:"0% 0%"})
	TweenMax.to(p005,0,{scale:0.1,transformOrigin:"0% 0%"})
	TweenMax.to(p002Img,0,{scale:0.3,transformOrigin:"0% 0%"})
	
	var p055 = lDiv(p1,0,360,640,395)
	var p055sp = lSpan("阅读的人<br/>总能从字里行间阅见深意<br/>Kindle穿“阅”情报局<br/>用书语加密心意<br/>那些想说的话<br/>让Kindle为你传递",p055,0,0,34,"#fff","newF")
	p055sp.style.textAlign="center"
	p055sp.style.width="640px"
	p055sp.style.lineHeight="64px"//行距
	var p055_split = new SplitText(p055sp);
	//TweenMax.to(p055,0,{autoAlpha:0})
	
	var p011 = lImg(imgPath+"p011.png",mainDiv,196,104-20)
	var p012 = lImg(imgPath+"p012.png",mainDiv,294,1077,52,27)
	
	TweenMax.to(p009,0,{rotationX:0,rotationY:0})
	TweenMax.to(p009,0,{rotationX:-30,rotationY:50})
	
	var p056 = lImg(imgPath+"p056.png",mainDiv,320,0)
	TweenMax.to(p056,0,{x:"-50%",scale:0.3})
	
	var p056tl = new TimelineMax({repeat:-1,paused:true})
	p056tl.to(p056,1,{y:-30,ease:yoyoEaseInOut_pw2})
	p056tl.render(0)
	TweenMax.to(p056,0,{autoAlpha:0})
	
	
	//TweenMax.to(p004,0,{scale:0.169})
	//TweenMax.to(p005,0,{scale:0.04})\n
	
	var hmCtrlObj1 = new Hammer(p1);//注意：监听的mainDiv里包含的文字将不可选择
	hmCtrlObj1.get('swipe').set({ direction: Hammer.DIRECTION_ALL,velocity:0.1});

	
	
	lSetTransformOrigin ([p1bg,p002,p1d1],342+12,838+12)
	
	var p1ease = CustomEase.create("custom", "M0,0 C0.272,0 0.578,0.172 0.648,0.498 0.695,0.719 0.73,1 1,1")
	//console.log(p055_split);
	var p1tl3 = new TimelineMax({repeat:-0,paused:true})
	for (var i = 0; i < p055_split.lines.length; i++) {
		
		p1tl3.to(p055_split.lines[i],0,{autoAlpha:0,x:10,y:10,scale:0})
	}

	p1tl3.to(p010,0,{autoAlpha:0})
	p1tl3.to(p008,0,{autoAlpha:0})
	p1tl3.to(p1bg,0,{y:50})
	p1tl3.to([p1d1],0,{autoAlpha:0,y:200})
	p1tl3.to([p002],0,{autoAlpha:0,y:100})
	p1tl3.to([p1d1],3,{autoAlpha:1,y:0,ease:Power1.easeInOut})
	p1tl3.to([p002],3,{autoAlpha:1,y:0,ease:Power1.easeInOut},"-=3")
	p1tl3.to(p1bg,3,{y:0,ease:Power1.easeInOut},"-=3")
	
	p1tl3.to(p1bg,6,{scale:2,ease:p1ease,y:-200,onStart:p1tl3_f1})
	p1tl3.to([p002],6,{scale:3,ease:p1ease,y:-400},"-=6")
	p1tl3.to([p1d1],6,{scale:30,ease:p1ease,y:-1350,x:-20},"-=6")
	p1tl3.to([p002],6,{y:450,ease:p1ease},"-=6")
	p1tl3.to([p002],2,{})
	p1tl3.to([p009],2,{x:0,rotationX:0,rotationY:0,ease:Power1.easeInOut},"-=4")
	p1tl3.to([p005],2,{autoAlpha:0,ease:Power1.easeIn},"-=4")
	p1tl3.to(p008,1,{autoAlpha:1,ease:Power0.easeNone},"-=2")
	p1tl3.to(p009,0.3,{autoAlpha:0,ease:Power0.easeNone},"-=1")
	//p1tl3.to(p009,0.5,{})
	p1tl3.to(p008,1.5,{autoAlpha:0,ease:Power1.easeInOut})
	p1tl3.to(p010,1.5,{autoAlpha:1,ease:Power1.easeInOut},"-=1.5")
		
	p1tl3.staggerTo(p055_split.lines,1.5,{autoAlpha:1,x:0,y:0,scale:1,ease:Power1.easeOut},1)
	p1tl3.to(p009,0,{onComplete:p1tl3_f2})
	
	p1tl3.render(0)
	//p1tl3.play()
	//p1.aniArr.push(p1tl3)
	function p1tl3_f2 () {
		console.log("p1tl3_f2");
		if(lFlipObj.curPageId==1)
		{
			p056tl.play()
			p012.style.display="none"
			TweenMax.to(p056,0.3,{autoAlpha:1})
			//lFlipObj.turnToPage(2)
			
			hmCtrlObj1.on('swipeup', function(ev) 
			{
				p056tl.stop()
				lFlipObj.turnToPage(2)
				TweenMax.to(p056,0.3,{autoAlpha:0})
				//console.log("swipeup");
			});
			
		}
	}
	function p1tl3_f1 () {
		TweenMax.to([p018,p018c1,p018c2,p018c3],0.3,{autoAlpha:0})
		TweenMax.to([p007,p007c1,p007c2,p007c3,p007c4],0.3,{autoAlpha:0})
		TweenMax.delayedCall(0.3,function () {
		    p1tl.stop()
		    p1t2.stop()
		})
	}
	
	var lc = lLoadingCircle(p1,320,500,{color:"#abcada",bgColor:"#031d47"})
	lc.play()
	
	var loadSp=lSpan("0%",p1,320,545,22,"#fff")
	loadSp.style.width="100px"
	loadSp.style.textAlign="center"
	TweenMax.to(loadSp,0,{x:"-50%"})
	
	var p1tl=lPsEfByLayout([p018,p018c1,p018c2,p018c3],function (tl,img,i) {
		
		tl.to(img,0,{left:640,top:i*300-400,scale:lRandomRange(0.3,0.5),autoAlpha:lRandomRange(0.3,0.7)})
		tl.to(img,lRandomRange(2,3),{x:-800*1.2,y:700*1.2,ease:Power0.easeNone})
		tl.to(img,lRandomRange(1,3),{})
		
	},true)
	
	//p1tl.play()
	p1.aniArr.push(p1tl)
	
	var p1t2=lPsEfByLayout([p007,p007c1,p007c2,p007c3,p007c4],function (tl,img,i) {
		tl.to(img,0,{autoAlpha:0,scale:0})
		tl.to(img,lRandomRange(0.1,0.3),{})
		tl.to(img,1,{autoAlpha:1,scale:1,rotation:90*1.5,ease:Power2.easeIn,transformOrigin:"50% 50%"})
		tl.to(img,1,{autoAlpha:0,scale:0,rotation:180*1.5})
		
		tl.render(0)
		tl.timeScale(lRandomRange(0.8,1))
		
	},true)
	
	//p1t2.play()
	p1.aniArr.push(p1t2)
	
	lBtn(p012,function () {
	    lFw.track("跳过")
	    p1tl3.stop()
	    lFlipObj.turnToPage(2)
	})

	
	p1.playAni=function () {
		playPageAniArr(this)
		p012.style.display=""
	}
	p1.stopAni=function () {
		stopPageAniArr(this)
		
	}
	
	//p2======================================================================================
	var p2 = lDiv(pageDiv,0,0,640,maxH,pageColor)
	p2.aniArr=[]
	lImg(imgPath+"p010.jpg",p2,0,0)
	var p2bg = bgAni (p2)
	p2.aniArr.push(p2bg)
	var p012_2 = lImg(imgPath+"p012_2.png",p2,207,708,226,75)
	var p013 = lImg(imgPath+"p013.png",p2,64,533,512,91)
	var p014 = lImg(imgPath+"p014.png",p2,205,563,215,30)
	var p015 = lImg(imgPath+"p015.png",p2,167,365,306,77)
	
	var ip1 = lInput("",p2,104,559,30,"#fff")
	ip1.style.width=432+"px"
	ip1.style.textAlign="center"
	ip1.maxLength=10
	
	ip1.loadLS("kindleip1")
	if(ip1.value!="")
	{
		TweenMax.to(p014,0,{autoAlpha:0})
	}
	
	lDfIpCopy (ip1,"","",function (b) {
		if(b)
		{
			TweenMax.to(p014,0,{autoAlpha:0})
		}else{
			TweenMax.to(p014,0,{autoAlpha:1})
		}
	})
	
	lBtn(p012_2,function () {
	    lFw.track("确认")
	    if(ip1.value!="")
	    {
	    	ip1.saveLS("kindleip1")
	    	lFlipObj.turnToPage(3)
	    }else{
	    	txtPop.showText("请输入你的名字")
	    }
	})
	
	p2.playAni=function () {
	    playPageAniArr(this)
	    p012.style.display="none"
	}
	p2.stopAni=function () {
	    stopPageAniArr(this)
	    
	}
	
	//p3======================================================================================
	var p3 = lDiv(pageDiv,0,0,640,maxH,pageColor)
	p3.aniArr=[]
	lImg(imgPath+"p010.jpg",p3,0,0)
	var p3bg = bgAni (p3)
	p3.aniArr.push(p3bg)
	
	var p3d1 = lDiv(p3,0,0)
	var p016 = lImg(imgPath+"p016.png",p3d1,207,946,226,74)
	var p017 = lImg(imgPath+"p017.png",p3d1,180,861,276,17)
	//var p018 = lImg(imgPath+"p018.png",p3d1,285,215,69,28)
	//var p019 = lImg(imgPath+"p019.png",p3d1,151,263+45+25,340,34)
	var p036 = lImg(imgPath+"p036.png",p3d1,68,483,505,144)
	var p3sp = lSpan("姓名",p3d1,0,263+45-20,30,"#fff","newF")
	p3sp.style.textAlign="center"
	p3sp.style.width="640px"
	
	var p3sp2 = lSpan("这里是穿“阅”情报局",p3d1,0,263+45+25,33,"#fff","newF")
	p3sp2.style.textAlign="center"
	p3sp2.style.width="640px"
	

	var p3arr=[]
	
	for (var i = 0; i < copyArr.length; i++) {
		p3arr[i] = lSpan(copyArr[i].xq,p3d1,0,543,50,"#fff","newF")
		p3arr[i].style.width="640px"
		p3arr[i].style.textAlign="center"
		p3arr[i].style.pointerEvents="none"
	}
	
	var p3Area = lDiv(p3d1,0,318,640,500,"rgba(255,0,0,0.0)")
	var curCopyId=0
	var lcf = (function() {
		//config
		
		var pArr=[
			{y:0-180,autoAlpha:0,rotationX:70,transformPerspective:500,scale:0.7},
			{y:0-160,autoAlpha:0.2,rotationX:46,transformPerspective:500,scale:0.8},
			{y:0-110,autoAlpha:0.5,rotationX:23,transformPerspective:500,scale:0.9},
			{y:0,autoAlpha:1,rotationX:0,transformPerspective:500,scale:1},
			{y:0+110,autoAlpha:0.5,rotationX:-23,transformPerspective:500,scale:0.9},
			{y:0+160,autoAlpha:0.2,rotationX:-46,transformPerspective:500,scale:0.8},
			{y:0+180,autoAlpha:0,rotationX:-70,transformPerspective:500,scale:0.7}
		]
		
		var lcf = lCoverFlow(p3arr,pArr,[0,1,2,3,4,5,6],4,true)
		
		lcf.addDrag(p3Area,"y",130)
		lcf.onChange=function(num)
		{
			curCopyId=num
			console.log(curCopyId);
			if(mCtrl.isPlaying()==true) ef03.play()
			
			
		}
		
		return lcf
	})()
	
	lBtn(p016,function () {
	    lFw.track("开始加密")
	    TweenMax.to(p3d1,0.5,{autoAlpha:0,ease:Power0.easeNone})
	    TweenMax.to(p3D2,0.5,{autoAlpha:1,ease:Power0.easeNone})
	    
	    
		TweenMax.to(bigSp3,0,{autoAlpha:0})
		TweenMax.to(bigSp2,0,{autoAlpha:0})
		TweenMax.to(bigSp,0,{autoAlpha:0})
		TweenMax.to(btnDiv,0,{autoAlpha:0})
		TweenMax.to(copyDiv,0,{autoAlpha:1})
		
		enCopy(curCopyId)
		
	    TweenMax.delayedCall(0.5,function () {
	        //showCopy (curCopyId)
	    })
	})
	
	
	//============================
	var p3D2 = lDiv(p3,0,0)
	TweenMax.to(p3D2,0,{autoAlpha:0})
	
	var rCopyArr="只有思念的人能相聚安这世界最美的风景是一走过山重水复的流年笑此时此刻的云深深的话我看到了你方才知道我我明白你会来所以我等你再不来我要下雪了木每想你一次天上飘落是你不是我却又像世界上当我走向你的时候我原"
	
	var copyDiv = lDiv(p3D2,0,0)
	var copyDiv2 = lDiv(p3D2,0,0)
	var btnDiv=lDiv(p3D2,0,0)
	var p038 = lImg(imgPath+"p038.png",btnDiv,207,821+60,226,74)
	var p039 = lImg(imgPath+"p039.png",btnDiv,207,940+60,226,75)
	TweenMax.to(btnDiv,0,{autoAlpha:0})
	
	lBtn(p038,function () {
	    lFw.track("重选心情")
	    TweenMax.to(p3d1,0.3,{autoAlpha:1,ease:Power0.easeNone})
	    TweenMax.to(p3D2,0.3,{autoAlpha:0,ease:Power0.easeNone})
	})
	lBtn(p039,function () {
	    lFw.track("完成加密")
	    
	    sinfo = base64Coder.encode(ip1.value)+"_"+curCopyId+"_"+copy123
	    //wxSetShareCopy (wx_pyTitle,wx_pyDesc,wx_pyqTitle,wx_shareUrl+"?sinfo="+sinfo,wx_sharePic)
	    try{
	    	/*
			share.set('appmessage', 'title', "我想对你说的话已被#穿阅情报局#成功加密");
			share.set('appmessage', 'desc', "也许话里有话？");
			share.set('timeline', 'title', "我想对你说的话已被#穿阅情报局#成功加密");
			share.set('appmessage', 'link', wx_shareUrl+"?sinfo="+sinfo);
			share.set('timeline', 'link', wx_shareUrl+"?sinfo="+sinfo);
			share.update()//更新分享内容
			*/
	    }catch(e){
	    	
	    }

	    
	    console.log("sinfo",sinfo);
	    lFlipObj.turnToPage(4)
	})
	var sinfo
	
	var p4Arr=[{x:97,y:269,w:35,h:36},{x:198,y:288,w:35,h:33},{x:476,y:886,w:35,h:33},{x:311,y:300,w:34,h:34},{x:299,y:917,w:34,h:34},{x:364,y:353,w:37,h:36},{x:383,y:302,w:35,h:37},{x:474,y:331,w:35,h:36},{x:192,y:357,w:36,h:36},{x:252,y:364,w:35,h:34},{x:314,y:379,w:36,h:36},{x:408,y:405,w:35,h:36},{x:241,y:883,w:36,h:35},{x:466,y:436,w:33,h:36},{x:252,y:425,w:36,h:37},{x:154,y:457,w:35,h:36},{x:529,y:652,w:36,h:35},{x:311,y:499,w:37,h:37},{x:215,y:539,w:37,h:36},{x:133,y:532,w:36,h:34},{x:533,y:772,w:36,h:35},{x:474,y:529,w:36,h:35},{x:88,y:736,w:36,h:35},{x:388,y:558,w:36,h:35},{x:130,y:325,w:36,h:35},{x:284,y:635,w:35,h:35},{x:120,y:624,w:31,h:34},{x:153,y:929,w:31,h:34},{x:326,y:681,w:36,h:36},{x:77,y:575,w:35,h:36},{x:434,y:620,w:36,h:36},{x:516,y:455,w:34,h:37},{x:201,y:749,w:36,h:37},{x:381,y:771,w:36,h:36},{x:82,y:671,w:36,h:36},{x:500,y:585,w:35,h:36},{x:480,y:677,w:37,h:36},{x:105,y:850,w:37,h:37},{x:293,y:780,w:35,h:36},{x:430,y:825,w:36,h:36},{x:84,y:454,w:36,h:36},{x:230,y:813,w:34,h:34},{x:85,y:355,w:34,h:34},{x:131,y:780,w:36,h:36},{x:498,y:387,w:36,h:36},{x:178,y:854,w:35,h:35},{x:185,y:617,w:37,h:36},{x:531,y:318,w:36,h:36},{x:402,y:909,w:36,h:36},{x:251,y:305,w:34,h:34},{x:424,y:338,w:37,h:37},{x:137,y:397,w:36,h:36},{x:177,y:695,w:36,h:36},{x:284,y:722,w:35,h:35},{x:390,y:689,w:36,h:36},{x:464,y:753,w:34,h:35},{x:211,y:466,w:36,h:35},{x:329,y:440,w:36,h:36},{x:414,y:488,w:34,h:36},{x:258,y:574,w:36,h:35},{x:352,y:599,w:35,h:36},{x:310,y:839,w:35,h:36}]
	var p4DivArr=[]
	var p4SpanArr=[]
	var rNum = []
	
	for (var i = 0; i < p4Arr.length; i++) {
		
		rCopyArr=lOutOfOrder(rCopyArr.split(""))
		rCopyArr = rCopyArr.join("")
		
		p4DivArr[i]=lDiv(copyDiv,p4Arr[i].x,p4Arr[i].y,33,33)
		p4SpanArr[i]=lSpan("字",p4DivArr[i],0,0,32,"#142e69")//142e69,012067
		p4SpanArr[i].tl = new TimelineMax({repeat:-1,paused:true})
		
		p4DivArr[i].rDiv = lDiv(copyDiv,p4Arr[i].x,p4Arr[i].y,33,33)
		p4DivArr[i].rDiv.style.border="1px solid #fff"
		TweenMax.to(p4DivArr[i].rDiv,0,{autoAlpha:0,scale:0})
		
		p4DivArr[i].rDiv.style.borderRadius="100%"
		
		p4SpanArr[i].innerHTML = rCopyArr[0]

		for (var j = 0; j < 50; j++) {
			p4SpanArr[i].tl.to(p4SpanArr[i],0,{innerHTML:rCopyArr[j]})
			p4SpanArr[i].tl.to(p4SpanArr[i],lRandomRange(0.1,0.2),{})
		}
		
		rNum.push(i)
		
		p4SpanArr[i].tl.render(0)
		
	}
	
	function stopBgTl () {
		for (var i = 0; i < p4Arr.length; i++) {
			p4SpanArr[i].tl.stop()
		}
	}
	function playBgTl () {
		
		for (var i = 0; i < p4Arr.length; i++) {
			p4SpanArr[i].tl.play()
		}
	}
	
	var bigSp3 = lSpan("想对你说：",copyDiv2,80,320+20,30,"#fff","newF")
	bigSp3.style.width="640px"
	
	var bigSp4= lSpan("",copyDiv2,0,543,50,"#fff","newF")
	bigSp4.style.width="640px"
	bigSp4.style.textAlign="center"
	bigSp4.style.pointerEvents="none"
	
	var bigSpDiv = lDiv(copyDiv2,0,0)
	var bigSp = lSpan("",bigSpDiv,0,436,60,"#fff","newF")
	bigSp.style.textAlign="center"
	bigSp.style.width="640px"
	bigSp.style.lineHeight="90px"
	
	var bigSp2 = lSpan("",copyDiv2,-30,436,31,"#fff","newF")
	bigSp2.style.textAlign="right"
	bigSp2.style.width="640px"
	
	TweenMax.delayedCall(0.1,function () {
	    //lFlipObj.turnToPage(4)
	})
	
	function  enCopy(id) {
		console.log("enCopy",id);
		bigSp4.innerHTML = copyArr[id].xq
		rNum = lOutOfOrder(rNum)
		
		for (var i = 0; i < p4Arr.length; i++) {
			
			TweenMax.to(p4SpanArr[i],0,{autoAlpha:1})
			TweenMax.to(p4DivArr[i],0,{autoAlpha:1})
		}
		
		var split = new SplitText(bigSp4);
		
		if(mCtrl.isPlaying()==true) ef02.play()
		
		var copyTl = flyInAni (split,enCopy_f1)
		
		copyTl.play()
		
		function enCopy_f1 () {
			copyTl.stop()
			
			playBgTl ()
			
			if(mCtrl.isPlaying()==true) ef00.play()
			
			TweenMax.delayedCall(1,function () {
			    showCopy (id)
			})
		}
		
	}
	
	function flyInAni (split,onCom) {
		var copyTl = new TimelineMax({repeat:-0,paused:true,onComplete:flyInAni_f1})
		for (var i = 0; i < split.chars.length; i++) {
			//console.log(parseInt(p4DivArr[rNum[i]].style.left),parseInt(p4DivArr[rNum[i]].style.top));
			charX = parseInt(split.chars[i].offsetLeft)
			charY = parseInt(split.chars[i].offsetTop)
			charX += parseInt(split.chars[i].parentNode.offsetLeft)
			charY += parseInt(split.chars[i].parentNode.offsetTop)
			charX += parseInt(split.chars[i].parentNode.parentNode.offsetLeft)
			charY += parseInt(split.chars[i].parentNode.parentNode.offsetTop)
			charX += parseInt(split.chars[i].parentNode.parentNode.parentNode.offsetLeft)
			charY += parseInt(split.chars[i].parentNode.parentNode.parentNode.offsetTop)
			//console.log(charX,charY);
			copyTl.to(p4SpanArr[rNum[i]],0,{innerHTML:split.chars[i].innerHTML},0)
			
			//lDiv(p4,charX,charY,111,111,"rgba(255,0,0,0.4)")
			split.chars[i].cx = parseInt(p4DivArr[rNum[i]].style.left) - charX
			split.chars[i].cy = parseInt(p4DivArr[rNum[i]].style.top) - charY
			
			copyTl.to(split.chars[i],1.5,{x:split.chars[i].cx-10,y:split.chars[i].cy-8,scale:0.6,ease:Power1.easeInOut},0.1*i+1)
			copyTl.to(p4DivArr[rNum[i]],1,{autoAlpha:0},0.1*i+1.5)
			
			copyTl.to(split.chars[i],0.3,{autoAlpha:0},0.1*i+1+2.0)
			copyTl.to(p4DivArr[rNum[i]],0.3,{autoAlpha:1},0.1*i+1+2.0)
			
		}
		//copyTl.to(split,0,{onStart:copyTl_f1},0.1*i+4)
		//copyTl.to(split,0,{onStart:copyTl_f2},0.1*i+5)
		copyTl.render(0)
		
		function flyInAni_f1 () {
			if(onCom!=undefined) onCom()
		}
		
		return copyTl
	}
	
	var copy123
	function showCopy (id) {
		console.log("showCopy",id);
		TweenMax.to(bigSp,0,{autoAlpha:1})
		if(copy123!=undefined)
		{
			copy123 = parseInt(copy123)
			copy123+=1
			if(copy123>2)
			{
				copy123=0
			}
		}else{
			copy123 = parseInt(Math.random()*3)
		}
		
		rNum = lOutOfOrder(rNum)
		console.log(copy123,"copy123");
		console.log(id,"id");
		bigSp.innerHTML=copyArr[id].copyArr[copy123].copy
		if(id==10 && copy123 == 0)
		{
			bigSp.style.lineHeight="68px"
		}else{
			bigSp.style.lineHeight="90px"
		}
		
		
		console.log(copyArr[id].xq);
		console.log(copyArr[id].copyArr[copy123].copy);
		//console.log(bigSp.offsetWidth,bigSp.offsetHeight);
		TweenMax.to(bigSp2,0,{top:bigSp.offsetHeight+436+30})
		bigSp2.innerHTML="<img src='"+imgPath+"p037.png' id='heng' />"+copyArr[id].copyArr[copy123].z
		var heng = document.getElementById("heng")
		TweenMax.to(heng,0,{y:-10,x:-20})
		var split = new SplitText(bigSp);
		//console.log(split);
		
		TweenMax.to(bigSp3,0,{autoAlpha:0})
		TweenMax.to(bigSp2,0,{autoAlpha:0})
		
		playBgTl ()
		
		bigSp3.innerHTML=ip1.value+"想对你说："
		
		var copyTl = flyOutAni (split)
		copyTl.play()
		
		
		
	}
	
	function flyOutAni (split,onCom) {
		var copyTl = new TimelineMax({repeat:-0,paused:true,onComplete:onCom})
		var charX
		var charY
		//for (var i = 0; i < 1; i++) {
		for (var i = 0; i < split.chars.length; i++) {
			//console.log(parseInt(p4DivArr[rNum[i]].style.left),parseInt(p4DivArr[rNum[i]].style.top));
			charX = parseInt(split.chars[i].offsetLeft)
			charY = parseInt(split.chars[i].offsetTop)
			charX += parseInt(split.chars[i].parentNode.offsetLeft)
			charY += parseInt(split.chars[i].parentNode.offsetTop)
			charX += parseInt(split.chars[i].parentNode.parentNode.offsetLeft)
			charY += parseInt(split.chars[i].parentNode.parentNode.offsetTop)
			charX += parseInt(split.chars[i].parentNode.parentNode.parentNode.offsetLeft)
			charY += parseInt(split.chars[i].parentNode.parentNode.parentNode.offsetTop)
			//console.log(charX,charY);
			
			//lDiv(p4,charX,charY,111,111,"rgba(255,0,0,0.4)")
			split.chars[i].cx = parseInt(p4DivArr[rNum[i]].style.left) - charX
			split.chars[i].cy = parseInt(p4DivArr[rNum[i]].style.top) - charY
			
			copyTl.to(split.chars[i],0,{autoAlpha:0,x:split.chars[i].cx-10,y:split.chars[i].cy-23,scale:1})
			
		}
		//for (var i = 0; i < 1; i++) {
		for (var i = 0; i < split.chars.length; i++) {
			//p4DivArr[rNum[i]].style.border="2px solid #fff"
			copyTl.to(p4DivArr[rNum[i]].rDiv,0,{autoAlpha:0.3,scale:0},0.1*i)
			copyTl.to(p4DivArr[rNum[i]].rDiv,1,{autoAlpha:0,scale:5},0.1*i)
			copyTl.to(split.chars[i],1,{autoAlpha:1,scale:0.5,ease:Elastic.easeOut},0.1*i)
			copyTl.to(p4DivArr[rNum[i]],0.2,{autoAlpha:0},0.1*i)
			
			copyTl.to(split.chars[i],1.5,{x:0,y:0,scale:1,ease:Power1.easeInOut,onStart:copyTl_f2,onStartParams:[i]},0.1*i+2)
		}
		copyTl.to(copyDiv,1,{autoAlpha:0,onComplete:copyTl_f1},split.chars.length*0.1+2)
		copyTl.to([bigSp2,bigSp3,btnDiv],1,{autoAlpha:1,ease:Power0.easeNone},split.chars.length*0.1+3)
		
		copyTl.render(0)
		return copyTl
	}
	
	function copyTl_f2 (i) {
		//console.log(i);
		if(i==0)
		{
			
		}

	}
	function copyTl_f1 () {
		stopBgTl ()
	}
	
	
	
	function bgAni (p,x,y) {
		var bgDiv = lDiv(p,x,y)
		
		var bgDivArr=[]
		var tr
		for (var i = 0; i < 30; i++) {
			bgDivArr[i] = lDiv(bgDiv,lRandomRange(0,640),lRandomRange(0,1240),33,33,"#fff")
			TweenMax.to(bgDivArr[i],0,{scale:lRandomRange(0.5,1),autoAlpha:lRandomRange(0.05,0.2)})
			bgDivArr[i].style.borderRadius="100%"
			
			bgDivArr[i].tl = new TimelineMax({repeat:-1,paused:true})
			bgDivArr[i].tl.to(bgDivArr[i],lRandomRange(2,4),{autoAlpha:0,ease:yoyoEaseInOut_pw2})
			bgDivArr[i].tl.render(0)
			bgDivArr[i].tl.progress(Math.random())
			//bgDivArr[i].tl.play()
			
			if(Math.random()>0.5)
			{
				tr = 360
			}else{
				tr = -360
			}
			
			bgDivArr[i].tl2 = new TimelineMax({repeat:-1,paused:true})
			bgDivArr[i].tl2.to(bgDivArr[i],lRandomRange(10,15),{transformOrigin:lRandomRange(50,100)+"px 50%",rotation:tr,ease:Power0.easeOut})
			bgDivArr[i].tl2.render(0)
			//bgDivArr[i].tl2.play()
			
		}
		
		bgDiv.play=function () {
			for (var i = 0; i < bgDivArr.length; i++) {
				bgDivArr[i].tl.play()
				bgDivArr[i].tl2.play()
			}
		}
		bgDiv.stop=function () {
			for (var i = 0; i < bgDivArr.length; i++) {
				bgDivArr[i].tl.stop()
				bgDivArr[i].tl2.stop()
			}
		}
		
		return bgDiv
	}
	

	p3.playAni=function () {
		p011.style.display=""
	    playPageAniArr(this)
	    lInsertBefore(copyDiv,copyDiv2)
	    p3sp.innerHTML=ip1.value
	}
	p3.stopAni=function () {
	    stopPageAniArr(this)
	    
	}

	//p4======================================================================================
	var p4 = lDiv(pageDiv,0,0,640,maxH,pageColor)
	p4.aniArr=[]
	
	var bgArr=["p040.jpg","p041.jpg","p042.jpg","p043.jpg","p044.jpg","p045.jpg","p046.jpg","p047.jpg"]
	var p4bgNum = parseInt(Math.random()*bgArr.length)
	
	lImg(imgPath+"p010.jpg",p4,0,0)
	var p4bg = bgAni (p4)
	p4.aniArr.push(p4bg)
	
	var p4d1 = lDiv(p4,0,39)
	var p4div = lDiv(p4d1,50,76,539,933,"#fff")
	var p049 = lImg(imgPath+"p049.png",p4d1,56,1032,203,55)
	
	
	var p050 = lImg(imgPath+"p050.png",p4d1,134,804)
	var p052 = lImg(imgPath+"p052.png",p4d1,226,136,187,38)
	
	var p4sp = lSpan("",p4d1,0,275,28,"#fff","newF")
	p4sp.style.width="640px"
	//p4sp.style.fontWeight="bold"
	p4sp.style.textAlign="center"

	
	var p4copyArr=["c000.png","c001.png","c002.png","c003.png","c004.png","c005.png","c006.png","c007.png","c008.png","c009.png","c010.png","c011.png","c012.png","c013.png","c014.png","c015.png","c016.png","c017.png","c018.png","c019.png","c020.png","c021.png","c022.png","c023.png","c024.png","c025.png","c026.png","c027.png","c028.png","c029.png","c030.png","c031.png","c032.png","c033.png","c034.png","c035.png","c036.png","c037.png","c038.png","c039.png","c040.png","c041.png","c042.png","c043.png","c044.png"]
	var p4copyPArr=[{x:260,y:334,w:90,h:415},{x:263,y:334,w:111,h:415},{x:248,y:334,w:142,h:415},{x:261,y:334,w:109,h:415},{x:244,y:334,w:144,h:415},{x:245,y:334,w:146,h:415},{x:261,y:335,w:102,h:417},{x:252,y:334,w:136,h:415},{x:244,y:335,w:149,h:417},{x:265,y:334,w:100,h:415},{x:264,y:334,w:105,h:415},{x:249,y:334,w:137,h:415},{x:260,y:334,w:111,h:415},{x:238,y:334,w:167,h:415},{x:250,y:334,w:134,h:415},{x:260,y:334,w:107,h:415},{x:256,y:335,w:132,h:417},{x:256,y:335,w:132,h:417},{x:256,y:335,w:132,h:417},{x:256,y:335,w:132,h:417},{x:256,y:335,w:132,h:417},{x:256,y:335,w:132,h:417},{x:268,y:335,w:109,h:417},{x:250,y:335,w:144,h:417},{x:250,y:335,w:144,h:417},{x:250,y:335,w:144,h:417},{x:250,y:335,w:144,h:417},{x:250,y:335,w:144,h:417},{x:250,y:335,w:144,h:417},{x:251,y:335,w:143,h:417},{x:215,y:334,w:214,h:415},{x:250,y:335,w:146,h:417},{x:245,y:335,w:145,h:417},{x:257,y:335,w:116,h:417},{x:244,y:335,w:148,h:417},{x:235,y:335,w:150,h:417},{x:246,y:335,w:149,h:417},{x:260,y:335,w:113,h:417},{x:243,y:335,w:148,h:417},{x:242,y:335,w:148,h:417},{x:240,y:335,w:150,h:417},{x:239,y:335,w:149,h:417},{x:251,y:335,w:149,h:417},{x:261,y:335,w:116,h:417},{x:232,y:335,w:181,h:417}]
	//p4copyArr.reverse()
	
	var savePic = lImg(undefined,p4,0,0)
	var cvs = lCanvas(undefined,0,0,511,907,"#fff")
	//511,907
	//539,933//26
	
	var cBtn = lSysBtn("",p4d1,274,1032,310,55)
	cBtn.style.border="none"
	cBtn.style.borderRadius="0px"
	cBtn.style.background="none"
	cBtn.setAttribute("data-clipboard-text","kindle欢聚日，使用￥Kindle欢聚日￥抢先预览（长按复制整段文案，打开手机淘宝即可进入活动内容）")
	
	var p048 = lImg(imgPath+"p048.png",cBtn,0,0,310,55)
	
	var clipboard = new ClipboardJS(cBtn);
	
	clipboard.on('success', function(e) {
		//复制成功
	    console.info('Action:', e.action);
	    console.info('Text:', e.text);
	    console.info('Trigger:', e.trigger);
		
	    e.clearSelection();
	    popDiv.openPop("pop1")
	});
	
	clipboard.on('error', function(e) {
		//复制失败
	    console.error('Action:', e.action);
	    console.error('Trigger:', e.trigger);
	});
    
    lBtn(p049,function () {
        lFw.track("重新加密_p4")
        lFlipObj.turnToPage(3)
	    TweenMax.to(p3d1,0,{autoAlpha:1,ease:Power0.easeNone})
	    TweenMax.to(p3D2,0,{autoAlpha:0,ease:Power0.easeNone})
    })
	
	var pop1 = lDiv(undefined,0,0,640,1240)
	
	var p051 = lImg(imgPath+"p051.png",pop1,320,459,339,198)
	TweenMax.to(p051,0,{x:"-50%"})
	
	pop1.onOpen=function () {
	    
	}
	pop1.onClose=function () {
	    
	}
	    
	lBtn(pop1,function () {
	    //lFw.track("")
	    popDiv.close()
	})
	    
	popDiv.addPop(pop1,"pop1")
	//popDiv.openPop("pop1")
	
	var qrcodeDiv = lDiv(undefined,13,983)
	var qrcode = new QRCode(qrcodeDiv, {
		colorDark:"#000",//暗色
		colorLight:"#ffffff",//亮色
		correctLevel:QRCode.CorrectLevel.L,//纠错质量
        width : 96,//设置宽高
        height : 96
    });
    
    qrcode.makeCode(wx_shareUrl);
    
    
	
	var p4copy
	var p4bg
	p4.playAni=function () {
		p4bgNum = parseInt(Math.random()*bgArr.length)
		
	    if(p4bg!=undefined)
	    {
	    	p4bg.src=undefined
	    	lRemoveChild(p4bg)
	    }
	    
		p4bg = lImg(imgPath+bgArr[p4bgNum],p4d1,63,89)
		lInsertBefore(p4bg,p050)
		
		if(copy123==undefined) copy123=0
	    playPageAniArr(this)
	    p011.style.display="none"
	    console.log("curCopyId",curCopyId);
	    console.log("copy123",copy123);
	    console.log("curCopyId*3+copy123",curCopyId*3+copy123);
	    
	    p4sp.innerHTML=ip1.value+"对你说......"
	    
	    if(p4copy!=undefined)
	    {
	    	p4copy.src=undefined
	    	lRemoveChild(p4copy)
	    }
	    
	    if(savePic!=undefined)
	    {
	    	savePic.src=undefined
	    	lRemoveChild(savePic)
	    	savePic = lImg(undefined,p4,0,0)
	    }
	    
	    cvs.c2d.clearRect(0,0,539,933);
		cvs.c2d.fillStyle="#fff";
		cvs.c2d.fillRect(0,0,539,933);
	    
	    p4copy = lImg(imgPath+p4copyArr[curCopyId*3+copy123],p4d1,320,334)
	    TweenMax.to(p4copy,0,{x:"-50%"})
	    
	    qrcode.makeCode(wx_shareUrl+"?sinfo="+sinfo);
	    
	    lDrawImage(cvs,imgPath+bgArr[p4bgNum],0,0,{onComplete:cvs_f1})
	    function cvs_f1 () {
			var cvssp = lSpan("",p4d1,0,275-76,28,"#fff","newF")
			cvssp.style.width="539px"
			cvssp.style.textAlign="center"
			//cvssp.style.fontWeight="bold"
			cvssp.innerHTML = p4sp.innerHTML
			
	    	lFillText(cvssp,cvs,true)
	    	lDrawImage(cvs,imgPath+p4copyArr[curCopyId*3+copy123],539/2-p4copyPArr[curCopyId*3+copy123].w/2-13,334-76-13,{onComplete:cvs_f2})
	    }
	    function cvs_f2 () {
	    	lDrawImage(cvs,imgPath+"p054.png",31-13,728-13,{onComplete:cvs_f3})
	    }
	    function cvs_f3 () {
	    	lDrawImage(cvs,imgPath+"p052.png",176-13,60-13,{onComplete:cvs_f4})
	    }
	    function cvs_f4 () {
	    	
	    	cvs.c2d.drawImage(qrcodeDiv.childNodes[0],380-13,762-13)
	    	
			savePic.src = cvs.toDataURL("image/png")
			TweenMax.to(savePic,0,{autoAlpha:0.01})
			savePic.style.width="640px"
			savePic.style.height="1046px"
			savePic.setQRCode()
	    }
	}
	p4.stopAni=function () {
	    stopPageAniArr(this)
	    
	}
	
	//p5======================================================================================
	var p5 = lDiv(pageDiv,0,0,640,maxH,pageColor)
	p5.aniArr=[]
	
	lImg(imgPath+"p010.jpg",p5,0,0)
	var p5bg = bgAni (p5)
	p5.aniArr.push(p5bg)
	
	var p5_copyDiv2 = lDiv(p5,0,0)
	
	var p5_bigSp3 = lSpan("想对你说：",p5_copyDiv2,80,320+20,30,"#fff","newF")
	p5_bigSp3.style.width="640px"
	
	var p5_bigSp4= lSpan("123_1",p5_copyDiv2,0,543,50,"#fff","newF")
	p5_bigSp4.style.width="640px"
	p5_bigSp4.style.textAlign="center"
	p5_bigSp4.style.pointerEvents="none"
	
	var p5_bigSpDiv = lDiv(p5_copyDiv2,0,0)
	var p5_bigSp = lSpan("123_2",p5_bigSpDiv,0,436,60,"#fff","newF")
	p5_bigSp.style.textAlign="center"
	p5_bigSp.style.width="640px"
	p5_bigSp.style.lineHeight="90px"
	
	var p5_bigSp2 = lSpan("123_3",p5_copyDiv2,-30,436,31,"#fff","newF")
	p5_bigSp2.style.textAlign="right"
	p5_bigSp2.style.width="640px"
	
	var p053d = lDiv(p5,130,821,381,72)
	var p053 = lImg(imgPath+"p053.png",p053d,0,0,381,72)
	
	lBtn(p053,function () {
	    lFw.track("进入穿越情报局")
	    lFlipObj.jumpToPage(1)
	    p1tl3.play()
	})
	
	
	
	var p5CopyAni
	function  p5_enCopy(id,c123) {
		TweenMax.to(p5_bigSp,0,{autoAlpha:1})
		copy123 = c123
		rNum = lOutOfOrder(rNum)
		
		p5_bigSp.innerHTML=copyArr[id].copyArr[copy123].copy
		console.log(copyArr[id].xq);
		console.log(copyArr[id].copyArr[copy123].copy);
		//console.log(p5_bigSp.offsetWidth,p5_bigSp.offsetHeight);
		TweenMax.to(p5_bigSp2,0,{top:p5_bigSp.offsetHeight+436+30})
		p5_bigSp2.innerHTML="<img src='"+imgPath+"p037.png' id='heng' />"+copyArr[id].copyArr[copy123].z
		var heng = document.getElementById("heng")
		TweenMax.to(heng,0,{y:-10,x:-20})
		var split = new SplitText(p5_bigSp);
		//console.log(split);
		
		TweenMax.to(p5_bigSp3,0,{autoAlpha:0})
		TweenMax.to(p5_bigSp2,0,{autoAlpha:1})
		TweenMax.to(p5_bigSp4,0,{autoAlpha:0})
		TweenMax.to(p053d,0,{autoAlpha:0})
		
		if(mCtrl.isPlaying()==true) ef02.play()
		p5CopyAni = flyInAni(split,p5_enCopy_f1)
		
		p5_bigSp4.innerHTML = copyArr[id].xq
		rNum = lOutOfOrder(rNum)
		
		var split2 = new SplitText(p5_bigSp4);
		
		function p5_enCopy_f1 () {
			TweenMax.to(p5_bigSp4,0,{autoAlpha:1})
			console.log(22222);
			var p5CopyAni2 = flyOutAni(split2,p5_enCopy_f2)
			
			
			
			playBgTl ()
			
			if(mCtrl.isPlaying()==true) ef00.play()
			
			TweenMax.delayedCall(1,function () {
			    p5CopyAni2.play()
			})
		}
		
		function p5_enCopy_f2 () {
			TweenMax.to(p5_bigSp3,0.3,{autoAlpha:1})
			TweenMax.to(p053d,0.3,{autoAlpha:1})
		}
	}
	
	function p5playAni () {
		
		
		TweenMax.delayedCall(1,function () {
		    p5CopyAni.play()
		    TweenMax.to(p5_bigSp2,0.3,{autoAlpha:0})
		})
	}
	
	
	p5.playAni=function () {
	    playPageAniArr(this)
	    p5.appendChild(copyDiv)
	    
	    lInsertBefore(copyDiv,p5_copyDiv2)
	    p011.style.display=""
	    p012.style.display="none"
	}
	p5.stopAni=function () {
	    stopPageAniArr(this)
	    
	}


	//自适应代码
	var curWinH
	lFw.uiResize=function (rect) {
		curWinH = lNumRange(rect.height,minH,maxH)
		
		//lloading
		/*if(lFw.lloading!=undefined)
		{
			TweenMax.to(lloading.bgDiv,0,{height:curWinH})
		}*/
		
		
		//按百分比调节局顶0，居中0.5，或局底部1,或者自由设定
		//TweenMax.to([target],0,{top:(curWinH-1240)*0.5})
		TweenMax.to([p1,p2,p3,p4,p5,pop1],0,{top:(curWinH-1240)*0.5})
		
		TweenMax.to([p012],0,{top:(curWinH-60)})
		TweenMax.to([p056],0,{top:curWinH-160})
		
		//优先切除顶部，切除到1100后开始切除底部
		//TweenMax.to([target],0,{top:Math.max(1100,curWinH)-1240})
		
		//优先切除底部，切除到1100后开始切除顶部
		//TweenMax.to([target],0,{top:Math.min(1170,curWinH)-1170})
	}
	
	//页面控制---------------------------------------
	var pageArr=[loading,p1,p2,p3,p4,p5]
	var lFlipObj = lFw.initFlipObj(pageDiv,pageArr)

	
	function stopPageAniArr (page) {
		if(page["aniArr"]!=undefined)
		{
			for (var i = 0; i < page.aniArr.length; i++) {
				page.aniArr[i].stop()
			}
		}
	}
	function playPageAniArr (page) {
		if(page["aniArr"]!=undefined)
		{
			for (var i = 0; i < page.aniArr.length; i++) {
				if(page.aniArr[i]["restart"]!=undefined)
				{
					page.aniArr[i].restart()
				}else if(page.aniArr[i]["play"]!=undefined)
				{
					page.aniArr[i].play()
				}else if(page.aniArr[i]["start"]!=undefined)
				{
					page.aniArr[i].start()
				}
			}
		}
	}
	//页面逻辑---------------------------------------
	pageArr[0].playAni()
	lFw.track("进入网站")
	
	
	
	
	if(urlObj.sinfo!=undefined)
	{
		
		var infoArr = urlObj.sinfo.split("_")
		p5_bigSp3.innerHTML=base64Coder.decode(infoArr[0])+"想对你说："
		lFlipObj.turnToPage(5,0)
		p5_enCopy(infoArr[1],infoArr[2])
	}else{
		lFlipObj.turnToPage(1,0)
	}
	
	//代理
	var proxy=function(name) {
		return eval(name)
	}
	
	window.proxy = proxy
	
	//自适应
	lFw.initResize()
	
})


