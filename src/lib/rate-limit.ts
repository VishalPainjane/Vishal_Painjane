type RateLimitStore = Map<string, { count: number; expiresAt: number }>;

const rateLimitMap: RateLimitStore = new Map();

export function rateLimit(ip: string, limit: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean up expired entries
  if (record && now > record.expiresAt) {
    rateLimitMap.delete(ip);
  }

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + windowMs });
    return true;
  }

  const currentRecord = rateLimitMap.get(ip)!;
  if (currentRecord.count >= limit) {
    return false;
  }

  currentRecord.count += 1;
  return true;
}
