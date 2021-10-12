const $ = new Env("测试");
//require("./md5.js") 
//const COOKIE = $.isNode() ? require("./dsjCOOKIE") : ``;
var zqtoken={
	"token":"token1&token2",
	"uid":"你的uid1&你的uid2"	
}
let tokenVal='',uidVal='';
let tokenArr=[],uidArr=[];
let tokenVals="",uidVals="";



!(async () => {
	zqtoken= $.isNode() ? (process.env.zqtoken ? process.env.zqtoken : "") : ($.getdata('zqtoken') ? $.getdata('zqtoken') : "")
	if (zqtoken) {
		zqtoken=JSON.parse(zqtoken)
	}
	else{
		$.log("请先设置token");
		$.done();
	}
	let tokenVal = zqtoken.token;
	let uidVal = zqtoken.uid;

if (tokenVal) {
    if (tokenVal.indexOf("&") == -1) {
        tokenArr.push(tokenVal);
    } else if (tokenVal.indexOf("&") > -1) {
        tokenVals = tokenVal.split("&")
	}
}
else{
	$.log("请先设置token");
	$.done();
}
Object.keys(tokenVals).forEach((item) => {
    if (tokenVals[item] && !tokenVals[item].startsWith("#")) {
        tokenArr.push(tokenVals[item])
    }
})	
if (uidVal) {
    if (uidVal.indexOf("&") == -1) {
        uidArr.push(uidVal);
    } else if (uidVal.indexOf("&") > -1) {
        uidVals = uidVal.split("&")
	}
}
else{
	$.log("请先设置uid");
	$.done();
}
Object.keys(uidVals).forEach((item) => {
    if (uidVals[item] && !uidVals[item].startsWith("#")) {
        uidArr.push(uidVals[item])
    }
})	
	for (let k = 0; k < tokenArr.length; k++) {
		token=tokenArr[k];
		uid=uidArr[k];
		$.log( `开始账号：${uid} `);
		reward_type='5';
		$.log( `领取${reward_type}分钟奖励 `);
		await postInfo2(reward_type);
		reward_type='60';
		$.log( `领取${reward_type} 分钟奖励`);
		await postInfo2(reward_type);
	}
	$.log( `所有任务已完成`);
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })



