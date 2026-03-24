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
  onClose: () => void;
}

const ReferencesPanel = ({ papers, onClose }: ReferencesPanelProps) => {
  return (
    <div className="h-full flex flex-col border-l border-border bg-background">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border shrink-0">
        <h3 className="text-sm font-semibold text-foreground">References</h3>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {papers.map((paper, i) => (
          <div
            key={i}
            className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors space-y-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-sm font-medium text-foreground leading-snug flex-1">
                {paper.title}
              </h4>
              <button className="p-1 shrink-0 text-muted-foreground hover:text-foreground transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
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
  );
};

export default ReferencesPanel;
