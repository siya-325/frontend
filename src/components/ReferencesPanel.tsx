import { X, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Paper {
  title: string;
  authors: string;
  year: number;
  abstract: string;
}

interface ReferencesPanelProps {
  papers: Paper[];
  isOpen: boolean;
  onClose: () => void;
}

const ReferencesPanel = ({ papers, isOpen, onClose }: ReferencesPanelProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-transparent"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 z-50 h-full w-[380px] max-w-[90vw] bg-card border-l border-border animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <h3 className="text-sm font-semibold text-foreground">References</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
          {papers.map((paper, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-medium text-foreground leading-snug flex-1">
                  {paper.title}
                </h4>
                <button className="p-1 shrink-0 text-muted-foreground hover:text-foreground transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {paper.abstract}
              </p>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
                  {paper.year}
                </Badge>
                {i === 0 && (
                  <Badge variant="outline" className="text-[10px] px-2 py-0.5 border-primary/30 text-primary">
                    Highly Cited
                  </Badge>
                )}
                {i === 2 && (
                  <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                    Literature Review
                  </Badge>
                )}
              </div>

              <p className="text-[11px] text-muted-foreground">
                {paper.authors}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReferencesPanel;
