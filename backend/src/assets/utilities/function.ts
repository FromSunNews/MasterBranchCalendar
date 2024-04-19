export const handleResultAPI = <T>(isSuccess: boolean, message: string, result: T) => {
  return {
    isSuccess,
    message,
    result
  }
}


export const getRandomID = (length: number = 18) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};