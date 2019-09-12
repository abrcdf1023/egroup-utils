/**
 * To reset orientation of image.
 * @param {Object} ctx Canvas ctx
 * @param {Number} imgWidth image width
 * @param {Number} imgHeight image height
 * @param {Number} orientation the orientation of image file
 */
export default function resetOrientation(
  ctx,
  imgWidth,
  imgHeight,
  orientation
) {
  // transform context before drawing image
  switch (orientation) {
    case 2:
      ctx.transform(-1, 0, 0, 1, imgWidth, 0);
      break;
    case 3:
      ctx.transform(-1, 0, 0, -1, imgWidth, imgHeight);
      break;
    case 4:
      ctx.transform(1, 0, 0, -1, 0, imgHeight);
      break;
    case 5:
      ctx.transform(0, 1, 1, 0, 0, 0);
      break;
    case 6:
      ctx.transform(0, 1, -1, 0, imgHeight, 0);
      break;
    case 7:
      ctx.transform(0, -1, -1, 0, imgHeight, imgWidth);
      break;
    case 8:
      ctx.transform(0, -1, 1, 0, 0, imgWidth);
      break;
    default:
      break;
  }

  // set proper canvas dimensions before transform & export
  if (4 < orientation && orientation < 9) {
    return [imgHeight, imgWidth];
  }
  return [imgWidth, imgHeight];
}
