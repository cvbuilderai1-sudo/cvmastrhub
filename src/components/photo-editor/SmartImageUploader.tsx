'use client';

import React, { useState, useRef } from 'react';
import { compressImage, fileToBase64, validateImageFile } from '@/lib/image/imageCompression';

export interface SmartImageUploaderProps {
    onPhotoSelect: (base64: string) => void;
    currentPhoto?: string;
    size?: number;
    className?: string;
}

export function SmartImageUploader({
    onPhotoSelect,
    currentPhoto,
    size = 128,
    className = '',
}: SmartImageUploaderProps) {
    const [isDragActive, setIsDragActive] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            await handleFile(files[0]);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFile = async (file: File) => {
        // Validation
        const validation = validateImageFile(file);
        if (!validation.valid) {
            setError(validation.error || 'Invalid file');
            return;
        }

        setUploading(true);
        setError(null);
        setProgress(0);

        try {
            // Simulate progress
            setProgress(20);

            // Compress image
            const compressed = await compressImage(file, {
                maxWidth: 400,
                maxHeight: 400,
                quality: 0.85,
                outputFormat: 'webp',
            });

            setProgress(60);

            // Convert to Base64
            const base64 = await fileToBase64(compressed);

            setProgress(90);

            // Call callback with Base64 (temporary)
            onPhotoSelect(base64);

            setProgress(100);

            // Reset progress after animation
            setTimeout(() => {
                setProgress(0);
            }, 500);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
            console.error('Image upload error:', err);
        } finally {
            setUploading(false);
        }
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onPhotoSelect('');
        setError(null);
    };

    return (
        <div className={`relative ${className}`}>
            <div
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
                className={`
          relative flex flex-col items-center justify-center
          rounded-full border-2 border-dashed
          cursor-pointer transition-all duration-300
          ${isDragActive
                        ? 'border-blue-500 bg-blue-500/10 scale-105'
                        : 'border-white/30 bg-white/5 hover:border-blue-400 hover:bg-white/10'
                    }
        `}
                style={{ width: size, height: size }}
            >
                {currentPhoto ? (
                    <>
                        <img
                            src={currentPhoto}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                        />

                        {/* Remove button */}
                        <button
                            onClick={handleRemove}
                            className="absolute top-0 right-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                            title="Remove photo"
                        >
                            ✕
                        </button>
                    </>
                ) : (
                    <div className="text-center px-4">
                        <div className="text-4xl mb-2">📷</div>
                        <div className="text-xs text-gray-300">
                            {isDragActive ? 'Drop here' : 'Click or drag'}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                            Max 10MB
                        </div>
                    </div>
                )}

                {/* Upload progress overlay */}
                {uploading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 rounded-full">
                        <div className="text-white text-2xl mb-2">
                            {progress < 100 ? '⏳' : '✓'}
                        </div>
                        <div className="text-white text-sm font-medium">
                            {progress}%
                        </div>
                        <div className="w-3/4 h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileInput}
                />
            </div>

            {/* Error message */}
            {error && (
                <div className="absolute -bottom-8 left-0 right-0 text-center">
                    <div className="inline-block px-3 py-1 bg-red-500/90 text-white text-xs rounded-lg">
                        {error}
                    </div>
                </div>
            )}
        </div>
    );
}
