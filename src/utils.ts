import bcrypt from "bcryptjs";

class Crypto {
  encrypt = async (pass: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const hashValue = await bcrypt.hash(pass, salt);
    return hashValue;
  };

  compare = async (password: string, hashValue: string): Promise<boolean> => {
    console.log("compare inside", password, "hashValue", hashValue);
    return await bcrypt.compare(password, hashValue).catch((err) => err);
  };
}

export const crypto = new Crypto();
