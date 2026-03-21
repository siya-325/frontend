import { useState } from "react";
import {
  Bookmark,
  BookOpen,
  Share2,
  Link2,
  Globe,
  Lock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

interface ThreadHeaderProps {
  title: string;
}

const ThreadHeader = ({ title }: ThreadHeaderProps) => {
  const [visibility, setVisibility] = useState("private");

  const handleSave = () => toast.success("Thread saved");
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied");
  };
  const handleShareX = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`,
      "_blank"
    );
  };

  const truncated = title.length > 60 ? title.slice(0, 57) + "..." : title;

  return (
    <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-[1100px] mx-auto pl-12 pr-4 lg:px-6 py-2.5 flex items-center justify-between gap-4">
        <h2 className="text-sm font-medium text-foreground truncate min-w-0">
          {truncated}
        </h2>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save</span>
          </button>

          <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">References</span>
          </button>

          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56 p-3 space-y-3">
              <div className="space-y-2">
                <p className="text-xs font-medium text-foreground">Visibility</p>
                <RadioGroup value={visibility} onValueChange={setVisibility} className="gap-2">
                  <div className="flex items-start gap-2">
                    <RadioGroupItem value="private" id="private" className="mt-0.5" />
                    <Label htmlFor="private" className="text-xs cursor-pointer">
                      <div className="flex items-center gap-1 text-foreground">
                        <Lock className="w-3 h-3" /> Private
                      </div>
                      <span className="text-muted-foreground">Only visible to you</span>
                    </Label>
                  </div>
                  <div className="flex items-start gap-2">
                    <RadioGroupItem value="public" id="public" className="mt-0.5" />
                    <Label htmlFor="public" className="text-xs cursor-pointer">
                      <div className="flex items-center gap-1 text-foreground">
                        <Globe className="w-3 h-3" /> Public
                      </div>
                      <span className="text-muted-foreground">Visible to anyone with a link</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="border-t border-border pt-2 space-y-1">
                <button
                  onClick={handleShareX}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Share to X
                </button>
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <Link2 className="w-3.5 h-3.5" />
                  Copy thread link
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default ThreadHeader;
