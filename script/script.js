const fs = require("fs");
const path = require("path");
const pinyinPro = require("pinyin-pro");
const glob = require("glob");

const names = [
  "国家开发银行logo",
  "国家开发银行（组合）",
  "中国人民银行logo",
  "中国邮政储蓄银行logo",
  "中国人民银行（组合）",
  "中国邮政储蓄银行（组合）",
  "中国进出口银行logo",
  "中国工商银行logo",
  "中国工商银行（组合）",
  "中国农业银行logo",
  "中国银行logo",
  "建设银行logo",
  "建设银行（组合）",
  "交通银行logo",
  "交通银行（组合）",
  "中信银行logo",
  "中信银行（组合）",
  "中国农业银行（组合）",
  "中国银行（组合）",
  "中国进出口银行（组合）",
  "中国光大银行logo",
  "中国光大银行（组合）",
  "华夏银行logo",
  "华夏银行（组合）",
  "中国民生银行logo",
  "中国民生银行（组合）",
  "广发银行logo",
  "广发银行（组合）",
  "招商银行logo",
  "招商银行（组合）",
  "兴业银行logo",
  "兴业银行（组合）",
  "浦发银行",
  "浦发银行（组合）",
  "平安银行（组合）",
  "平安银行logo",
  "恒丰银行logo",
  "恒丰银行（组合）",
  "渤海银行logo",
  "渤海银行（组合）",
  "浙商银行logo",
  "浙商银行（组合）",
  "北京银行logo",
  "北京银行（组合）",
  "沧州银行（组合）",
  "廊坊银行（组合）",
  "承德银行（组合）",
  "保定银行（组合）",
  "秦皇岛银行logo",
  "秦皇岛银行（组合）",
  "承德银行logo",
  "唐山银行logo",
  "沧州银行logo",
  "廊坊银行logo",
  "天津银行logo",
  "河北银行logo",
  "邯郸市商业银行logo",
  "保定银行logo",
  "唐山银行（组合）",
  "邢台银行logo",
  "邢台银行（组合）",
  "天津银行（组合）",
  "河北银行（组合）",
  "邯郸市商业银行（组合）",
  "湖州市商业银行logo",
  "锦州银行logo",
  "阜新银行logo",
  "大连银行logo",
  "张家口银行logo",
  "鞍山银行logo",
  "铁岭银行logo",
  "吉林银行logo",
  "宁波通商银行logo",
  "大同银行logo",
  "乌海银行logo",
  "盛京银行logo",
  "金华银行logo",
  "包商银行logo",
  "江苏银行logo",
  "泰隆银行logo",
  "大庆市商业银行logo",
  "台州银行logo",
  "抚顺银行logo",
  "阳泉市商业银行logo",
  "南京银行（组合）",
  "盘锦银行logo",
  "营口银行logo",
  "长治银行logo",
  "浙江稠州商业银行logo",
  "湖州银行logo",
  "杭州银行logo",
  "朝阳银行logo",
  "葫芦岛银行logo",
  "湖州市商业银行（组合）",
  "浙江民泰商行logo",
  "包商银行（组合）",
  "阳泉市商业银行（组合）",
  "辽阳银行logo",
  "苏州银行（组合）",
  "晋商银行logo",
  "龙江银行（组合）",
  "丹东银行logo",
  "阜新银行（组合）",
  "江苏银行（组合）",
  "晋城银行logo",
  "鞍山银行（组合）",
  "龙江银行logo",
  "鄂尔多斯银行logo",
  "大庆市商业银行（组合）",
  "温州银行logo",
  "苏州银行logo",
  "金华银行（组合）",
  "温州银行（组合）",
  "南京银行logo",
  "湖州银行（组合）",
  "营口银行（组合）",
  "盘锦银行（组合）",
  "大同银行（组合）",
  "葫芦岛银行（组合）",
  "杭州银行（组合）",
  "锦州银行（组合）",
  "张家口银行（组合）",
  "泰隆银行（组合）",
  "吉林银行（组合）",
  "抚顺银行（组合）",
  "绍兴银行（组合）",
  "丹东银行（组合）",
  "铁岭银行（组合）",
  "哈尔滨银行logo",
  "辽阳银行（组合）",
  "晋商银行（组合）",
  "宁波通商银行（组合）",
  "朝阳银行（组合）",
  "乌海银行（组合）",
  "晋城银行（组合）",
  "浙江稠州商业银行（组合）",
  "大连银行（组合）",
  "浙江民泰商行（组合）",
  "鄂尔多斯银行（组合）",
  "台州银行（组合）",
  "长治银行（组合）",
  "哈尔滨银行（组合）",
  "盛京银行（组合）",
  "绍兴银行logo",
  "宁波银行logo",
  "江苏长江商业银行logo",
  "江苏长江商业银行（组合）",
  "宁波银行（组合）",
  "上海银行logo",
  "上海银行（组合）",
  "安顺市商业银行logo",
  "成都银行logo",
  "安顺市商业银行（组合）",
  "重庆三峡银行logo",
  "成都银行（组合）",
  "达州银行logo",
  "重庆三峡银行（组合）",
  "重庆银行（组合）",
  "重庆银行logo",
  "富滇银行logo",
  "达州银行（组合）",
  "甘肃银行logo",
  "贵阳银行logo",
  "贵州银行logo",
  "兰州银行logo",
  "凉山商业银行logo",
  "富滇银行（组合）",
  "甘肃银行（组合）",
  "泸州银行logo",
  "绵阳商业银行logo",
  "宁夏银行logo",
  "攀枝花市商业银行logo",
  "乐山市商业银行logo",
  "青海银行logo",
  "石嘴山银行logo",
  "四川天府银行logo",
  "西安银行logo",
  "遂宁银行logo",
  "雅安市商业银行logo",
  "宜宾商业银行logo",
  "云南红塔银行logo",
  "长安银行logo",
  "自贡银行logo",
  "曲靖市商业银行logo",
  "长城华西银行logo",
  "兰州银行（组合）",
  "贵阳银行（组合）",
  "云南红塔银行（组合）",
  "攀枝花市商业银行（组合）",
  "遂宁银行（组合）",
  "雅安市商业银行（组合）",
  "自贡银行（组合）",
  "泸州银行（组合）",
  "乐山市商业银行（组合）",
  "宜宾商业银行（组合）",
  "长城华西银行（组合）",
  "绵阳商业银行（组合）",
  "曲靖市商业银行（组合）",
  "石嘴山银行（组合）",
  "宁夏银行（组合）",
  "贵州银行（组合）",
  "青海银行（组合）",
  "凉山商业银行（组合）",
  "四川天府银行（组合）",
  "西安银行（组合）",
  "长安银行（组合）",
  "安阳银行logo",
  "广东华兴银行logo",
  "广西北部湾银行",
  "华融湘江银行logo",
  "广州银行logo",
  "汉口银行logo",
  "安阳银行（组合）",
  "东莞银行（组合）",
  "鹤壁银行logo",
  "湖北银行logo",
  "焦作市商业银行logo",
  "桂林银行（组合）",
  "开封市商业银行logo",
  "洛阳银行logo",
  "华润银行logo",
  "广东南粤银行logo",
  "深证商业银行",
  "三湘银行logo",
  "柳州银行logo",
  "长沙银行",
  "徽商银行logo",
  "桂林银行logo",
  "商丘市商业银行logo",
  "鹤壁银行（组合）",
  "中原银行logo",
  "平顶山银行logo",
  "周口银行logo",
  "广西北部湾银行（组合）logo",
  "郑州银行logo",
  "徽商银行（组合）",
  "许昌银行logo",
  "广东华兴银行（组合）",
  "焦作市商业银行（组合）",
  "广州银行（组合）",
  "新乡银行logo",
  "三湘银行（组合）",
  "柳州银行（组合）",
  "广东南粤银行（组合）",
  "信阳银行logo",
  "长沙银行（组合）",
  "开封市商业银行（组合）",
  "洛阳银行（组合）",
  "新乡银行（组合）",
  "东莞银行logo",
  "郑州银行（组合）",
  "南阳银行logo",
  "汉口银行（组合）",
  "华融湘江银行（组合）",
  "深证商业银行（组合）",
  "南阳银行（组合）",
  "商丘市商业银行（组合）",
  "湖北银行（组合）",
  "华润银行（组合）",
  "信阳银行（组合）svg",
  "许昌银行（组合）",
  "平顶山银行（组合）",
  "中原银行（组合）",
  "周口银行（组合）",
  "德州银行logo",
  "东营银行logo",
  "德州银行（组合）",
  "福建海峡银行logo",
  "福建海峡银行（组合）",
  "东营银行（组合）",
  "赣州银行logo",
  "哈密市商业银行logo",
  "赣州银行（组合）",
  "汇和银行logo",
  "济宁银行logo",
  "江西银行logo",
  "汇和银行（组合）",
  "九江银行logo",
  "景德镇商业银行logo",
  "库尔勒市商业银行logo",
  "昆仑银行logo",
  "莱商银行logo",
  "哈密市商业银行（组合）",
  "临商银行logo",
  "齐商银行logo",
  "青岛银行logo",
  "日照银行logo",
  "厦门银行logo",
  "威海商业银行logo",
  "齐鲁银行logo",
  "潍坊银行logo",
  "泰安银行logo",
  "乌鲁木齐商业银行logo",
  "西藏银行logo",
  "枣庄银行logo",
  "烟台银行logo",
  "上饶银行logo",
  "齐鲁银行（组合）",
  "莱商银行（组合）",
  "江西银行（组合）",
  "九江银行（组合）",
  "临商银行（组合）",
  "烟台银行（组合）",
  "景德镇商业银行（组合）",
  "青岛银行（组合）",
  "枣庄银行（组合）",
  "济宁银行（组合）",
  "厦门银行（组合）",
  "泉州银行logo",
  "上饶银行（组合）",
  "昆仑银行（组合）",
  "库尔勒市商业银行（组合）",
  "日照银行（组合）",
  "齐商银行（组合）",
  "威海商业银行（组合）",
  "泰安银行（组合）",
  "潍坊银行（组合）",
  "乌鲁木齐商业银行（组合）",
  "西藏银行（组合）",
  "泉州银行（组合）",
  "安徽舒城农村商业银行logo",
  "北京农商银行logo",
  "安徽舒城农村商业银行（组合）",
  "北京顺义银座村镇银行logo",
  "常熟农商logo",
  "沧州融信农商logo",
  "北京顺义银座村镇银行（组合）",
  "池州九华农商logo",
  "重庆农商logo",
  "东莞农商logo",
  "佛山农商logo",
  "常熟农商（组合）",
  "高明农商logo",
  "杭州联合银行logo",
  "广东农商logo",
  "广东揭阳农商logo",
  "合肥科技农商logo",
  "广西农村信用社logo",
  "沧州融信农商（组合）",
  "洪都农商logo",
  "佛山农商（组合）",
  "惠州农商logo",
  "建湖农商logo",
  "江门农商logo",
  "江苏句容农商logo",
  "江南农村商业银行logo",
  "江苏靖江农商logo",
  "江苏兴化农商logo",
  "江苏如皋农商logo",
  "江苏扬州农商logo",
  "黄河农商logo",
  "江阴农商logo",
  "江苏宜兴农商logo",
  "九台农商logo",
  "连云港东方农商logo",
  "北京农商银行（组合）",
  "昆山农商logo",
  "陆丰农村信用社logo",
  "路程农村合作银行logo",
  "路桥农村合作银行logo",
  "马鞍山农商logo",
  "南海农商logo",
  "江苏射阳农商银行logo",
  "南通农商银行logo",
  "池州九华农商（组合）",
  "上海农商logo",
  "顺德农商logo",
  "深圳农商logo",
  "台州农村合作银行logo",
  "泰州农村商业银行logo",
  "天津农商logo",
  "吴江农商logo",
  "湖滨农商logo",
  "无锡农商logo",
  "芜湖扬子农商logo",
  "新会农商logo",
  "江门融合农商logo",
  "新沂农商logo",
  "伊川农商logo",
  "湖南华容农商logo",
  "湖南省农村信用社logo",
  "山东省农村信用社logo",
  "中山农商logo",
  "珠海农商logo",
  "紫金农商logo",
  "太仓农商logo",
  "武汉农商logo",
  "南海农商（组合）",
  "浙江农村信用社联合社logo",
  "清远农商logo",
  "张家港农商logo",
  "江门农商（组合）",
  "九台农商（组合）",
  "建湖农商（组合）",
  "广西农村信用社（组合）",
  "栾川农商logo",
  "合肥科技农商（组合）",
  "昆山农商（组合）",
  "广东农商（组合）",
  "湖滨农商（组合）",
  "长春农商logo",
  "许昌魏都农商logo",
  "江苏靖江农商（组合）",
  "江苏射阳农商银行（组合）",
  "清远农商（组合）",
  "杭州联合银行（组合）",
  "江阴农商（组合）",
  "东莞农商（组合）",
  "天津滨海农商logo",
  "江苏兴化农商（组合）",
  "太仓农商（组合）",
  "重庆农商（组合）",
  "栾川农商（组合）",
  "山东省农村信用社（组合）",
  "天津农商（组合）",
  "高明农商（组合）",
  "张家港农商（组合）",
  "伊川农商（组合）",
  "南通农商银行（组合）",
  "芜湖扬子农商（组合）",
  "江苏句容农商（组合）",
  "路桥农村合作银行（组合）",
  "路程农村合作银行（组合）",
  "马鞍山农商（组合）",
  "珠海农商（组合）",
  "江苏宜兴农商（组合）",
  "江苏扬州农商（组合）",
  "惠州农商（组合）",
  "无锡农商（组合）",
  "吴江农商（组合）",
  "武汉农商（组合）",
  "江南农村商业银行（组合）",
  "许昌魏都农商（组合）",
  "顺德农商（组合）",
  "浙江农村信用社联合社（组合）",
  "连云港东方农商（组合）",
  "洪都农商（组合）",
  "湖南华容农商（组合）",
  "上海农商（组合）",
  "广东揭阳农商（组合）",
  "新沂农商（组合）",
  "江门融合农商（组合）",
  "湖南省农村信用社（组合）",
  "紫金农商（组合）",
  "新会农商（组合）",
  "台州农村合作银行（组合）",
  "黄河农商（组合）",
  "陆丰农村信用社（组合）",
  "江苏如皋农商（组合）",
  "中山农商（组合）",
  "深圳农商（组合）",
  "泰州农村商业银行（组合）",
  "天津滨海农商（组合）",
  "长春农商（组合）",
  "大新银行logo",
  "东亚银行logo",
  "东亚银行（组合）",
  "恒生银行logo",
  "华侨永亨银行logo",
  "华侨永亨银行（组合）",
  "大新银行（组合）",
  "南洋商业银行logo",
  "恒生银行（组合）",
  "南洋商业银行（组合）",
  "富邦华一银行logo",
  "浦发硅谷银行logo",
  "华商银行logo",
  "华商银行（组合）",
  "厦门国际银行logo",
  "中信嘉华银行（组合）",
  "浦发硅谷银行（组合）",
  "厦门国际银行（组合）",
  "中德住房储蓄银行（组合）",
  "富邦华一银行（组合）",
  "中德住房储蓄银行logo",
  "中信嘉华银行logo_",
  "第一银行logo",
  "国泰世华银行logo",
  "合作金库银行logo",
  "第一银行（组合）",
  "台湾土地银行logo",
  "永丰银行logo",
  "台湾土地银行（组合）",
  "台湾玉山银行logo",
  "王道银行logo",
  "兆丰国际商业银行logo",
  "合作金库银行（组合）",
  "永丰银行（组合）",
  "台湾玉山银行（组合）",
  "国泰世华银行（组合）",
  "中国信托logo",
  "兆丰国际商业银行（组合）",
  "王道银行（组合）",
  "中国信托（组合）",
  "正信银行logo",
  "正信银行（组合）",
  "渣打银行logo",
  "渣打银行（组合）",
  "荷兰银行logo",
  "荷兰银行（组合）",
  "横滨银行logo",
  "花旗银行logo",
  "花旗银行（组合）",
  "横滨银行（组合）",
  "华美银行logo",
  "华侨银行logo",
  "汇丰银行logo",
  "名古屋银行logo",
  "摩根大通银行logo",
  "摩根士丹利国际银行logo",
  "汇丰银行（组合）",
  "名古屋银行（组合）",
  "华侨银行（组合）",
  "摩根大通银行（组合）",
  "盘谷银行logo",
  "瑞穗实业银行logo",
  "瑞士银行logo",
  "三井住友银行logo",
  "三菱UFJ银行（日联）logo",
  "新韩银行logo",
  "摩根士丹利国际银行（组合）",
  "华美银行（组合）",
  "三菱UFJ银行（日联）（组合）",
  "苏格兰皇家银行logo",
  "瑞士银行（组合）",
  "星展银行logo",
  "山口银行logo",
  "瑞穗实业银行（组合）",
  "三井住友银行（组合）",
  "台湾中小企业银行logo",
  "苏格兰皇家银行（组合）",
  "山口银行（组合）",
  "新韩银行（组合）",
  "台湾中小企业银行（组合）",
  "盘谷银行（组合）",
  "星展银行（组合）",
  "法兴银行logo",
  "菲律宾首都银行logo",
  "法兴银行（组合）",
  "菲律宾首都银行（组合）",
  "韩国国民银行logo",
  "韩国国民银行（组合）",
  "韩国企业银行logo",
  "韩国外换银行（组合）",
  "韩国外换银行logo",
  "韩国友利银行logo",
  "韩亚银行logo",
  "韩国企业银行（组合）",
  "韩国友利银行（组合）",
  "韩亚银行（组合）",
  "法国巴黎银行logo",
  "法国巴黎银行（组合）",
  "法国汇理银行logo",
  "法国汇理银行（组合）",
  "德意志银行logo",
  "德意志银行（组合）",
  "大华银行logo",
  "大华银行（组合）",
  "澳新银行（组合）",
  "澳新银行logo",
  "澳门商业银行logo",
  "澳门商业银行（组合）",
  "北欧斯安银行logo",
  "巴克莱银行logo",
  "北欧斯安银行（组合）",
  "巴克莱银行（组合）",
  "波士顿银行logo",
  "比利时银行logo",
  "波士顿银行（组合）",
  "比利时银行（组合）",
  "德累斯顿银行（组合）",
  "东京三菱银行logo",
  "德累斯顿银行logo",
  "东京三菱银行（组合）",
  "法国里昂信贷银行logo",
  "加拿大丰业银行logo",
  "蒙特利尔银行logo",
  "加拿大丰业银行（组合）",
  "加拿大皇家银行logo",
  "法国里昂信贷银行（组合）",
  "马来亚银行logo",
  "三和银行logo",
  "台湾银行logo",
  "美国银行logo",
  "加拿大皇家银行（组合）",
  "证监会logo",
  "蒙特利尔银行（组合）",
  "中国兵器工业集团logo",
  "萧山农村合作银行logo",
  "瑞典银行logo",
  "中国银行业协会logo",
  "鄞州银行logo",
  "香港交易所logo",
  "中华开发工业银行logo",
  "中国银行业监督logo",
  "萧山农村合作银行（组合）",
  "武汉众邦银行logo",
  "美国银行（组合）",
  "马来亚银行（组合）",
  "瑞典银行（组合）",
  "中华开发工业银行（组合）",
  "证监会（组合）",
  "中国兵器工业集团（组合）",
  "中国银行业监督（组合）",
  "台湾银行（组合）",
  "鄞州银行（组合）",
  "武汉众邦银行（组合）",
  "香港交易所（组合）",
  "中国银行业协会（组合）",
  "三和银行（组合）",
];

