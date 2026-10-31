import Link from "next/link";
import { FileSearch } from "lucide-react";
import { PageHeading, StudyEmpty } from "@/components/StudyUI";
import { Button } from "@/components/ui/button";

export default function PastPapers() {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-12">
        <PageHeading eyebrow="Source-checked learning" title="Past papers" description="Historical MECEE-BL questions with source and year on every item."/>
        <div className="mt-10"><StudyEmpty icon={FileSearch} title="No verified papers yet" action={<><Button asChild><Link href="/practice">Topic-wise practice</Link></Button><Button asChild variant="outline"><Link href="/mock">Take a mock exam</Link></Button></>}>We only publish papers and answer keys that have been obtained and checked. Until then, use topic-wise practice and mock exams.</StudyEmpty></div>
      </main>

    </div>
  );
}
