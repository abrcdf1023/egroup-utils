/**
 * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
 * images to fit into a certain area.
 *
 * @param {Number} srcWidth width of source image
 * @param {Number} srcHeight height of source image
 * @param {Number} maxWidth maximum available width
 * @param {Number} maxHeight maximum available height
 * @return {Object} { width, height }
 */
function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth * ratio, height: srcHeight * ratio };
}

/**
 * Compress and resize image and keep aspect ratio.
 *
 * @param {Canvas} canvas Canvas element
 * @param {Image} img Image element
 * @param {object} options
 * @param {string} options.type ['image/jpeg'] compressed image type
 * @param {string} options.quality [1] compressed image quality
 * @param {string} options.maxWidth [1920] compressed image max width
 * @param {string} options.maxHeight [1920] compressed image max height
 */
const resizeImageFile = (canvas, img, options) => {
  const {
    type = 'image/jpeg',
    quality = 1,
    maxWidth = 1920,
    maxHeight = 1920
  } = options || {};
  return new Promise((resolve, reject) => {
    try {
      const ctx = canvas.getContext('2d');
      // Shrinking image
      const { width, height } = calculateAspectRatioFit(
        img.width,
        img.height,
        maxWidth,
        maxHeight
      );
      // Set canvas width and height.
      canvas.width = width;
      canvas.height = height;
      // Draw canvas.
      ctx.drawImage(img, 0, 0, width, height);
      // Convert back to blob.
      canvas.toBlob(resolve, type, quality);
    } catch (error) {
      reject(error);
    }
  });
};

export default resizeImageFile;
