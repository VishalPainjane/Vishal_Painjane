import { prisma } from "@/lib/db";
import { ReadingListView } from "@/components/reading-list-view";
import { PageLayout } from "@/components/page-layout";

export const dynamic = "force-dynamic";

export default async function ReadingListPage() {
  let items: any[] = [];
  try {
    items = await prisma.readingItem.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Reading list table missing:", error);
  }

  return (
    <PageLayout>
        <ReadingListView items={items as any} />
    </PageLayout>
  );
}