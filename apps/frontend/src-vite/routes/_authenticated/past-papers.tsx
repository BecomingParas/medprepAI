import { createFileRoute, Link } from "@tanstack/react-router";
import { FileSearch } from "lucide-react";
import { PageHeading, StudyEmpty } from "@/components/StudyUI";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/past-papers")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Past Papers — MedPrep AI Nepal" },
      { name: "description", content: "Source-attributed MECEE-BL past-paper questions, filtered by year, subject and topic." },
      { property: "og:title", content: "MECEE-BL Past Papers — MedPrep AI Nepal" },
      { property: "og:description", content: "Practice verified historical MBBS entrance questions with source attribution." },
    ],
  }),
  component: PastPapers,
});

function PastPapers() {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-12">
        <PageHeading eyebrow="Source-checked learning" title="Past papers" description="Historical MECEE-BL questions with source and year on every item."/>
        <div className="mt-10"><StudyEmpty icon={FileSearch} title="No verified papers yet" action={<><Button asChild><Link to="/practice">Topic-wise practice</Link></Button><Button asChild variant="outline"><Link to="/mock">Take a mock exam</Link></Button></>}>We only publish papers and answer keys that have been obtained and checked. Until then, use topic-wise practice and mock exams.</StudyEmpty></div>
      </main>

    </div>
  );
}
