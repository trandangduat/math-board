export function getFontWeightFromStrokeRadius(radius) {
    // Map the radius range to font-weight values between 100 and 900

    const minRadius = 2;  // Minimum stroke radius for the thinnest font weight
    const maxRadius = 10; // Maximum stroke radius for the boldest font weight

    const minFontWeight = 200;
    const maxFontWeight = 900;

    // Clamp the radius to the min/max range
    const clampedRadius = Math.min(Math.max(radius, minRadius), maxRadius);

    // Linearly interpolate the font weight
    const fontWeight = Math.round(
        minFontWeight + ((clampedRadius - minRadius) / (maxRadius - minRadius)) * (maxFontWeight - minFontWeight)
    );

    return fontWeight;
}
