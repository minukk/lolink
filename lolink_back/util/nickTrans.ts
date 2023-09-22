export function nickTrans(email) {
  const nickname = email.split('@')[0] + Math.floor(Math.random() * 100000);

  return nickname;
}
