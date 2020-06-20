import lzString from 'lz-string';

export function compressUrl (str) {
    return lzString.compressToEncodedURIComponent(str);
}

export function decompressUrl (str) {
    return lzString.decompressFromEncodedURIComponent(str);
}

export function compress (str) {
    return lzString.compress(str);
}

export function decompress (str) {
    return lzString.decompress(str);
}
