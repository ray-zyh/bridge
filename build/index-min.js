/*! bridge 2014-03-19 04:14:19 */
(function(){var a=function(){this.init.apply(this,arguments)};a.prototype={version:"0.0.1",init:function(a){var b=this;b.platform="h5",b.bridgeName=a||"ali_trip_webview_bridge",b.bridge=window[b.bridgeName],b.userAgentDetect.apply(this,arguments),b.messageQueueInit(),b.deviceInfoDetect(),b.connectionInfoDetect(),b.handShake.apply(this,arguments),b.notification.superthat=b},messageQueueInit:function(){var a=this;"ios"===a.platform&&(window.messageQueue=[],window.messageQueueFetch=function(){var a;return a=window.messageQueue.length?JSON.stringify(window.messageQueue):"",window.messageQueue=[],a?a:void 0})},handShake:function(a){var b=this;b.pushBack("bridge:","ready",{data:{},successCallback:function(){a&&a()}})},userAgentDetect:function(){var a=this,b=navigator.userAgent,c=b.match(/AliTrip[\s\/][\d\.]+/gim);c&&(a.platform=b.match(/(iPad|iPhone|iPod)/gim)?"ios":"android",a.client.version=parseInt(c[0].match(/[\d\.]+/gim)[0].split(".").join("")))},deviceInfoDetect:function(){var a=this;"h5"!==a.platform&&a.pushBack("bridge:","client_info",{successCallback:function(b){a.client=b}})},connectionInfoDetect:function(){var a=this;return"h5"===a.platform?(a.connection=navigator.connection||{},void 0):(a.pushBack("bridge:","networktype",{successCallback:function(b){a.connection.type=b}}),void 0)},sendURI:function(a,b){var c=this.mClientProxy;return b?(this.buildProxy(a),this):(c||(c=document.querySelector("#J_MClientProxy"))?c.attr("src",a):c=this.buildProxy(a),this.mClientProxy=c,this)},buildRandom:function(){var a=(new Date).getTime()+"_"+parseInt(1e6*Math.random());return a},buildProxy:function(a){var b=this,c=b.buildRandom(),d='<iframe id="J_MClientProxy_'+c+'" class="hidden mclient-proxy" style="width:0;height:0;opacity:0;display:none;" src="'+a+'"></iframe>',e=$(d);return $("body").append(e),e},buildCallback:function(a){var b=this,c=b.buildRandom(),d="Bridge_Callbacks_"+c;return window[d]=function(a,b){return function(){a.apply(this,arguments),delete window[b]}}(a,d),d},pushBack:function(a,b,c,d){var e,f=this,g=(a||"native:")+"//"+b+"?params=",h=[].slice.call(arguments);if(("string"!=typeof a||"string"!=typeof b)&&(a="native:",b=h[0],c=h[1],d=h[2],g=(a||"native:")+"//"+b+"?params="),"h5"!==f.platform){c=c||{};for(var i in c)if(c.hasOwnProperty(i)){if("function"==typeof c[i]&&(e=f.buildCallback(c[i]),c[i]=e),"object"==typeof c[i]&&c[i].hasOwnProperty("length"))for(var j=0;j<c[i].length;j++)"function"==typeof c[i][j]&&(e=f.buildCallback(c[i][j]),c[i][j]=e);i!==i.replace(/([A-Z])/g,"_$1").toLowerCase()&&(c[i.replace(/([A-Z])/g,"_$1").toLowerCase()]=c[i],delete c[i])}if("android"===f.platform)return g+=encodeURIComponent(JSON.stringify(c)),g.match(/^native:\/\//gim)&&f.bridge&&f.bridge.startNativeService&&f.bridge.startNativeService(g),g.match(/^page:\/\//gim)&&f.bridge&&f.bridge.startNativePage&&f.bridge.startNativePage(g),g.match(/^bridge:\/\//gim)&&f.bridge&&f.bridge.startNativeBridge&&f.bridge.startNativeBridge(g),void 0;if("ios"===f.platform)return g+=encodeURIComponent(JSON.stringify(c)),messageQueue.push(g),void 0;g+=encodeURIComponent(JSON.stringify(c)),f.sendURI(g,d)}},getRequestParam:function(a,b){var c;return a=a||window.location.href,c=a.match(new RegExp("[?&]"+b+"=([^&]*)(&?)","i")),c?decodeURIComponent(c[1]):c},getRequestParams:function(a){var b=location.search.substring(1);return a=a||window.location.href,b?JSON.parse('{"'+b.replace(/&/g,'","').replace(/=/g,'":"')+'"}',function(a,b){return""===a?b:decodeURIComponent(b)}):{}},getParams:function(){var a=this,b=a.getRequestParams(),c=a.client;for(var d in c)c.hasOwnProperty(d)&&b.hasOwnProperty(d)&&(b[d]=c[d]);return b},notification:{alert:function(a,b,c,d){var e=this,f=function(a){var c=a.buttonIndex;return"[object Array]"===Object.prototype.toString.call(b)?(b[c]&&b[c].apply(this,arguments),void 0):(b&&b(),void 0)};return"h5"===e.superthat.platform?(alert.apply(null,arguments),void 0):("string"==typeof d&&(d=[d]),e.superthat.pushBack("bridge:","alert",{message:a,successCallback:f,title:c,buttonNames:d}),void 0)},confirm:function(a,b,c,d){var e=this;return"h5"===e.superthat.platform?(confirm.apply(null,arguments)&&b&&b(),void 0):("string"==typeof d&&(d=[d]),e.superthat.pushBack("bridge:","confirm",{message:a,title:c,successCallback:b,buttonNames:d}),void 0)},prompt:function(a,b,c,d,e){var f=this;return"h5"===f.superthat.platform?(prompt.apply(null,arguments),void 0):("string"==typeof e&&(e=[e]),f.superthat.pushBack("bridge:","prompt",{message:a,value:b,successCallback:c,title:d,buttonNames:e}),void 0)},toast:function(a,b){var c=this;"h5"!==c.superthat.platform&&c.superthat.pushBack("bridge:","toast",{message:a,milliseconds:b})},beep:function(a){var b=this;b.superthat.pushBack("bridge:","beep",{times:a})},vibrate:function(a){var b=this;b.superthat.pushBack("bridge:","vibrate",{milliseconds:a})}},device:{},client:{},connection:{},openBrowser:function(a){var b=this;return"h5"===b.platform?(window.open(a),void 0):(b.pushBack("bridge:","open_system_browser",{url:a}),void 0)},openAppStore:function(a){var b=this;return"h5"===b.platform?(window.open(a),void 0):(b.pushBack("bridge:","open_app_store",{url:a}),void 0)},setTitle:function(a,b){var c=this;return"h5"===c.platform?(document.title=a,void 0):(c.pushBack("bridge:","set_webview_title",{title:a,subtitle:b}),void 0)},open:function(a,b,c,d,e){var f=this,g={page_name:a,data:b||{},successCallback:c,naviType:d||0,animeType:"undefined"!=typeof e?e:4};f.pushBack("page:","goto",g)},back:function(a,b){var c=this;return"h5"===c.platform?(history.back(),void 0):a?(c.pushBack("bridge:","back",b),void 0):(c.pushBack("bridge:","back",b),void 0)},close:function(a){var b=this;return"h5"===b.platform?(window.close(),void 0):(b.pushBack("page:","close",a),void 0)},minipay:function(a,b,c,d,e){var f,g=this,h={alipay_id:a,data:c||{},successCallback:function(a){return f=JSON.parse(a),"9000"===f.resultStatus?(d&&d(f),void 0):(e&&e(f),void 0)}};return"h5"===g.platform&&b?(window.location.href=b,void 0):(g.pushBack("bridge:","minipay",h),void 0)}},this.Bridge=a}).call(this);