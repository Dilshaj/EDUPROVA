import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Readable } from 'stream';
import streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
    async uploadFile(
        file: Buffer,
        folder: string = 'uploads',
        resourceType: 'auto' | 'image' | 'video' | 'raw' = 'auto',
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        console.log('CloudinaryService: Starting upload', { folder, resourceType, fileSize: file.length });
        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
                {
                    folder: folder,
                    resource_type: resourceType,
                },
                (error, result) => {
                    if (error) {
                        console.error('CloudinaryService: Upload error', error);
                        return reject(error);
                    }
                    if (!result) {
                        console.error('CloudinaryService: No result returned');
                        return reject(new Error('Cloudinary upload failed: No result returned'));
                    }
                    console.log('CloudinaryService: Upload successful', { url: result.secure_url });
                    resolve(result);
                },
            );

            streamifier.createReadStream(file).pipe(upload);
        });
    }

    async uploadStream(
        fileStream: any,
        folder: string = 'uploads',
        resourceType: 'auto' | 'image' | 'video' | 'raw' = 'auto',
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
                {
                    folder: folder,
                    resource_type: resourceType,
                },
                (error, result) => {
                    if (error) return reject(error);
                    if (!result) return reject(new Error('Cloudinary upload failed: No result returned'));
                    resolve(result);
                },
            );

            fileStream.pipe(upload);
        });
    }

    async uploadImageStream(fileStream: any, folder: string = 'images'): Promise<UploadApiResponse | UploadApiErrorResponse> {
        console.log('CloudinaryService: Starting image stream upload to folder', folder);
        return this.uploadStream(fileStream, folder, 'image');
    }

    async uploadImage(file: Buffer, folder: string = 'images'): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return this.uploadFile(file, folder, 'image');
    }

    async uploadVideo(file: Buffer, folder: string = 'videos'): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return this.uploadFile(file, folder, 'video');
    }

    async deleteFile(publicId: string, resourceType: string = 'image'): Promise<any> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(publicId, { resource_type: resourceType }, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
        });
    }
}
