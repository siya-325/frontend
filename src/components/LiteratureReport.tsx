import { useState } from "react";
import ReportActionBar from "./ReportActionBar";
import ReferencesPanel from "./ReferencesPanel";

interface Paper {
  title: string;
  authors: string;
  year: number;
  abstract: string;
}

interface LiteratureReportProps {
  content: string;
  papers: Paper[];
  onDelete: () => void;
  onOpenFilter: () => void;
}

const LiteratureReport = ({ content, papers, onDelete, onOpenFilter }: LiteratureReportProps) => {
  const [referencesOpen, setReferencesOpen] = useState(false);

  const generateSummary = () => {
    if (!papers.length) return content;

    const intro = `Based on analysis of ${papers.length} relevant publications, the current literature reveals several key findings in this area of research.`;

    const body = papers
      .map(
        (p, i) =>
          `${p.authors.split(",")[0].trim()} et al. (${p.year}) ${
            i === 0
              ? "conducted a foundational study examining"
              : i === 1
              ? "further investigated"
              : "additionally explored"
          } this topic. ${p.abstract}`
      )
      .join("\n\n");

    const conclusion = `\nThese findings collectively suggest a robust and growing body of evidence. Future research directions may include longitudinal analyses, cross-population studies, and mechanistic investigations to further clarify the observed relationships.`;

    return `${intro}\n\n${body}\n\n${conclusion}`;
  };

  const summaryText = generateSummary();
  const paragraphs = summaryText.split("\n\n").filter(Boolean);

  return (
    <div className="w-full animate-fade-in">
      <div className="space-y-4">
        <div className="space-y-4">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-sm text-muted-foreground leading-[1.8]"
            >
              {p}
            </p>
          ))}
        </div>

        <ReportActionBar
          onToggleReferences={() => setReferencesOpen((prev) => !prev)}
          showReferences={referencesOpen}
          summaryText={summaryText}
          onDelete={onDelete}
          onOpenFilter={onOpenFilter}
        />
      </div>

      <ReferencesPanel
        papers={papers}
        isOpen={referencesOpen}
        onClose={() => setReferencesOpen(false)}
      />
    </div>
  );
};

export default LiteratureReport;
