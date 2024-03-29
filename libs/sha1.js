/*
 * Crypto-JS v2.5.4
 * http://code.google.com/p/crypto-js/
 * (c) 2009-2012 by Jeff Mott. All rights reserved.
 * http://code.google.com/p/crypto-js/wiki/License
 */
(typeof Crypto == "undefined" || !Crypto.util) && function () {
    var d = window.Crypto = {}, m = d.util = {
        rotl: function (b, c) { return b << c | b >>> 32 - c }, rotr: function (b, c) { return b << 32 - c | b >>> c }, endian: function (b) { if (b.constructor == Number) return m.rotl(b, 8) & 16711935 | m.rotl(b, 24) & 4278255360; for (var c = 0; c < b.length; c++) b[c] = m.endian(b[c]); return b }, randomBytes: function (b) { for (var c = []; b > 0; b--) c.push(Math.floor(Math.random() * 256)); return c }, bytesToWords: function (b) {
            for (var c = [], a = 0, h = 0; a < b.length; a++, h += 8) c[h >>> 5] |= (b[a] & 255) <<
            24 - h % 32; return c
        }, wordsToBytes: function (b) { for (var c = [], a = 0; a < b.length * 32; a += 8) c.push(b[a >>> 5] >>> 24 - a % 32 & 255); return c }, bytesToHex: function (b) { for (var c = [], a = 0; a < b.length; a++) c.push((b[a] >>> 4).toString(16)), c.push((b[a] & 15).toString(16)); return c.join("") }, hexToBytes: function (b) { for (var c = [], a = 0; a < b.length; a += 2) c.push(parseInt(b.substr(a, 2), 16)); return c }, bytesToBase64: function (b) {
            for (var c = [], a = 0; a < b.length; a += 3) for (var h = b[a] << 16 | b[a + 1] << 8 | b[a + 2], l = 0; l < 4; l++) a * 8 + l * 6 <= b.length * 8 ? c.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(h >>>
            6 * (3 - l) & 63)) : c.push("="); return c.join("")
        }, base64ToBytes: function (b) { for (var b = b.replace(/[^A-Z0-9+\/]/ig, ""), c = [], a = 0, h = 0; a < b.length; h = ++a % 4) h != 0 && c.push(("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(b.charAt(a - 1)) & Math.pow(2, -2 * h + 8) - 1) << h * 2 | "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(b.charAt(a)) >>> 6 - h * 2); return c }
    }, d = d.charenc = {}; d.UTF8 = { stringToBytes: function (b) { return i.stringToBytes(unescape(encodeURIComponent(b))) }, bytesToString: function (b) { return decodeURIComponent(escape(i.bytesToString(b))) } };
    var i = d.Binary = { stringToBytes: function (b) { for (var c = [], a = 0; a < b.length; a++) c.push(b.charCodeAt(a) & 255); return c }, bytesToString: function (b) { for (var c = [], a = 0; a < b.length; a++) c.push(String.fromCharCode(b[a])); return c.join("") } }
}();
(function () {
    var d = Crypto, m = d.util, i = d.charenc, b = i.UTF8, c = i.Binary, a = d.SHA1 = function (b, l) { var f = m.wordsToBytes(a._sha1(b)); return l && l.asBytes ? f : l && l.asString ? c.bytesToString(f) : m.bytesToHex(f) }; a._sha1 = function (a) {
        a.constructor == String && (a = b.stringToBytes(a)); var c = m.bytesToWords(a), f = a.length * 8, a = [], d = 1732584193, g = -271733879, j = -1732584194, k = 271733878, i = -1009589776; c[f >> 5] |= 128 << 24 - f % 32; c[(f + 64 >>> 9 << 4) + 15] = f; for (f = 0; f < c.length; f += 16) {
            for (var o = d, p = g, q = j, r = k, s = i, e = 0; e < 80; e++) {
                if (e < 16) a[e] = c[f + e]; else {
                    var n =
                    a[e - 3] ^ a[e - 8] ^ a[e - 14] ^ a[e - 16]; a[e] = n << 1 | n >>> 31
                } n = (d << 5 | d >>> 27) + i + (a[e] >>> 0) + (e < 20 ? (g & j | ~g & k) + 1518500249 : e < 40 ? (g ^ j ^ k) + 1859775393 : e < 60 ? (g & j | g & k | j & k) - 1894007588 : (g ^ j ^ k) - 899497514); i = k; k = j; j = g << 30 | g >>> 2; g = d; d = n
            } d += o; g += p; j += q; k += r; i += s
        } return [d, g, j, k, i]
    }; a._blocksize = 16; a._digestsize = 20
})();