function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(rgb) {
    const { r, g, b } = rgb
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function hexToRgb(hex) {
    console.log('hex: ', hex);
    hex = hex.replace(/^#/, "");

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    console.log('{ r, g, b }: ', { r, g, b });
    return { r, g, b };
}

export function hexToRgba(hex, alpha = 1) {
    hex = hex.replace(/^#/, "");
    const bigint = parseInt(hex, 16);
    const r = ((bigint >> 16) & 255) / 255;
    const g = ((bigint >> 8) & 255) / 255;
    const b = (bigint & 255) / 255;
    const a = 1; // Opaklık (alpha) varsayılan olarak 1 (tam opak) ayarlandı

    return { r, g, b, a };
}

export function rgbaToHex(rgba) {
    const r = Math.round(rgba.r * 255);
    const g = Math.round(rgba.g * 255);
    const b = Math.round(rgba.b * 255);
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}