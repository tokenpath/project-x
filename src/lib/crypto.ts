import * as jose from "jose";

const key = new TextEncoder().encode(process.env.SECRET);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const encrypt = async (value: any): Promise<string | null> => {
    try {
      const text = typeof value === "object" ? JSON.stringify(value) : value;
  
      const jwe = await new jose.CompactEncrypt(new TextEncoder().encode(text))
        .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
        .encrypt(key);
  
      return jwe;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  };

  export const decrypt = async <T = string>(
    encryptedText?: string,
  ): Promise<T | null> => {
    if (typeof encryptedText !== "string") return null;
    try {
      const { plaintext } = await jose.compactDecrypt(encryptedText, key);
      const decrypted = new TextDecoder().decode(plaintext);
  
      try {
        return JSON.parse(decrypted) as T;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return decrypted as T;
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  };