async function postInfo2(reward_type) {
	var timestamp1 = Date.parse( new Date() ).toString();
	//https://kandian.wkandian.com/v17/Article/readReward.json?access=WIFI&app-version=3.6.0&app_name=zqkd_app&app_version=3.6.0&channel=c1031&device_brand=Meizu&device_id=55521771&device_model=M5%20Note&device_platform=android&device_type=android&dpi=480&inner_version=202108181534&language=zh-CN&memory=2&mi=0&mobile_type=1&net_type=1&network_type=WIFI&openudid=3a1300076d717127&os_api=24&os_version=Flyme%206.3.0.2A&request_time=1634001319&resolution=1080x1920&rom_version=Flyme%206.3.0.2A&s_ad=9FbVGOYyXwIo%3DKYvwAv3jLE0xvazvnGE4S_n9rISjn26br&s_im=ZCWwRj3eGxCw%3DZRBfEfk85S8O8fTVAwQULg%3D%3D&sim=2&sm_device_id=2021090811581288bfa8882c442df1a4adf06bc1616a48010209ba3cfc6db9&storage=24.89&subv=1.2.2&uid=59020908&version_code=63&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl7CFpauwp5-whnyp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDdgbGFfJybsLmiapqGcXY&zqkey_id=a4cc125381a09bc94d8cc53533cb865c&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhY2Nlc3MiOiJXSUZJIiwiYXBwLXZlcnNpb24iOiIzLjYuMCIsImFwcF9uYW1lIjoienFrZF9hcHAiLCJhcHBfdmVyc2lvbiI6IjMuNi4wIiwiY2hhbm5lbCI6ImMxMDMxIiwiZGV2aWNlX2JyYW5kIjoiTWVpenUiLCJkZXZpY2VfaWQiOiI1NTUyMTc3MSIsImRldmljZV9tb2RlbCI6Ik01K05vdGUiLCJkZXZpY2VfcGxhdGZvcm0iOiJhbmRyb2lkIiwiZGV2aWNlX3R5cGUiOiJhbmRyb2lkIiwiZHBpIjoiNDgwIiwiaW5uZXJfdmVyc2lvbiI6IjIwMjEwODE4MTUzNCIsImxhbmd1YWdlIjoiemgtQ04iLCJtZW1vcnkiOiIyIiwibWkiOiIwIiwibW9iaWxlX3R5cGUiOiIxIiwibmV0X3R5cGUiOiIxIiwibmV0d29ya190eXBlIjoiV0lGSSIsIm9wZW51ZGlkIjoiM2ExMzAwMDc2ZDcxNzEyNyIsIm9zX2FwaSI6IjI0Iiwib3NfdmVyc2lvbiI6IkZseW1lKzYuMy4wLjJBIiwicmVxdWVzdF90aW1lIjoiMTYzNDAwMTMxOSIsInJlc29sdXRpb24iOiIxMDgweDE5MjAiLCJyb21fdmVyc2lvbiI6IkZseW1lKzYuMy4wLjJBIiwic19hZCI6IjlGYlZHT1l5WHdJbyUzREtZdndBdjNqTEUweHZhenZuR0U0U19uOXJJU2puMjZiciIsInNfaW0iOiJaQ1d3UmozZUd4Q3clM0RaUkJmRWZrODVTOE84ZlRWQXdRVUxnJTNEJTNEIiwic2ltIjoiMiIsInNtX2RldmljZV9pZCI6IjIwMjEwOTA4MTE1ODEyODhiZmE4ODgyYzQ0MmRmMWE0YWRmMDZiYzE2MTZhNDgwMTAyMDliYTNjZmM2ZGI5Iiwic3RvcmFnZSI6IjI0Ljg5Iiwic3VidiI6IjEuMi4yIiwidWlkIjoiNTkwMjA5MDgiLCJ2ZXJzaW9uX2NvZGUiOiI2MyIsInpxa2V5IjoiTURBd01EQXdNREF3TUpDTXBOLXcwOVd0ZzUtQmIzNmVoNkNQcUh1YWxJZWpsN0NGcGF1d3A1LXdobnlwNExEUHlHbDlvbnFrajNacVlKYThZODk4bmFqV3NKdXBaTERkZ2JHRmZKeWJzTG1pYXBxR2NYWSIsInpxa2V5X2lkIjoiYTRjYzEyNTM4MWEwOWJjOTRkOGNjNTM1MzNjYjg2NWMifQ.-I8gkygIP8LZgz-f2OqveX37RfwGvimSm2ls-88AcDRb9bqC8tOXzisr3NbaobRZxKTAr0rvzll3gUsJXE2bLQ
	
	timestamp1 = timestamp1.substr(0,10);
	var timestamp2=new Date().getTime().toString();	
	timestamp2 = timestamp2.substr(0,10);	
    return new Promise((resolve, reject) => {
        setTimeout(() => {
	//reward_type='5';
    //data = {'request_time': str(int(time.time())), 'reward_type': str(reward_type), 'token': token, 'uid': uid}
	//data = urls+'request_time='+timestamp1+'&reward_type='+reward_type+'&token='+token+'&uid='+uid;
	//console.log(`【sign】:${data}`);
	data =getFormData( {'request_time': timestamp1, 'reward_type': `${reward_type}`, 'token': token, 'uid': uid});
    HEADER = {'Token': token, 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': '2856',
              'Connection': 'Keep-Alive', 'Accept-Encoding': 'gzip', 'User-Agent': 'okhttp/3.12.2'}
    //req = requests.post(url, headers=HEADER, data=data)
        let url = {
                url: 'https://kandian.wkandian.com/v17/Ad/getReward.json',
                headers: HEADER,
				body : data
            };
			//console.log("上传成功")
        $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
				if(result.success !== false ){
                    console.log('\n【领取奖励】'+reward_type+'分钟，获得：'+result.items.score +result.items.title )
                }else{
                    console.log('\n【领取奖励】失败:'+result.message)
                     //console.log(result)
                }				
                //console.log(result.msg)
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        });

        return 0;
        }, 1000)
    })
}
function getFormData(element,key,list){
    var list = list || [];
    if(typeof(element)=='object'){
      for (var idx in element)
        getFormData(element[idx],key?key+'['+idx+']':idx,list);
    } else {
      list.push(key+'='+encodeURIComponent(element));
    }
    return list.join('&');
  }
