import { BookOpen, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  learningSyllabus,
  type LearningSubject,
  type LearningTopic,
} from '../data/syllabus';

export function SyllabusSidebar({
  subject,
  topic,
  onSubjectChange,
  onTopicChange,
}: {
  subject: LearningSubject;
  topic: LearningTopic;
  onSubjectChange: (subject: LearningSubject) => void;
  onTopicChange: (topic: LearningTopic) => void;
}) {
  return (
    <aside className="rounded-lg border bg-card p-4" aria-label="Syllabus navigation">
      <h2 className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Syllabus
      </h2>
      <nav className="mt-3 space-y-1" aria-label="Subjects">
        {learningSyllabus.map((item) => (
          <div key={item.id}>
            <Button
              variant="ghost"
              aria-current={item.id === subject ? 'true' : undefined}
              className={`h-10 w-full justify-start px-2 text-xs font-bold uppercase tracking-wide ${
                item.id === subject ? 'text-foreground' : 'text-muted-foreground'
              }`}
              onClick={() => onSubjectChange(item.id)}
            >
              {item.name}
            </Button>
            {item.id === subject && (
              <div className="mb-2 ml-3 border-l pl-2">
                {item.sections.map((section) => (
                  <div key={section.id}>
                    <p className="px-3 py-2 text-xs font-medium text-muted-foreground">
                      {section.name}
                    </p>
                    <ul className="space-y-1">
                      {section.topics.map((itemTopic) => {
                        const selected = itemTopic.id === topic.id;
                        return (
                          <li key={itemTopic.id}>
                            <Button
                              variant={selected ? 'secondary' : 'ghost'}
                              aria-current={selected ? 'page' : undefined}
                              className="h-auto min-h-9 w-full justify-start gap-2 whitespace-normal px-3 py-2 text-left text-xs"
                              onClick={() => onTopicChange(itemTopic)}
                            >
                              {selected ? (
                                <Check className="size-3.5 shrink-0" />
                              ) : (
                                <BookOpen className="size-3.5 shrink-0 opacity-60" />
                              )}
                              {itemTopic.name}
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <p className="mt-4 border-t px-2 pt-4 text-xs leading-5 text-muted-foreground">
        Topics follow the entrance syllabus. Content is added as it is reviewed.
      </p>
    </aside>
  );
}
