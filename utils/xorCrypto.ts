// utils/xorCrypto.ts

export const SECRET_KEY =
  process.env.ZUSTAND_STORE_SECRET_KEY || "fallback-key";

// XOR encryption (sync-safe, simple obfuscation)
export function xorEncrypt(text: string, key: string): string {
  const keyCodes = [...key].map((k) => k.charCodeAt(0));
  return btoa(
    [...text]
      .map((char, i) =>
        String.fromCharCode(char.charCodeAt(0) ^ keyCodes[i % key.length])
      )
      .join("")
  );
}

export function xorDecrypt(encoded: string, key: string): string {
  const decoded = atob(encoded);
  const keyCodes = [...key].map((k) => k.charCodeAt(0));
  return [...decoded]
    .map((char, i) =>
      String.fromCharCode(char.charCodeAt(0) ^ keyCodes[i % key.length])
    )
    .join("");
}