function generateMixed(n) {
	var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

     var res = "";
     for(var i = 0; i < n ; i ++) {
         var id = Math.ceil(Math.random()*35);
         res += chars[id];
     }
     return res;
}
String.prototype.getQueryString = function(name)//name 是URL的参数名字
{
var reg = new RegExp("(^|&|\\?)"+ name +"=([^&]*)(&|$)"), r;
if (r=this.match(reg)) return unescape(r[2]); return null;
}; 
function formatDateTime(inputTime) {
  var date = new Date(inputTime);
Y = date.getFullYear();
M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
D = date.getDate();
D = D < 10 ? ('0' + D) : D;
h = date.getHours() + ':';
m = date.getMinutes() + ':';
s = date.getSeconds(); 
  return Y.toString() + M.toString() + D.toString();
};
//随机udid 小写
function randomsi() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + S4() + S4() + S4() +  S4() + S4() + S4());
}
// md5
!function(n){function t(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[14+(r+64>>>9<<4)]=r;var e,i,a,d,h,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16){i=l,a=g,d=v,h=m,g=f(g=f(g=f(g=f(g=c(g=c(g=c(g=c(g=u(g=u(g=u(g=u(g=o(g=o(g=o(g=o(g,v=o(v,m=o(m,l=o(l,g,v,m,n[e],7,-680876936),g,v,n[e+1],12,-389564586),l,g,n[e+2],17,606105819),m,l,n[e+3],22,-1044525330),v=o(v,m=o(m,l=o(l,g,v,m,n[e+4],7,-176418897),g,v,n[e+5],12,1200080426),l,g,n[e+6],17,-1473231341),m,l,n[e+7],22,-45705983),v=o(v,m=o(m,l=o(l,g,v,m,n[e+8],7,1770035416),g,v,n[e+9],12,-1958414417),l,g,n[e+10],17,-42063),m,l,n[e+11],22,-1990404162),v=o(v,m=o(m,l=o(l,g,v,m,n[e+12],7,1804603682),g,v,n[e+13],12,-40341101),l,g,n[e+14],17,-1502002290),m,l,n[e+15],22,1236535329),v=u(v,m=u(m,l=u(l,g,v,m,n[e+1],5,-165796510),g,v,n[e+6],9,-1069501632),l,g,n[e+11],14,643717713),m,l,n[e],20,-373897302),v=u(v,m=u(m,l=u(l,g,v,m,n[e+5],5,-701558691),g,v,n[e+10],9,38016083),l,g,n[e+15],14,-660478335),m,l,n[e+4],20,-405537848),v=u(v,m=u(m,l=u(l,g,v,m,n[e+9],5,568446438),g,v,n[e+14],9,-1019803690),l,g,n[e+3],14,-187363961),m,l,n[e+8],20,1163531501),v=u(v,m=u(m,l=u(l,g,v,m,n[e+13],5,-1444681467),g,v,n[e+2],9,-51403784),l,g,n[e+7],14,1735328473),m,l,n[e+12],20,-1926607734),v=c(v,m=c(m,l=c(l,g,v,m,n[e+5],4,-378558),g,v,n[e+8],11,-2022574463),l,g,n[e+11],16,1839030562),m,l,n[e+14],23,-35309556),v=c(v,m=c(m,l=c(l,g,v,m,n[e+1],4,-1530992060),g,v,n[e+4],11,1272893353),l,g,n[e+7],16,-155497632),m,l,n[e+10],23,-1094730640),v=c(v,m=c(m,l=c(l,g,v,m,n[e+13],4,681279174),g,v,n[e],11,-358537222),l,g,n[e+3],16,-722521979),m,l,n[e+6],23,76029189),v=c(v,m=c(m,l=c(l,g,v,m,n[e+9],4,-640364487),g,v,n[e+12],11,-421815835),l,g,n[e+15],16,530742520),m,l,n[e+2],23,-995338651),v=f(v,m=f(m,l=f(l,g,v,m,n[e],6,-198630844),g,v,n[e+7],10,1126891415),l,g,n[e+14],15,-1416354905),m,l,n[e+5],21,-57434055),v=f(v,m=f(m,l=f(l,g,v,m,n[e+12],6,1700485571),g,v,n[e+3],10,-1894986606),l,g,n[e+10],15,-1051523),m,l,n[e+1],21,-2054922799),v=f(v,m=f(m,l=f(l,g,v,m,n[e+8],6,1873313359),g,v,n[e+15],10,-30611744),l,g,n[e+6],15,-1560198380),m,l,n[e+13],21,1309151649),v=f(v,m=f(m,l=f(l,g,v,m,n[e+4],6,-145523070),g,v,n[e+11],10,-1120210379),l,g,n[e+2],15,718787259),m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,d),m=t(m,h)}return[l,g,v,m]}function a(n){var t,r="",e=32*n.length;for(t=0;t<e;t+=8){r+=String.fromCharCode(n[t>>5]>>>t%32&255)}return r}function d(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1){r[t]=0}var e=8*n.length;for(t=0;t<e;t+=8){r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32}return r}function h(n){return a(i(d(n),8*n.length))}function l(n,t){var r,e,o=d(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;r<16;r+=1){u[r]=909522486^o[r],c[r]=1549556828^o[r]}return e=i(u.concat(d(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="";for(r=0;r<n.length;r+=1){t=n.charCodeAt(r),e+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t)}return e}function v(n){return unescape(encodeURIComponent(n))}function m(n){return h(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}$.md5=A}(this);
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
