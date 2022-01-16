import { ReactNode } from 'react';

export const HIGHLIGHT_RegExp = /%c:(.+?):c%/i;

export interface HighlightTextType {
  text?: ReactNode;
  highlight?: ReactNode;
}

export function stringToHighlightJson(text: string): HighlightTextType[] | null {
  let str = text,
    strArr = HIGHLIGHT_RegExp.exec(str);

  if (strArr) {
    const textArr: HighlightTextType[] = [];

    for (; strArr !== null; strArr = HIGHLIGHT_RegExp.exec(str)) {
      // 普通部分
      let normalText: string | null = str.substring(0, strArr.index);

      if (normalText.trim().length) {
        textArr.push({
          text: normalText,
        });
      }

      // 高亮部分
      textArr.push({
        highlight: true,
        text: strArr[1],
      });
      str = str.substring(strArr[0].length + strArr.index);
      normalText = null;
    }
    if (str.trim().length) {
      textArr.push({
        text: str,
      });
    }
    return textArr;
  }
  return null;
}

export const emailWhitelist = [
  '@qq.com',
  '@163.com',
  '@vip.163.com',
  '@263.net',
  '@yeah.net',
  '@sohu.com',
  '@sina.cn',
  '@sina.com',
  '@eyou.com',
  '@gmail.com',
  '@hotmail.com',
  '@42du.cn',
];
export const PASSWORD_RegExp = /^(\w){6,16}$/;

export const EMAIL_RegExp = /^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/;

export function isEmail(email: string, whitelist?: string[]): boolean {
  const domains = whitelist || emailWhitelist;

  if (EMAIL_RegExp.test(email)) {
    for (let i = 0, len = domains.length; i < len; i++) {
      if (email.endsWith(domains[i])) {
        return true;
      }
    }
  }
  return false;
}
