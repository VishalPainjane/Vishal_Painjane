import { getCachedReadingList } from "@/lib/cached-data";
import { ReadingListView } from "@/components/reading-list-view";
import { PageLayout } from "@/components/page-layout";

export default async function ReadingListPage() {
  const items = await getCachedReadingList();

  return (
    <PageLayout>
        <ReadingListView items={items as any} />
    </PageLayout>
  );
}