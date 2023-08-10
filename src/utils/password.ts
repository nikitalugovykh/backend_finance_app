import {hash, compare} from 'bcrypt';

export const getHashedPassword = async (password: string, salt: number) => {
    const hashedPassword = await new Promise<string>((resolve, reject) => {
      hash(
        password,
        salt,
        function(err, hash) {
          if (err) reject(err);
          resolve(hash);
        });
    });

    return hashedPassword
}


export const comparePassword = async (hashedPassword: string, newPassword: string) => {
  const isSame = await new Promise<string>((resolve, reject) => {
    compare(
      newPassword,
      hashedPassword,
      function(err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
  });

  return isSame
}