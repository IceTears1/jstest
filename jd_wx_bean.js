/*
赚京豆领豆
助力逻辑：每个ck随机获取一个明星，然后会先内部助力，然后再助力内置助力码
抽奖：是否中奖没判断，需自行查看
更新时间：2021-06-04
脚本兼容: QuantumultX, Surge,Loon, JSBox, Node.js
=================================Quantumultx=========================
[task_local]
#赚京豆领豆
0 2 * * * https://github.com/libinxwz/jdtest/jd_wx_bean.js, tag=赚京豆领豆, enabled=true

=================================Loon===================================
[Script]
cron "0 2 * * *" script-path=https://github.com/libinxwz/jdtest/jd_wx_bean.js,tag=赚京豆领豆

===================================Surge================================
赚京豆领豆 = type=cron,cronexp="0 2 * * *",wake-system=1,timeout=3600,script-path=https://github.com/libinxwz/jdtest/jd_wx_bean.js

====================================小火箭=============================
赚京豆领豆 = type=cron,script-path=https://github.com/libinxwz/jdtest/jd_wx_bean.js, cronexpr="0 2 * * *", timeout=3600, enable=true
 */
const $ = new Env('赚京豆领豆');

const notify = $.isNode() ? require('./sendNotify') : '';

$.message = '';

$.token = '';

$.tasklist=[];

$.isOpen=true;//是否开启红包

$.isReward=false;//是否兑换京豆

const JD_API_HOST = 'https://api.m.jd.com/api'

let CookieArr = [];
//let $.cookieArr = [];
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";

!(async () => {
	 if (!getCookies()) return;
	// CookieArr=$.cookieArr;
  for (let i = 0; i < CookieArr.length; i++) {
    cookie = CookieArr[i]
    console.log(`········【帐号${i+1}】开始········`)
	  //获取token
	  await getToken();
	  if($.isReward){
		  console.log("已兑换完成，跳过")
		  continue;
	  }
	  if($.token!=""){
		 //开红包
		if(!$.isOpen){
		  await startJob();
		}
		// 获取任务列表
		await getTaskList();
		for(var j=0;j<$.tasklist.length&&$.tasklist[j].taskDataStatus!=3;j++){
			console.log("去做任务："+$.tasklist[j].title)
			if($.tasklist[j].taskDataStatus!=2){
				await getTask($.tasklist[j].id);
				await $.wait(10000);
				await reachTask($.tasklist[j].id);
			}
			await $.wait(2000);
			await reveive($.tasklist[j].id);
		}
		// 提现
		await tixian();

	  }


    //推送消息
    // await sendMsg()

    console.log(`········【帐号${i+1}】结束········`)

  }
})().catch((e) => $.logErr(e))
    .finally(() => $.done())

function getCookies() {
  if ($.isNode()) {
    CookieArr = Object.values(jdCookieNode);
  } else {
    const CookiesJd = JSON.parse($.getdata("CookiesJD") || "[]").filter(x => !!x).map(x => x.cookie);
   CookieArr = [$.getdata("CookieJD") || "", $.getdata("CookieJD2") || "", ...CookiesJd].filter(x=>!!x);
  }
  if (!CookieArr[0]) {
    $.msg(
      $.name,
      "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取",
      "https://bean.m.jd.com/",
      { "open-url": "https://bean.m.jd.com/" }
    );
    return false;
  }
  return true;
}


