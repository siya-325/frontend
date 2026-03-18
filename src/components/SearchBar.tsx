import { SlidersHorizontal, ArrowRight } from "lucide-react";

interface SearchBarProps {
  query: string;
  onChange: (q: string) => void;
  onSubmit: () => void;
  onOpenFilter: () => void;
}

const SearchBar = ({ query, onChange, onSubmit, onOpenFilter }: SearchBarProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center bg-card border border-border rounded-2xl px-4 py-3 gap-2 focus-within:border-primary/50 transition-colors shadow-lg shadow-background/50">
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          placeholder="Ask the research..."
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none"
        />
        <button
          onClick={onOpenFilter}
          className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Filters"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
        <button
          onClick={onSubmit}
          className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          aria-label="Search"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
