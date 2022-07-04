export const decodeBase64Url = (str: string): Uint8Array => {
  return decodeBase64(str.replace(/_|-/g, (m) => ({ _: "/", "-": "+" }[m]!)))
};

export const encodeBase64Url = (buf: ArrayBufferLike): string =>
  encodeBase64(buf).replace(/\/|\+/g, (m) => ({ "/": "_", "+": "-" }[m]!));

// This approach is written in MDN.
// btoa does not support utf-8 characters. So we need a little bit hack.
export const encodeBase64 = (buf: ArrayBufferLike): string => {
  const binary = String.fromCharCode(...new Uint8Array(buf))
  return btoa(binary)
}

// atob does not support utf-8 characters. So we need a little bit hack.
const decodeBase64 = (str: string): Uint8Array => {
  const binary = atob(str)
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let i = 0; i < binary.length ; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes
}