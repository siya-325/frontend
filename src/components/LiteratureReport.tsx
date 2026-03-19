import { useState } from "react";
import ReportActionBar from "./ReportActionBar";

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
}

const LiteratureReport = ({ content, papers, onDelete }: LiteratureReportProps) => {
  const [showReferences, setShowReferences] = useState(false);

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
      {/* Report body */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-foreground tracking-tight">
          Literature Review Summary
        </h3>
        <div className="space-y-3">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              {p}
            </p>
          ))}
        </div>

        {/* References section */}
        {showReferences && (
          <div className="pt-4 border-t border-border space-y-2 animate-fade-in">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
              References
            </h4>
            {papers.map((paper, i) => (
              <p key={i} className="text-xs text-muted-foreground leading-relaxed">
                [{i + 1}] {paper.authors} ({paper.year}). <em>{paper.title}</em>.
              </p>
            ))}
          </div>
        )}

        {/* Action bar */}
        <ReportActionBar
          onToggleReferences={() => setShowReferences((prev) => !prev)}
          showReferences={showReferences}
          summaryText={summaryText}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default LiteratureReport;
