function generateAndStoreColors() {
    const randomColor = `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;

    if (isWhiteOrBlack(randomColor)) {
        return generateAndStoreColors();
    }

    const darkerColor = darkenColor(randomColor, 0.5);

    sessionStorage.setItem("colors", JSON.stringify({ randomColor, darkerColor }));
}

export function fetchColorsFromStorage() {
    const storedColors = sessionStorage.getItem("colors");
    if (storedColors) {
        const { randomColor, darkerColor } = JSON.parse(storedColors) || {};
        return { randomColor, darkerColor };
    } else {
        generateAndStoreColors()
        const { randomColor, darkerColor } = JSON.parse(storedColors) || {};
        return { randomColor, darkerColor };
    }
}

function isWhiteOrBlack(hex) {
    const rgb = hexToRgb(hex);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness < 40 || brightness > 215;
}

function darkenColor(hex, factor) {
    const rgb = hexToRgb(hex);
    const darkerRgb = {
        r: Math.floor(rgb.r * factor),
        g: Math.floor(rgb.g * factor),
        b: Math.floor(rgb.b * factor),
    };
    return rgbToHex(darkerRgb);
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
}

function rgbToHex({ r, g, b }) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}