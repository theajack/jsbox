import {
    compressToEncodedURIComponent,
    decompressFromEncodedURIComponent,
    compress as _compress,
    decompress as _decompress,
} from 'lz-string';

export function compressUrl (str) {
    return compressToEncodedURIComponent(str);
}

export function decompressUrl (str) {
    return decompressFromEncodedURIComponent(str);
}

export function compress (str) {
    return _compress(str);
}

export function decompress (str) {
    return _decompress(str);
}
