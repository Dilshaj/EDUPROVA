import { createCipheriv, createDecipheriv, randomBytes, createHmac } from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const KEY = process.env.PII_ENCRYPTION_KEY || '0000000000000000000000000000000000000000000000000000000000000000';
const IV_LENGTH = 16;

/**
 * Encrypts a string using AES-256-CBC.
 */
export function encrypt(text: string): string {
    if (!text) return text;
    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv(ALGORITHM, Buffer.from(KEY, 'hex'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

/**
 * Decrypts a string using AES-256-CBC.
 */
export function decrypt(text: string): string {
    if (!text || !text.includes(':')) return text;
    try {
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift()!, 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = createDecipheriv(ALGORITHM, Buffer.from(KEY, 'hex'), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch (error) {
        console.error('Decryption failed:', error);
        return text; // Return as-is if decryption fails
    }
}

/**
 * Creates a deterministic hash for lookup.
 * This allows searching for an encrypted field without decrypting the whole DB.
 */
export function blindIndex(text: string): string {
    if (!text) return text;
    return createHmac('sha256', KEY)
        .update(text.toLowerCase().trim())
        .digest('hex');
}
