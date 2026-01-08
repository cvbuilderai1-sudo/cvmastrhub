/**
 * Smart Image Compression Utility
 * Compresses images to WebP format with optimal quality
 */

export interface CompressionOptions {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    outputFormat?: 'webp' | 'jpeg' | 'png';
}

/**
 * Compress an image file to WebP format
 * @param file - The image file to compress
 * @param options - Compression options
 * @returns Compressed image as Blob
 */
export async function compressImage(
    file: File,
    options: CompressionOptions = {}
): Promise<Blob> {
    const {
        maxWidth = 400,
        maxHeight = 400,
        quality = 0.8,
        outputFormat = 'webp',
    } = options;

    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            reject(new Error('Canvas not supported'));
            return;
        }

        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        img.src = objectUrl;

        img.onload = () => {
            let width = img.width;
            let height = img.height;

            // Calculate new dimensions (maintain aspect ratio)
            if (width > height) {
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            // Draw image with high quality
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);

            // Convert to specified format
            const mimeType = `image/${outputFormat}`;
            canvas.toBlob(
                (blob) => {
                    URL.revokeObjectURL(objectUrl);
                    if (blob) {
                        console.log(`✅ Image compressed: ${(file.size / 1024).toFixed(2)}KB → ${(blob.size / 1024).toFixed(2)}KB`);
                        resolve(blob);
                    } else {
                        reject(new Error('Compression failed'));
                    }
                },
                mimeType,
                quality
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error('Invalid image file'));
        };
    });
}

/**
 * Convert a Blob/File to Base64 string
 * @param file - The file to convert
 * @returns Base64 string
 */
export async function fileToBase64(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * Validate image file
 * @param file - The file to validate
 * @returns Validation result
 */
export function validateImageFile(file: File): {
    valid: boolean;
    error?: string;
} {
    // Check file type
    if (!file.type.startsWith('image/')) {
        return {
            valid: false,
            error: 'Please select an image file (JPEG, PNG, WebP)',
        };
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
        return {
            valid: false,
            error: `Image must be less than ${maxSize / (1024 * 1024)}MB`,
        };
    }

    // Check dimensions (optional - can be done after loading)
    return { valid: true };
}

/**
 * Get image dimensions
 * @param file - The image file
 * @returns Width and height
 */
export async function getImageDimensions(
    file: File
): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        img.src = objectUrl;

        img.onload = () => {
            URL.revokeObjectURL(objectUrl);
            resolve({ width: img.width, height: img.height });
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error('Failed to load image'));
        };
    });
}

/**
 * Create a circular crop of an image
 * @param file - The image file
 * @param size - The size of the circular crop
 * @returns Cropped image as Blob
 */
export async function createCircularCrop(
    file: File,
    size: number = 400
): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            reject(new Error('Canvas not supported'));
            return;
        }

        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        img.src = objectUrl;

        img.onload = () => {
            canvas.width = size;
            canvas.height = size;

            // Create circular clip
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();

            // Calculate crop area (center square)
            const minDim = Math.min(img.width, img.height);
            const sx = (img.width - minDim) / 2;
            const sy = (img.height - minDim) / 2;

            // Draw image
            ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);

            canvas.toBlob(
                (blob) => {
                    URL.revokeObjectURL(objectUrl);
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Crop failed'));
                    }
                },
                'image/webp',
                0.9
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error('Invalid image file'));
        };
    });
}
