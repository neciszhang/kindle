/**
 * Created by johnny on 16/6/7.
 */

void function (win, doc, undefined) {
    // 原理：调用链中的某个事件被标识为用户事件而非系统事件
    // 进而导致浏览器以为是用户触发播放而允许播放
    Audio.prototype._play = Audio.prototype.play;
    HTMLAudioElement.prototype._play = HTMLAudioElement.prototype.play;
    function wxPlayAudio(audio) {
        /// <summary>
        /// 微信播放Hack
        /// </summary>
        /// <param name="audio" type="Audio">音频对象</param>
        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
            audio._play();
        });
    }

    function play() {
        var self = this;
        self._play();
        var evtFns = [];
        try {
            wxPlayAudio(self);
            return;
        } catch (ex) {
            evtFns.push("WeixinJSBridgeReady", function evt() {
                wxPlayAudio(self);
                for (var i = 0; i < evtFns.length; i += 2) document.removeEventListener(evtFns[i], evtFns[i + 1], false);
            });
            document.addEventListener("WeixinJSBridgeReady", evtFns[evtFns.length - 1], false);
        }
    }

    Audio.prototype.play = play;
    HTMLAudioElement.prototype.play = play;
}(window, document);
