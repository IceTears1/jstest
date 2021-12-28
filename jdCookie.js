/*
此文件为Node.js专用。其他用户请忽略
 */
//此处填写京东账号cookie。
let CookieJDs = [



'pt_key=app_openAAJhySpRADCGXHUwzsE5p4_ghBVidZzVEzDZLSKNZqm4LLUfF_-ImB0o_3AyjdVOMdsiE5mPSMo;pt_pin=18014246678_p;',


'pt_key=app_openAAJhySpSADDXd29qDzQXvSVmiwOlFZu36a5iylq0WiUy1yF8IQQblvVhY-lmXA26VTBlKDJSXo0;pt_pin=jd_FdDjJBENiJzA;',


'pt_key=app_openAAJhySpTADBjweC0FYSh7w7-yehDzFit3stYiLCYD_jxMkNF5V1PBFfO3iMDuUOynQ4nvUjArXw;pt_pin=18915299015_p;',


'pt_key=app_openAAJhySpSADCCEVq9r53AY8lCiO4O7CGZp6V2mTk8Greb6eRLra3dF0dPO-zrCcN5eAheJ5u9dr8;pt_pin=jd_41c752f800930;',


'pt_key=app_openAAJhySpSADBEKD6IrJGPDTGzc5ZKF51VTvifIGgjtPwHq4MxjkvCAUMgotr4Fa9nB1tu8PMt1wY;pt_pin=jd_oKMcRZnuBXfM;',


'pt_key=app_openAAJhySpTADAzAZfFLt-FM0zB-asuhvB_kK_DSbsV33J_ni_x_x-QoV90A2Wl-ACPqjbDenHNAoI;pt_pin=269569205;',


'pt_key=app_openAAJhySpVADBE3IUiOg4q2tF0-7WFkGfXbUtYbIGJJG-RQdP06U-slsM342ZO5D7Bd_pY598SK4s;pt_pin=jd_718b10084be4f;',


'pt_key=app_openAAJhySpWADDJYMT2E3k6mGfRJ7-5xksOJ1SNsANBCnJPfXuZ-ikUNCDsX0VCb4unhrLpYMblrr8;pt_pin=jd_6f4e83ff6ee5a;',


'pt_key=AAJhv1u1ADCsevNkaM9U1Vw7riSmkTxfEtcngqDCfsaMbAw6xOivbvc1Fh66NMlOjnqGjuhScmI;pt_pin=jd_6ead2d080d1c1;',


'pt_key=AAJhv1y1ADCwQ-KMJ7QekM5iQENJRXM3X1HXKuPQH8H73WVR6MEx92jgy-3lXbuM5ADVFFtEb34;pt_pin=jd_6a5ad4aa036da;',


'pt_key=app_openAAJhySpWADDzXaZ8CpTEFjvNFae8tipTX-bi2lGmnO1Qq8KfpUrwdQ3X_hyKE-zUhEf8mvnb9N8;pt_pin=Anco-tan;',


'pt_key=AAJhphJhADAvxkiMaXDvpw5AhE9iw_lGcTM7gZp3D8QFQWd7_kURPlW5126Mnes0t5V-4Fk4C3k;pt_pin=olovemax;',


'pt_key=AAJhsdfRADCdpGIgkt_WbkeTrxg18cJsj3K-74YS-Wa7BOoO8QfODKapEg4tyH0ELnww9O1O89Y;pt_pin=%E6%9A%B4%E5%BE%92%E4%B8%80%E6%9D%A1;',


'pt_key=app_openAAJhySpWADBObKAVk1B0TI9jN4DJk77jve-ioPydOb-3Uph7c0ZwDr8Gfwm7DOkBqSZn46KTOmM;pt_pin=jd_56d2a97a8a45e;',


'pt_key=AAJhrXbQADDVNT98hVdIXD9K3Mo4PAIKTCWlOk9wIcEdmGATS8CdEklon3f68HYasusK6BINpGs;pt_pin=aqian087;',


'pt_key=AAJhtzMGADAX79eqwBMvjRif-HPGb2nglcQya94JNzsYikSEpjRIbvLGnOZgSX9SzhQCZRMbSrQ;pt_pin=jd_407d12bebff84;',


'pt_key=AAJhtzRJADA-9IoylGN3hgEaJHs93wxxiOkP_yyMoMfIjeB7QF4skGYPoJCYA6UwK9fM7BOGqas;pt_pin=jd_7657cfade9bce;',


'pt_key=AAJhph1mADDPgi5UAGhlv4rdIVMW-HuCnJ-h95Sy5A1UCi982k6Vs2pMTuGfjXGmx4Yl5rCTwHA;pt_pin=jd_6474d22a51041;',


'pt_key=AAJhphyAADAhWbsURrzriYAGmVQHdI2Mvdfout1NriaBhxV0tPpRdHDQPzbWR_y-9kKNId4dcFA;pt_pin=%E4%B9%90%E4%BA%8B%E6%97%A0%E6%9E%81%E9%99%90;',

]
// 判断环境变量里面是否有京东ck
if (process.env.JD_COOKIE) {
  if (process.env.JD_COOKIE.indexOf('&') > -1) {
    CookieJDs = process.env.JD_COOKIE.split('&');
  } else if (process.env.JD_COOKIE.indexOf('\n') > -1) {
    CookieJDs = process.env.JD_COOKIE.split('\n');
  } else {
    CookieJDs = [process.env.JD_COOKIE];
  }
}
if (JSON.stringify(process.env).indexOf('GITHUB')>-1) {
  console.log(`请勿使用github action运行此脚本,无论你是从你自己的私库还是其他哪里拉取的源代码，都会导致我被封号\n`);
  !(async () => {
    await require('./sendNotify').sendNotify('提醒', `请勿使用github action、滥用github资源会封我仓库以及账号`)
    await process.exit(0);
  })()
}
CookieJDs = [...new Set(CookieJDs.filter(item => !!item))]
console.log(`\n====================共${CookieJDs.length}个京东账号Cookie=========\n`);
console.log(`==================脚本执行- 北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000).toLocaleString()}=====================\n`)
if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
for (let i = 0; i < CookieJDs.length; i++) {
  if (!CookieJDs[i].match(/pt_pin=(.+?);/) || !CookieJDs[i].match(/pt_key=(.+?);/)) console.log(`\n提示:京东cookie 【${CookieJDs[i]}】填写不规范,可能会影响部分脚本正常使用。正确格式为: pt_key=xxx;pt_pin=xxx;（分号;不可少）\n`);
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['CookieJD' + index] = CookieJDs[i].trim();
}