const xufunames = [
  "交通银行（组合）",
  "兴业银行（组合）",
  "浦发银行（组合）",
  "北京银行（组合）",
  "贵州银行（组合）",
  "四川天府银行（组合）",
  "曲靖市商业银行（组合）",
  "汉口银行（组合）",
  "鹤壁银行（组合）",
  "开封市商业银行（组合）",
  "平顶山银行（组合）",
  "新乡银行（组合）",
  "东营银行（组合）",
  "北京农商银行（组合）",
  "重庆农商（组合）",
  "东亚银行（组合）",
  "华侨永亨银行（组合）",
  "合作金库银行（组合）",
  "台湾土地银行（组合）",
  "台湾玉山银行（组合）",
  "华侨银行（组合）",
  "盘谷银行（组合）",
  "苏格兰皇家银行（组合）",
  "菲律宾首都银行（组合）",
  "德意志银行（组合）",
  "澳新银行（组合）",
  "巴克莱银行（组合）",
  "加拿大丰业银行（组合）",
  "瑞典银行（组合）",
];

async function getFilesInDirectory(dirPath) {
  try {
    const files = await fs.readdir(dirPath);
    const filteredFiles = files.filter((file) => {
      return file.endsWith("zuhe.svg");
    });
    console.log(filteredFiles.length); // 输出过滤后的文件数量
    return filteredFiles;
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

async function moveFiles(sourceDir, targetDir, files) {
  try {
    // 确保目标文件夹存在
    await fs.mkdir(targetDir, { recursive: true });

    for (const file of files) {
      const sourceFilePath = path.join(sourceDir, file);
      const targetFilePath = path.join(targetDir, file);
      await fs.rename(sourceFilePath, targetFilePath);
      console.log(`Moved ${sourceFilePath} to ${targetFilePath}`);
    }
  } catch (err) {
    console.error("Error moving files:", err);
  }
}

async function updateSvgFillColor(sourceFilePath, targetFilePath) {
  try {
    // 读取SVG文件内容
    let svgContent = await fs.readFile(sourceFilePath, "utf8");

    // 查找并替换第一个<path>元素的fill属性
    svgContent = svgContent.replace(/(<path\s+[^>]*?fill=")([^"]*?)(")/, "$1$200$3");

    // 写回修改后的内容到SVG文件
    await fs.writeFile(targetFilePath, svgContent, "utf8");
    console.log(`Updated fill color in ${targetFilePath}`);
  } catch (err) {
    console.error("Error updating SVG file:", err);
  }
}

async function convertTextToPinyin(text) {
  try {
    const pinyin = pinyinPro.convertToPinyinString(text, "", { toneType: "none" });
    console.log(`Original Text: ${text}`);
    console.log(`Pinyin: ${pinyin}`);
    return pinyin;
  } catch (err) {
    console.error("Error converting text to pinyin:", err);
  }
}

function rename(name) {
  if (!name.endsWith("银行") && !name.endsWith("信用社") && !name.endsWith("联合社")) {
    if (name.endsWith("农商")) {
      return name + "银行";
    }
    if (name.endsWith("商行")) {
      return name.replace("商行", "商业银行");
    }
  }
  return name;
}

function moveFile(name, targetDir, suffix = ".svg", newSuffix = ".svg") {
  const filePath = path.resolve(__dirname, "../bank_icon");
  const options = { toneType: "none", type: "array", segmentit: 3, v: true };
  const pinyin = pinyinPro.pinyin(name, options).join("");
  const sourceFile = path.join(filePath, pinyin + suffix);
  if (!fs.existsSync(sourceFile)) {
    console.log("文件不存在", sourceFile);
    return;
  }
  const new_name = rename(name);
  const new_pinyin = pinyinPro.pinyin(new_name, options).join("");
  const targetFile = path.join(targetDir, new_pinyin + newSuffix);
  fs.renameSync(sourceFile, targetFile);
  return { name: new_name, pinyin: new_pinyin, filename: targetFile };
}

(async () => {
  const xufuPath = path.resolve(__dirname, "../icon_lsdih7x8d7");
  const groupDir = path.resolve(__dirname, "../docs/group");
  fs.readdirSync(xufuPath).forEach((file, i) => {
    if (!file.endsWith(".svg")) {
      return;
    }
    let bankName = file.replace(/^([\u4e00-\u9fa5]+).*$/, "$1");
    if (bankName.endsWith("农商")) {
      bankName += "银行";
    }
    const pinyin = pinyinPro.pinyin(bankName, { toneType: "none", type: "array", segmentit: 3, v: true }).join("");
    const sourceFile = path.join(xufuPath, file);
    const targetFile = path.join(groupDir, pinyin + ".group.svg");
    if (!fs.existsSync(targetFile)) {
      console.log("文件不存在");
    } else {
      // fs.unlinkSync(targetFile);
    }
    fs.renameSync(sourceFile, targetFile);

    console.log(i, sourceFile, targetFile);
  });

  // const iconDir = path.resolve(__dirname, "../icon");
  // const groupDir = path.resolve(__dirname, "../docs/group");
  // const roundedDir = path.resolve(__dirname, "../rounded");

  // const newNames = xufunames.map((name) => {
  //   const filename = name.replace(/^([\u4e00-\u9fa5]+).*$/, "$1");
  //   // if (!filename.endsWith("银行") && !filename.endsWith("信用社") && !filename.endsWith("联合社")) {
  //   //   if (filename.endsWith("农商")) {
  //   //     return filename + "银行";
  //   //   }
  //   //   if (filename.endsWith("商行")) {
  //   //     return filename.replace("商行", "商业银行");
  //   //   }
  //   //   return null;
  //   // }
  //   return filename;
  // });
  // const filterNames = newNames.filter((name) => !!name);
  // // 使用 Set 去除重复值
  // const uniqueNewNames = [...new Set(filterNames)];
  // console.log(uniqueNewNames.length);
  // console.log(uniqueNewNames);

  // const fileList = {};
  // function generateHTML(type, fileinfo) {
  //   if (!fileList[fileinfo.pinyin]) {
  //     fileList[fileinfo.pinyin] = {};
  //   }
  //   fileList[fileinfo.pinyin][type] = fileinfo;
  // }
  // uniqueNewNames.forEach((name) => {
  //   generateHTML("rounded", moveFile(name, roundedDir, ".svg", ".rounded.svg"));
  //   generateHTML("group", moveFile(name, groupDir, ".zuhe.svg", ".group.svg"));
  //   generateHTML("icon", moveFile(name, iconDir, ".primary.svg", ".svg"));
  // });
  // fs.writeFileSync(path.join(__dirname, "../bank.min.js"), "const BANK_LIST=" + JSON.stringify(fileList));

  //   console.log(JSON.stringify(newNames));

  //   console.log(uniqueNewNames.length);
  //   uniqueNewNames.forEach((name, i) => {
  //     const pinyin = pinyinPro.pinyin(name, { toneType: "none", type: "array", segmentit: 3, v: true }).join("");
  //     const pattern = path.join(path.resolve(iconDir, "./checked"), pinyin + "*");
  //     const files = glob.sync(pattern);
  //     if (files.length === 3) {
  //       return;
  //     }
  //     // console.log(i, name, pinyin, files.length);
  //     // return;
  //     const iconPattern = path.join(iconDir, pinyin + "*");
  //     const iconfiles = glob.sync(iconPattern);
  //     if (iconfiles.length === 1) {
  //       const filename = `${pinyin}.svg`;
  //       moveFile(iconfiles[0], filename, iconDir);
  //     } else {
  //       console.log(i, name, pinyin, iconfiles);
  //     }

  //     const zuhePattern = path.join(zuheDir, pinyin + "*");
  //     const zuhefiles = glob.sync(zuhePattern);
  //     if (zuhefiles.length === 1) {
  //       const filename = `${pinyin}.zuhe.svg`;
  //       moveFile(zuhefiles[0], filename, zuheDir);
  //     } else {
  //       console.log(i, name, pinyin, iconfiles);
  //     }

  //     const primaryPattern = path.join(primaryDir, pinyin + "*");
  //     const primaryfiles = glob.sync(primaryPattern);
  //     if (primaryfiles.length === 1) {
  //       const filename = `${pinyin}.primary.svg`;
  //       moveFile(primaryfiles[0], filename, primaryDir);
  //     } else {
  //       console.log(i, name, pinyin, iconfiles);
  //     }
  //   });
})();
