const emailWhitelist = ['@qq.com', '@163.com', '@vip.163.com'];

export function isEmail(email: string, whitelist?: string[]): boolean {
  const domains = whitelist || emailWhitelist;

  if (/^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/.test(email)) {
    for (let i = 0, len = domains.length; i < len; i++) {
      if (email.endsWith(domains[i])) {
        return true;
      }
    }
  }
  return false;
}
