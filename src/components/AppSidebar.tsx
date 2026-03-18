import { PanelLeftClose, PanelLeft, Plus, Home, Clock, LogIn, X } from "lucide-react";
import { useIsDesktop } from "@/hooks/use-is-desktop";
import ProfileMenu from "./ProfileMenu";

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

const SIDEBAR_EXPANDED = 260;
const SIDEBAR_COLLAPSED = 64;

const AppSidebar = ({
  isOpen, onToggle, isSignedIn, onNewThread, onSelectHistory,
  onNavigate, onSignOut, onSignInClick,
}: AppSidebarProps) => {
  const isDesktop = useIsDesktop();

  // DESKTOP: collapsible sidebar (never fully hidden)
  if (isDesktop) {
    return (
      <div className="relative" style={{ width: isOpen ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED }}>
        <aside
          className="fixed top-0 left-0 h-full z-30 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out overflow-hidden"
          style={{ width: isOpen ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 h-14 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <span className="text-primary-foreground text-xs font-bold">R</span>
              </div>
              {isOpen && <span className="text-sm font-semibold text-foreground whitespace-nowrap">Research</span>}
            </div>
          </div>

        {/* New Thread */}
        <div className="px-3 mb-1 shrink-0">
          <button
            onClick={onNewThread}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg border border-border hover:bg-accent transition-colors text-secondary-foreground justify-center"
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
        </div>

        {/* Home */}
        <div className="px-3 mt-1 shrink-0">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors text-secondary-foreground justify-center"
            title="Home"
          >
            <Home className="w-4 h-4 shrink-0" />
            {isOpen && <span className="flex-1 text-left whitespace-nowrap">Home</span>}
          </button>
        </div>

        {/* History */}
        {isSignedIn && (
          <div className="flex-1 overflow-y-auto scrollbar-thin mt-4 px-3 min-h-0">
            <div className="flex items-center gap-2 px-3 mb-2">
              <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              {isOpen && <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">History</span>}
            </div>
            {isOpen && historyItems.map((item, i) => (
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
        <div className="p-3 border-t border-sidebar-border shrink-0">
          {isSignedIn ? (
            isOpen ? (
              <ProfileMenu
                userName="Alex Researcher"
                userEmail="alex@research.com"
                onSignOut={onSignOut}
                onNavigate={onNavigate}
              />
            ) : (
              <button
                onClick={onToggle}
                className="flex items-center justify-center w-full p-2 rounded-lg hover:bg-accent transition-colors"
                title="Alex Researcher"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold shrink-0">
                  A
                </div>
              </button>
            )
          ) : (
            <button
              onClick={onSignInClick}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors text-secondary-foreground justify-center"
              title="Sign in"
            >
              <LogIn className="w-4 h-4 shrink-0" />
              {isOpen && <span className="whitespace-nowrap">Sign in</span>}
            </button>
          )}
        </div>
        </aside>

        {/* Floating toggle button outside sidebar edge */}
        <button
          onClick={onToggle}
          className="fixed top-4 z-40 w-7 h-7 rounded-full bg-sidebar border border-sidebar-border shadow-md hover:bg-accent flex items-center justify-center transition-all duration-300 ease-in-out"
          style={{ left: (isOpen ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED) + 6 }}
          title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <PanelLeftClose className="w-3.5 h-3.5 text-muted-foreground" /> : <PanelLeft className="w-3.5 h-3.5 text-muted-foreground" />}
        </button>
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
          className="fixed top-4 left-4 z-40 p-2 rounded-lg hover:bg-accent transition-colors"
          aria-label="Open sidebar"
        >
          <PanelLeft className="w-5 h-5 text-muted-foreground" />
        </button>
      )}

      {/* Overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/70 z-40 animate-fade-in-fast"
          onClick={onToggle}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 flex flex-col bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out w-[280px] max-w-[85vw] ${
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
          <button onClick={onToggle} className="p-1.5 rounded-md hover:bg-accent transition-colors">
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
