import calculateAspectRatioFit from './calculateAspectRatioFit';

/**
 *
 * @param {Node} canvas Canvas element
 * @param {Number} imgWidth image width
 * @param {Number} imgHeight image height
 * @param {Number} maxWidth maximum available width
 * @param {Number} maxHeight maximum available height
 */
export default function shrinkingImage(
  canvas,
  imgWidth,
  imgHeight,
  maxWidth,
  maxHeight
) {
  // Shrinking image
  const { width, height } = calculateAspectRatioFit(
    imgWidth,
    imgHeight,
    maxWidth,
    maxHeight
  );
  // Set canvas width and height.
  canvas.width = width;
  canvas.height = height;

  return [width, height];
}
