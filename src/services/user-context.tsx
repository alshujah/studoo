
import { unstable_cache as cache } from 'next/cache';

type UserContext = {
  userId: string;
};

const userContextCache = cache(
  async (userId: string): Promise<UserContext> => ({ userId }),
  ['user-context'],
  { revalidate: false } // This cache is request-specific and should not be shared.
);

export function runInUserContext<T>(userId: string, fn: () => T): T {
  return userContextCache(userId).then(() => fn()) as T;
}

export function getCurrentUserId(): string | undefined {
  const context = userContextCache.getCache() as UserContext | undefined;
  return context?.userId;
}
