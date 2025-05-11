export const SECRET_KEY =
  process.env.ZUSTAND_STORE_SECRET_KEY || "fallback-key";

// Helper to convert UTF-8 string to base64
function utf8ToBase64(str: string): string {
  return btoa(
    new TextEncoder()
      .encode(str)
      .reduce((acc, byte) => acc + String.fromCharCode(byte), "")
  );
}

// Helper to convert base64 back to UTF-8 string
function base64ToUtf8(str: string): string {
  const binary = atob(str);
  const bytes = new Uint8Array([...binary].map((char) => char.charCodeAt(0)));
  return new TextDecoder().decode(bytes);
}

export function xorEncrypt(text: string, key: string): string {
  const keyCodes = [...key].map((k) => k.charCodeAt(0));
  const xorResult = [...text]
    .map((char, i) =>
      String.fromCharCode(char.charCodeAt(0) ^ keyCodes[i % key.length])
    )
    .join("");

  return utf8ToBase64(xorResult);
}

export function xorDecrypt(encoded: string, key: string): string {
  const decoded = base64ToUtf8(encoded);
  const keyCodes = [...key].map((k) => k.charCodeAt(0));
  return [...decoded]
    .map((char, i) =>
      String.fromCharCode(char.charCodeAt(0) ^ keyCodes[i % key.length])
    )
    .join("");
}
