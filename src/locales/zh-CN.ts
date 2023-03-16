import type { LocaleConfig } from 'PackageNameByCore';

const zhCN: LocaleConfig = {
  language: 'zh_CN',
  title: '简体中文',
  translation: {
    'route-home': '主页',
    'route-password': '修改密码',
    'route-forgot-password': '忘记密码',
    'route-login': '登录',
    'route-app-one': '微应用1',
    'route-app-one/dynamic/:id': '微应用1: 动态路由-ID',
    'route-app-one/home': '微应用1: 主页',
    jump: '跳转',
    about: '关于',
    unknown: '未知',
    reincarnation: '投胎中',
    email: '电子邮箱',
    username: '用户名',
    'user-info': '用户信息',
    password: '密码',
    remember: '记住我',
    'verify-code': '安全码',
    'sign-in': '登录',
    'sign-in-username': '用户名登录',
    'sign-in-email': '邮箱登录',
    'sign-out': '登出',
    'new-password': '新密码',
    'get-verify-code': '获取安全码',
    'ph:len-range': '`长度为${val}个字符!`',
    'ph:maxlen': '`请在 ${val} 个字符内描述清楚`',
    'ph:username': '请填写用户名',
    'ph:password': '请填写密码',
    'ph:email': '请填写电子邮箱',
    'ph:validator-email': '请填写正确的电子邮箱',
    'ph:please-fill': '请填写',
    'ph:fill-correct': '请填写合法的',
  },
};

export default zhCN;
