import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";

// Cache duration in seconds
const DEFAULT_CACHE_TTL = 60 * 60; // 1 hour

export const getCachedPosts = unstable_cache(
  async () => {
    return await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  },
  ["posts-list"],
  {
    revalidate: DEFAULT_CACHE_TTL, 
    tags: ["posts"],
  }
);

export const getCachedPostBySlug = unstable_cache(
    async (slug: string) => {
      return await prisma.post.findUnique({
        where: { slug, published: true },
      });
    },
    ["post-by-slug"], // Note: Dynamic keys work by appending arguments to the key automatically in unstable_cache? No, actually, the key parts must be unique.
    // Wait, unstable_cache signature is (cb, keyParts, options).
    // If I use it this way, I need to ensure the key is unique per slug.
    // Actually, unstable_cache creates a cached version of the function.
    // So I should wrap a function that takes arguments.
    // The keyParts are combined with arguments to form the cache key.
    {
      revalidate: DEFAULT_CACHE_TTL,
      tags: ["posts"],
    }
);
// Correction: unstable_cache arguments are used for cache key generation automatically in recent versions?
// No, the documentation says "The second argument is an array of strings that uniquely identifies the cached data."
// However, if the function takes arguments, they are NOT automatically part of the key in the top-level key array, 
// BUT the function instance itself + arguments are used? 
// Actually, the recommended way for dynamic arguments is:
// const getPost = unstable_cache((slug) => db.query(...), ['post-by-slug']);
// And then call getPost(slug). The arguments are automatically hashed into the key?
// Yes, "The cache key is generated from the keyParts AND the arguments passed to the function."

export const getCachedProjects = unstable_cache(
  async () => {
    return await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        technologies: true,
      },
    });
  },
  ["projects-list"],
  {
    revalidate: DEFAULT_CACHE_TTL,
    tags: ["projects"],
  }
);

export const getCachedTechnologies = unstable_cache(
  async () => {
    return await prisma.technology.findMany({
      orderBy: { name: "asc" },
    });
  },
  ["technologies-list"],
  {
    revalidate: DEFAULT_CACHE_TTL,
    tags: ["technologies"],
  }
);

export const getCachedReadingList = unstable_cache(
  async () => {
    return await prisma.readingItem.findMany({
      orderBy: { createdAt: "desc" },
    });
  },
  ["reading-list"],
  {
    revalidate: DEFAULT_CACHE_TTL,
    tags: ["reading-list"],
  }
);

export const getCachedReflections = unstable_cache(
  async () => {
    const reflections = await prisma.reflection.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    // Grouping logic (moved inside cache to cache the processed result)
    const grouped = reflections.reduce((acc: any, curr) => {
        const month = curr.monthGroup;
        if (!acc[month]) {
          acc[month] = { month: month, isOpen: false, weeks: [] };
        }
        acc[month].weeks.push({
          title: curr.title,
          dateRange: curr.dateRange,
          content: curr.content,
          slug: curr.slug
        });
        return acc;
      }, {});
  
      return Object.values(grouped); 
  },
  ["reflections-list-grouped"],
  {
    revalidate: DEFAULT_CACHE_TTL,
    tags: ["reflections"],
  }
);

export const getCachedReflectionBySlug = unstable_cache(
    async (slug: string) => {
        return await prisma.reflection.findUnique({
            where: { slug },
        });
    },
    ["reflection-by-slug"],
    {
        revalidate: DEFAULT_CACHE_TTL,
        tags: ["reflections"],
    }
);
