/**
 * To reset orientation of image.
 * @param {Node} canvas Canvas element
 * @param {Object} canvas Canvas ctx
 * @param {Number} width image width
 * @param {Number} height image height
 * @param {Number} orientation the orientation of image file
 */
export default function resetOrientation(
  canvas,
  ctx,
  width,
  height,
  orientation
) {
  // set proper canvas dimensions before transform & export
  if (4 < orientation && orientation < 9) {
    canvas.width = height;
    canvas.height = width;
  }

  // transform context before drawing image
  switch (orientation) {
    case 2:
      ctx.transform(-1, 0, 0, 1, width, 0);
      break;
    case 3:
      ctx.transform(-1, 0, 0, -1, width, height);
      break;
    case 4:
      ctx.transform(1, 0, 0, -1, 0, height);
      break;
    case 5:
      ctx.transform(0, 1, 1, 0, 0, 0);
      break;
    case 6:
      ctx.transform(0, 1, -1, 0, height, 0);
      break;
    case 7:
      ctx.transform(0, -1, -1, 0, height, width);
      break;
    case 8:
      ctx.transform(0, -1, 1, 0, 0, width);
      break;
    default:
      break;
  }
}
