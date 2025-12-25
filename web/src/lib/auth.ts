import { SignJWT, jwtVerify } from 'jose';
import { prisma } from '@/lib/db';
import { scrypt, timingSafeEqual, randomUUID } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

const SECRET_KEY = process.env.JWT_SECRET || 'd95c4877920d54c090b8282b372d06e824cde457275114f90f7cc5d99081c838';
const key = new TextEncoder().encode(SECRET_KEY);

const DETERMINISTIC_SALT = SECRET_KEY.substring(0, 16); 

export async function hashPassword(password: string): Promise<string> {
  const derivedKey = (await scryptAsync(password, DETERMINISTIC_SALT, 64)) as Buffer;
  return derivedKey.toString('hex');
}

export async function verifyPassword(inputPassword: string, targetPasswordPlain: string): Promise<boolean> {
  try {
    const [inputHash, targetHash] = await Promise.all([
      scryptAsync(inputPassword, DETERMINISTIC_SALT, 64) as Promise<Buffer>,
      scryptAsync(targetPasswordPlain, DETERMINISTIC_SALT, 64) as Promise<Buffer>
    ]);
    return timingSafeEqual(inputHash, targetHash);
  } catch (e) {
    return false;
  }
}

export async function createSession(payload: any) {
  const jti = randomUUID();
  return await new SignJWT({ ...payload, jti })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key);
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, key);
    
    if (payload.jti) {
      // Ensure we treat jti as string
      const jti = String(payload.jti);
      // Check if prisma has the model (in case of stale client)
      if (prisma.revokedToken) {
        const revoked = await prisma.revokedToken.findUnique({
          where: { jti },
        });
        if (revoked) {
          return null;
        }
      }
    }
    
    return payload;
  } catch (error) {
    return null;
  }
}

export async function revokeSession(token: string) {
  try {
    const { payload } = await jwtVerify(token, key);
    if (payload.jti && payload.exp && prisma.revokedToken) {
      const expiresAt = new Date(payload.exp * 1000);
      await prisma.revokedToken.create({
        data: {
          jti: String(payload.jti),
          expiresAt,
        },
      });
    }
  } catch (error) {
    // Ignore
  }
}