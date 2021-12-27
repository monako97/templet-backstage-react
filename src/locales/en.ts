import type { LocalesConfType } from 'plugin-runtime';

const en: LocalesConfType = {
  namespace: 'en',
  title: '英文',
  translation: {
    'route-home': 'Home',
    'route-password': 'Change password',
    'route-forgot-password': 'Forgot password',
    'route-login': 'Login',
    'route-dynamic/:id': 'Dynamic ID',
    'route-dynamic/:id/:name': 'Dynamic ID Name',
    'route-home/dynamic/:id': 'Home Dynamic ID',
    'route-home/dynamic/:id/:name': 'Home Dynamic ID Name',
    'route-micro': 'Micro',
    'route-micro/dynamic/:id': 'Micro: Dynamic ID',
    'route-micro/dynamic/:id/:name': 'Micro: Dynamic ID Name',
    'route-micro/home': 'Micro: Home',
    'route-micro/home/dynamic/:id': 'Micro: Home Dynamic ID',
    'route-micro/home/dynamic/:id/:name': 'Micro: Home Dynamic ID Name',
    'sub-page-view': 'Sub page view',
    jump: 'Jump',
    email: 'Email',
    username: 'User Name',
    'user-info': 'User information',
    password: 'Password',
    remember: 'Remember',
    about: 'About',
    unknown: 'Unknown',
    reincarnation: 'Reincarnation',
    'verify-code': 'Verify Code',
    'sign-in': 'Signin',
    'sign-in-username': 'Signin by Username',
    'sign-in-email': 'Signin by Email',
    'sign-out': 'Sign out',
    'new-password': 'New Password',
    'get-verify-code': 'Get Verify Code',
    'ph:len-range': '`The length is ${val} characters!`',
    'ph:maxlen': '`Please describe clearly within ${val} characters!`',
    'ph:username': 'Please fill in the user name',
    'ph:password': 'Please fill in the password',
    'ph:email': 'Please fill in your email address',
    'ph:validator-email': 'Please fill in the correct email address',
    'ph:please-fill': 'Please fill in',
    'ph:fill-correct': 'Please fill in the legal'
  }
};

export default en;
