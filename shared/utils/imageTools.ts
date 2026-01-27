/**
 * Centralized utility for generating image URLs
 * This utility is shared across the application to avoid circular dependencies
 */

/**
 * Get the base path for different image targets
 * @param target - The target type (default, template-thumbnail, design-thumbnail, designs)
 * @returns The base path for the target
 */
export const getImageBasePath = (target: string = 'default'): string => {
  switch (target) {
    case 'template-thumbnail':
      return 'assets/templates/thumbnails';
    case 'design-thumbnail':
      return 'assets/designs/thumbnails';
    case 'designs':
      return 'assets/designs/images';
    case 'temp':
      return 'temp';
    case 'default':
    default:
      return 'assets/images';
  }
};

/**
 * Get image URL for different sizes and targets
 * @param filename - The image filename
 * @param size - The size variant (xs, sm, md, lg, xl, raw)
 * @param target - The target type (default, template-thumbnail, design-thumbnail, designs)
 * @returns The complete image URL
 */
export const getImageUrl = (filename: string, size: string = 'xs', target: string = 'default'): string => {
  if (!filename || typeof filename !== 'string') return '';

  // If filename is already a full URL, return it as is
  if (filename.startsWith('http://') || filename.startsWith('https://') || filename.startsWith('/')) {
    return filename;
  }

  let assetUrl = '';

  // On server: read directly from process.env (no Nuxt context needed)
  // On client: use useRuntimeConfig (works within Vue component context)
  if (import.meta.server) {
    assetUrl = process.env.NUXT_ASSET_URL || '';
  } else {
    const config = useRuntimeConfig();
    assetUrl = config.public.assetUrl as string || '';
  }

  // Get the image path based on target using shared function
  const imagePath = getImageBasePath(target);

  return `${assetUrl}/${imagePath}/${size}/${filename}`;
};

/**
 * Get Konva image configuration using native Konva fillPattern properties
 * @param image - The HTMLImageElement to configure
 * @param width - Container width
 * @param height - Container height
 * @param fit - Image fit mode ('contain', 'cover', 'fill')
 * @param position - Image position ('center', 'top left', 'top right', etc.)
 * @param repeat - Pattern repeat mode ('no-repeat', 'repeat', 'repeat-x', 'repeat-y')
 * @returns Konva configuration object for fillPattern properties
 */
export const getKonvaImageConfig = (
  image: HTMLImageElement,
  width: number,
  height: number,
  fit: string = 'cover',
  position: string = 'center',
  repeat: string = 'no-repeat',
  shapeType?: string
) => {
  if (!image || !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0) {
    return {};
  }

  // Use Konva's native fillPattern properties
  const config: any = {
    fillPatternImage: image,
    fillPatternRepeat: repeat
  };

  // Calculate scale based on fit mode using Konva's scaling
  const imageWidth = image.naturalWidth;
  const imageHeight = image.naturalHeight;

  if (fit === 'contain') {
    const scale = Math.min(width / imageWidth, height / imageHeight);
    config.fillPatternScaleX = scale;
    config.fillPatternScaleY = scale;
  } else if (fit === 'cover') {
    const scale = Math.max(width / imageWidth, height / imageHeight);
    config.fillPatternScaleX = scale;
    config.fillPatternScaleY = scale;
  } else if (fit === 'fill') {
    config.fillPatternScaleX = width / imageWidth;
    config.fillPatternScaleY = height / imageHeight;
  } else {
    // Default scaling
    config.fillPatternScaleX = 1;
    config.fillPatternScaleY = 1;
  }

  // Calculate position using Konva's fillPatternX and fillPatternY properties
  const scaledWidth = imageWidth * config.fillPatternScaleX;
  const scaledHeight = imageHeight * config.fillPatternScaleY;

  // Set position based on position parameter
  if (position.includes('left')) {
    config.fillPatternX = 0;
  } else if (position.includes('right')) {
    config.fillPatternX = width - scaledWidth;
  } else {
    config.fillPatternX = (width - scaledWidth) / 2;
  }

  if (position.includes('top')) {
    config.fillPatternY = 0;
  } else if (position.includes('bottom')) {
    config.fillPatternY = height - scaledHeight;
  } else {
    config.fillPatternY = (height - scaledHeight) / 2;
  }

  // For center-based shapes (circle, star, ellipse, polygon, wedge), adjust the pattern position
  // to center the image properly within the shape
  const isCenterBasedShape = shapeType === 'circle' || shapeType === 'star' || shapeType === 'ellipse' || shapeType === 'polygon' || shapeType === 'wedge';
  if (isCenterBasedShape && fit === 'cover' && repeat === 'no-repeat') {
    // For center-based shapes, we need to position the image center to the shape center
    // Since these shapes are positioned by their center in Konva, we need to offset
    // the pattern to align the image center with the shape center
    config.fillPatternX = -scaledWidth / 2;
    config.fillPatternY = -scaledHeight / 2;
  }

  if (fit === 'contain' && repeat === 'no-repeat') {
    config.shapeWidth = scaledWidth;
    config.shapeHeight = scaledHeight;
    config.shapeX = config.fillPatternX;
    config.shapeY = config.fillPatternY;

    // Reset pattern position since the shape itself will be positioned
    config.fillPatternX = 0;
    config.fillPatternY = 0;
  }

  return config;
};