import { useState } from "react";
import { Plus, Home, Clock, LogIn, X, PanelLeft, PanelLeftClose } from "lucide-react";
import { useIsDesktop } from "@/hooks/use-is-desktop";
import ProfileMenu from "./ProfileMenu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface AppSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isSignedIn: boolean;
  onNewThread: () => void;
  onSelectHistory: (query: string) => void;
  onNavigate: (page: string) => void;
  onSignOut: () => void;
  onSignInClick: () => void;
}

const historyItems = [
  "Effects of caffeine on cognitive performance",
  "Climate change impact on agriculture",
  "Machine learning in healthcare diagnosis",
  "Benefits of meditation on anxiety",
  "Quantum computing applications",
  "Gut microbiome and mental health",
  "Renewable energy efficiency trends",
];

export const SIDEBAR_EXPANDED = 260;
export const SIDEBAR_COLLAPSED = 60;
/** Collapsed state: shows logo, on hover switches to expand icon */
const CollapsedLogoToggle = ({ onToggle }: { onToggle: () => void }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="flex items-center justify-center w-full">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onToggle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors hover:bg-accent"
          >
            {hovered ? (
              <PanelLeft className="w-4 h-4 text-muted-foreground" />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">R</span>
              </div>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>Open sidebar</TooltipContent>
      </Tooltip>
    </div>
  );
};

const AppSidebar = ({
  isOpen, onToggle, isSignedIn, onNewThread, onSelectHistory,
  onNavigate, onSignOut, onSignInClick,
}: AppSidebarProps) => {
  const isDesktop = useIsDesktop();

  // DESKTOP: collapsible rail — never fully hidden
  if (isDesktop) {
    return (
      <div
        className="shrink-0 transition-[width] duration-200 ease-out"
        style={{ width: isOpen ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED }}
      >
        <aside
          className="fixed top-0 left-0 h-full z-30 flex flex-col bg-sidebar border-r border-sidebar-border transition-[width] duration-200 ease-out overflow-hidden"
          style={{ width: isOpen ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3 h-14 shrink-0">
            {isOpen ? (
              <>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                    <span className="text-primary-foreground text-xs font-bold">R</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                    Research
                  </span>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={onToggle}
                      className="p-1.5 rounded-md hover:bg-accent active:scale-95 transition-all text-muted-foreground hover:text-foreground"
                    >
                      <PanelLeftClose className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={8}>Close sidebar</TooltipContent>
                </Tooltip>
              </>
            ) : (
              <CollapsedLogoToggle onToggle={onToggle} />
            )}
          </div>

          {/* New Thread */}
          <div className="px-2 mb-1 shrink-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onNewThread}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg border border-border hover:bg-accent active:scale-[0.97] transition-all text-secondary-foreground justify-center"
                  title="New Thread"
                >
                  <Plus className="w-4 h-4 shrink-0" />
                  {isOpen && (
                    <>
                      <span className="flex-1 text-left whitespace-nowrap">New Thread</span>
                      <kbd className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">⌘K</kbd>
                    </>
                  )}
                </button>
              </TooltipTrigger>
              {!isOpen && (
                <TooltipContent side="right" sideOffset={8}>New Thread</TooltipContent>
              )}
            </Tooltip>
          </div>

          {/* Home */}
          <div className="px-2 mt-1 shrink-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onNavigate("home")}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-accent active:scale-[0.97] transition-all text-secondary-foreground justify-center"
                  title="Home"
                >
                  <Home className="w-4 h-4 shrink-0" />
                  {isOpen && <span className="flex-1 text-left whitespace-nowrap">Home</span>}
                </button>
              </TooltipTrigger>
              {!isOpen && (
                <TooltipContent side="right" sideOffset={8}>Home</TooltipContent>
              )}
            </Tooltip>
          </div>

          {/* History */}
          {isSignedIn && (
            <div className="flex-1 overflow-y-auto scrollbar-thin mt-4 px-2 min-h-0">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 px-3 mb-2 cursor-default">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    {isOpen && (
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                        History
                      </span>
                    )}
                  </div>
                </TooltipTrigger>
                {!isOpen && (
                  <TooltipContent side="right" sideOffset={8}>History</TooltipContent>
                )}
              </Tooltip>
              {isOpen &&
                historyItems.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => onSelectHistory(item)}
                    className="w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors truncate"
                  >
                    {item}
                  </button>
                ))}
            </div>
          )}

          {!isSignedIn && <div className="flex-1" />}

          {/* Bottom */}
          <div className="p-2 border-t border-sidebar-border shrink-0">
            {isSignedIn ? (
              isOpen ? (
                <ProfileMenu
                  userName="Alex Researcher"
                  userEmail="alex@research.com"
                  onSignOut={onSignOut}
                  onNavigate={onNavigate}
                />
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={onToggle}
                      className="flex items-center justify-center w-full p-2 rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold shrink-0">
                        A
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={8}>Alex Researcher</TooltipContent>
                </Tooltip>
              )
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={onSignInClick}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors text-secondary-foreground justify-center"
                  >
                    <LogIn className="w-4 h-4 shrink-0" />
                    {isOpen && <span className="whitespace-nowrap">Sign in</span>}
                  </button>
                </TooltipTrigger>
                {!isOpen && (
                  <TooltipContent side="right" sideOffset={8}>Sign in</TooltipContent>
                )}
              </Tooltip>
            )}
          </div>
        </aside>
      </div>
    );
  }

  // MOBILE/TABLET: overlay drawer
  return (
    <>
      {/* Toggle button (visible when sidebar closed) */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed top-3.5 left-3 z-40 p-2 rounded-lg hover:bg-accent active:scale-95 transition-all"
          aria-label="Open sidebar"
        >
          <PanelLeft className="w-5 h-5 text-muted-foreground" />
        </button>
      )}

      {/* Overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/70 z-40 animate-fade-in"
          onClick={onToggle}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 flex flex-col bg-sidebar border-r border-sidebar-border transition-transform duration-200 ease-out w-[280px] max-w-[85vw] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 h-14">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">R</span>
            </div>
            <span className="text-sm font-semibold text-foreground">Research</span>
          </div>
          <button onClick={onToggle} className="p-1.5 rounded-md hover:bg-accent active:scale-95 transition-all">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* New Thread */}
        <div className="px-3 mb-1">
          <button
            onClick={() => { onNewThread(); onToggle(); }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg border border-border hover:bg-accent transition-colors text-secondary-foreground"
          >
            <Plus className="w-4 h-4" />
            <span className="flex-1 text-left">New Thread</span>
            <kbd className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">⌘K</kbd>
          </button>
        </div>

        {/* Home */}
        <div className="px-3 mt-1">
          <button
            onClick={() => { onNavigate("home"); onToggle(); }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors text-secondary-foreground"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
        </div>

        {/* History */}
        {isSignedIn && (
          <div className="flex-1 overflow-y-auto scrollbar-thin mt-4 px-3">
            <div className="flex items-center gap-2 px-3 mb-2">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">History</span>
            </div>
            {historyItems.map((item, i) => (
              <button
                key={i}
                onClick={() => { onSelectHistory(item); onToggle(); }}
                className="w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors truncate"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {!isSignedIn && <div className="flex-1" />}

        {/* Bottom */}
        <div className="p-3 border-t border-sidebar-border">
          {isSignedIn ? (
            <ProfileMenu
              userName="Alex Researcher"
              userEmail="alex@research.com"
              onSignOut={onSignOut}
              onNavigate={(page) => { onNavigate(page); onToggle(); }}
            />
          ) : (
            <button
              onClick={() => { onSignInClick(); onToggle(); }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors text-secondary-foreground"
            >
              <LogIn className="w-4 h-4" />
              Sign in
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