async function getTask(id){//点击
	return new Promise((resolve) => {
	   $.post(taskUrl(`vviptask_receive_getone`,{"ids":id+"\n","systemId":"19","channel":"SWAT_RED_PACKET"}),(error, response, data) =>{
		try{
		  if (error) {
			console.log(`${JSON.stringify(error)}`)
			console.log(`API请求失败，请检查网路重试`)
		  } else {
			const result = JSON.parse(data)
			// 反馈信息
			//console.log(result);
			//result.data.forEach((item)=>{
			//  console.log(item.id);
			//})
		  }}catch(e) {
			  console.log(e)
			} finally {
			resolve();
		  }
		})
   })
}
async function reachTask(id){//完成
	return new Promise((resolve) => {
	   $.post(taskUrl(`vviptask_reach_task`,{"taskIdEncrypted":id+"\n","systemId":"19","channel":"SWAT_RED_PACKET"}),(error, response, data) =>{
		try{
		  if (error) {
			console.log(`${JSON.stringify(error)}`)
			console.log(`API请求失败，请检查网路重试`)
		  } else {
			const result = JSON.parse(data)
			// 反馈信息
			if(result.success==true){
				console.log("任务完成");
			}else{
				console.log("任务失败");
			}
			//console.log(result);
			//result.data.forEach((item)=>{
			//  console.log(item.id);
			//})
		  }}catch(e) {
			  console.log(e)
			} finally {
			resolve();
		  }
		})
   })
}
async function reveive(id){//领取
	return new Promise((resolve) => {
	   $.post(taskUrl(`vviptask_reward_receive`,{"idEncKey":id+"\n","systemId":"19","channel":"SWAT_RED_PACKET"}),(error, response, data) =>{
		try{
		  if (error) {
			console.log(`${JSON.stringify(error)}`)
			console.log(`API请求失败，请检查网路重试`)
		  } else {
			const result = JSON.parse(data)
			// 反馈信息
			if(result.success==true){
				console.log("领取成功");
			}else{
				console.log("领取失败");
			}
			//result.data.forEach((item)=>{
			//  console.log(item.id);
			//})
		  }}catch(e) {
			  console.log(e)
			} finally {
			resolve();
		  }
		})
   })
}
async function tixian(){
   return new Promise((resolve) => {
    $.get(tokenUrl("pg_interact_interface_invoke",{"floorToken":"d7f086c1-5e6e-4572-b8dd-93ec7353d89e","dataSourceCode":"takeReward","argMap":{}}), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
           //console.log(data)
            data = JSON.parse(data);
            if( data.success == true){
              console.log("提现成功")
			  //$.token=data.data.floorInfoList[0].token;

              // console.log(data.data.result.taskInfos)
            }else{
              console.log(data)
            }

        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
async function getToken(){
   return new Promise((resolve) => {
    $.get(tokenUrl("pg_channel_page_data",{"paramData":{"token":"3b9f3e0d-7a67-4be3-a05f-9b076cb8ed6a"}}), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
           //console.log(data)
            data = JSON.parse(data);
            if( data.success == true){
			  $.token=data.data.floorInfoList[0].token;
			  console.log(`token:`+$.token);
			  $.isOpen=data.data.floorInfoList[0].floorData.userActivityInfo.redPacketOpenFlag;
			  $.isReward=data.data.floorInfoList[0].floorData.userActivityInfo.redPacketRewardTakeFlag;
              // console.log(data.data.result.taskInfos)
            }else{
              console.log(data)
            }

        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

async function startJob(){
   return new Promise((resolve) => {
    $.get(tokenUrl("pg_interact_interface_invoke",{"floorToken":$.token,"dataSourceCode":"openRedPacket","argMap":{}}), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {

            data = JSON.parse(data);

            if( data.success == true){



              // console.log(data.data.result.taskInfos)
            }else{
              //console.log(data)
            }

        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

async function getTaskList(){
 return new Promise((resolve) => {
   $.post(taskUrl(`vviptask_receive_list`,{"channel":"SWAT_RED_PACKET","systemId":"19","withAutoAward":1}),(error, response, data) =>{
    try{
      if (error) {
        console.log(`${JSON.stringify(error)}`)
        console.log(`API请求失败，请检查网路重试`)
      } else {
        const result = JSON.parse(data)
        // 反馈信息
        //console.log(result);
		$.tasklist=result.data;
        //result.data.forEach((item)=>{
        //  console.log(item.id);
        //})
      }}catch(e) {
          console.log(e)
        } finally {
        resolve();
      }
    })
   })
}

async function sendMsg() {
  await notify.sendNotify(`xxxx`,`${$.message}`);
}

// URL
function tokenUrl(activity,body={}) {
  return {
    url: `${JD_API_HOST}?functionId=${activity}&body=${JSON.stringify(body)}&appid=swat_miniprogram&client=tjj_m&screen=1920*1080&osVersion=5.0.0&networkType=wifi&sdkName=orderDetail&sdkVersion=1.0.0&clientVersion=3.1.3&area=11`,
    headers: {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      'Host': 'api.m.jd.com',
      'Cookie': cookie,
      'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0"),
      'Referer': 'https://servicewechat.com/wxa5bf5ee667d91626/130/page-frame.html',
    }
  }
}

// URL
function taskUrl(activity,body={}) {
  return {
    url: `${JD_API_HOST}?functionId=${activity}&fromType=wxapp`,
    body:`body=${JSON.stringify(body)}&appid=swat_miniprogram&client=tjj_m&screen=1920*1080&osVersion=5.0.0&networkType=wifi&sdkName=orderDetail&sdkVersion=1.0.0&clientVersion=3.1.3&area=11`,
    headers: {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      'Host': 'api.m.jd.com',
      'Cookie': cookie,
      'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0"),
      'Referer': 'https://servicewechat.com/wxa5bf5ee667d91626/130/page-frame.html',
    }
  }
}


// pretty-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}