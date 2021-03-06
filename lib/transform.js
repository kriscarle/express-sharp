const sharp = require('sharp')

const cropDimensions = (width, height, maxSize) => {
  if (width <= maxSize && height <= maxSize) return [width, height]
  const aspectRatio = width / height
  if (width > height) return [maxSize, Math.round(maxSize / aspectRatio)]
  return [maxSize * aspectRatio, maxSize]
}

module.exports = (image, {
  width,
  height,
  crop = false,
  cropMaxSize,
  gravity = 'center',
  format = sharp.format.jpeg.id,
  progressive = true,
  quality = 80,
} = {}) => {
  const transformer = sharp(image)

  if (crop) {
    transformer.resize(...cropDimensions(width, height, cropMaxSize), { position: gravity })
  } else {
    transformer.resize(width, height, { fit: 'inside', withoutEnlargement: true })
  }

  return transformer[format]({quality, progressive}).toBuffer()
}
