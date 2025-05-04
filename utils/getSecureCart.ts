import { xorDecrypt, SECRET_KEY } from "./xorCrypto";

export function getSecureCart(): any[] {
  const encrypted = localStorage.getItem("nexus-store");
  if (!encrypted) throw new Error("Missing persisted store");

  let parsed;
  try {
    const decrypted = xorDecrypt(encrypted, SECRET_KEY);
    parsed = JSON.parse(decrypted);
  } catch {
    return [];
  }

  const items = parsed?.state?.items;
  if (!Array.isArray(items)) {
    return [];
  }

  return items;
}
