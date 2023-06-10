const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;

export function getRandomString(length = 3) {
  const randomCharacterArray = Array.from(Array(length)).map(() => {
    return characters.charAt(Math.floor(Math.random() * charactersLength));
  })

  const randomString = randomCharacterArray.join('');

  return randomString
}
