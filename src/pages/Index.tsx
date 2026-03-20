import { useState, useEffect, useRef } from "react";
import { PanelLeft } from "lucide-react";
import AppSidebar, { SIDEBAR_EXPANDED, SIDEBAR_COLLAPSED } from "@/components/AppSidebar";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import ChatMessages from "@/components/ChatMessages";
import ThreadHeader from "@/components/ThreadHeader";
import AuthPage from "@/components/AuthPage";
import HelpPage from "@/components/HelpPage";
import SettingsPage from "@/components/SettingsPage";
import AboutPage from "@/components/AboutPage";
import { useIsDesktop } from "@/hooks/use-is-desktop";

export interface ChatMessage {
  type: "user" | "ai";
  content: string;
  results?: {
    title: string;
    authors: string;
    year: number;
    abstract: string;
  }[];
}

const mockResponses = [
  [
    {
      title: "The Impact of Caffeine on Cognitive Function: A Systematic Review and Meta-Analysis",
      authors: "Smith J., Johnson A., Williams B.",
      year: 2023,
      abstract: "This systematic review examines the effects of caffeine consumption on various aspects of cognitive function including attention, memory, and executive function. Our meta-analysis of 47 studies reveals a significant positive effect on sustained attention and working memory.",
    },
    {
      title: "Dose-Response Relationship Between Caffeine Intake and Cognitive Performance in Adults",
      authors: "Chen L., Park S., Kim H.",
      year: 2023,
      abstract: "We investigated the dose-response relationship between caffeine intake and cognitive performance in a cohort of 2,500 adults. Results indicate that moderate caffeine consumption (200-400mg/day) is associated with optimal cognitive performance.",
    },
    {
      title: "Caffeine and Neuroplasticity: Mechanisms and Implications for Learning",
      authors: "Rodriguez M., Thompson K., Davis R.",
      year: 2022,
      abstract: "This paper reviews the molecular mechanisms through which caffeine affects neuroplasticity and discusses implications for learning and memory consolidation.",
    },
  ],
  [
    {
      title: "Long-term Caffeine Consumption and Risk of Cognitive Decline: A 10-Year Longitudinal Study",
      authors: "Wang Y., Mueller F., Anderson P.",
      year: 2022,
      abstract: "Our 10-year longitudinal study of 8,000 participants examined the relationship between habitual caffeine consumption and cognitive decline. Moderate consumers showed 26% lower risk of cognitive decline compared to non-consumers.",
    },
    {
      title: "Comparative Effects of Coffee, Tea, and Energy Drinks on Cognitive Task Performance",
      authors: "Brown C., Taylor S., Lee J.",
      year: 2021,
      abstract: "This randomized controlled trial compared the cognitive effects of coffee, green tea, and energy drinks in 300 university students.",
    },
  ],
];

const Index = () => {
  const isDesktop = useIsDesktop();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const responseIndex = useRef(0);

  const hasSearched = messages.length > 0;

  useEffect(() => {
    if (!isDesktop) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isDesktop]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        handleNewThread();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSearch = () => {
    if (!query.trim()) return;
    if (!isSignedIn) {
      setShowAuth(true);
      return;
    }

    const userMsg: ChatMessage = { type: "user", content: query.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setQuery("");
    setIsLoading(true);
    setCurrentPage("home");

    setTimeout(() => {
      const results = mockResponses[responseIndex.current % mockResponses.length];
      responseIndex.current += 1;
      const aiMsg: ChatMessage = {
        type: "ai",
        content: `Found ${results.length} relevant papers for your query.`,
        results,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1500);
  };

  const handleNewThread = () => {
    setQuery("");
    setMessages([]);
    setCurrentPage("home");
  };

  const handleDeleteMessage = (index: number) => {
    setMessages((prev) => {
      const copy = [...prev];
      // Remove the AI message and its preceding user message
      if (index > 0 && copy[index - 1]?.type === "user") {
        copy.splice(index - 1, 2);
      } else {
        copy.splice(index, 1);
      }
      return copy;
    });
  };

  const handleSelectHistory = (q: string) => {
    setQuery(q);
    setCurrentPage("home");
    if (isSignedIn) {
      const userMsg: ChatMessage = { type: "user", content: q };
      setMessages([userMsg]);
      setIsLoading(true);
      setTimeout(() => {
        const results = mockResponses[0];
        const aiMsg: ChatMessage = {
          type: "ai",
          content: `Found ${results.length} relevant papers for your query.`,
          results,
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleSignIn = () => {
    setIsSignedIn(true);
    setShowAuth(false);
    setCurrentPage("home");
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setMessages([]);
    setQuery("");
    setCurrentPage("home");
  };

  if (showAuth && !isSignedIn) {
    return <AuthPage onSignIn={handleSignIn} />;
  }

  const mainMarginLeft = isDesktop
    ? sidebarOpen ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED
    : 0;

  const renderContent = () => {
    switch (currentPage) {
      case "help": return <HelpPage />;
      case "settings": return <SettingsPage />;
      case "about": return <AboutPage />;
      default:
        return (
          <div className="flex flex-col h-[calc(100vh)] relative">
            {/* Thread header */}
            {hasSearched && (
              <ThreadHeader
                title={messages.find((m) => m.type === "user")?.content || "Research Thread"}
              />
            )}
            {/* Chat area or landing */}
            <div className={`flex-1 overflow-y-auto ${hasSearched ? 'pb-36' : ''}`}>
              {!hasSearched ? (
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
                  <div className="text-center mb-8 animate-fade-in">
                    <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-2 tracking-tight">
                      Research starts here
                    </h1>
                    {!isSignedIn && (
                      <p className="text-sm text-muted-foreground mt-3">
                        Search millions of research papers with AI
                      </p>
                    )}
                  </div>

                  <SearchBar
                    query={query}
                    onChange={setQuery}
                    onSubmit={handleSearch}
                    onOpenFilter={() => setFilterOpen(true)}
                    isFixed={false}
                  />

                  {!isSignedIn && (
                    <div className="mt-6 animate-fade-in">
                      <button
                        onClick={() => setShowAuth(true)}
                        className="flex items-center gap-2 bg-card border border-border rounded-xl px-5 py-2.5 text-sm text-foreground hover:bg-accent transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <ChatMessages messages={messages} isLoading={isLoading} onDeleteMessage={handleDeleteMessage} onOpenFilter={() => setFilterOpen(true)} />
              )}
            </div>

            {/* Fixed bottom search bar in chat mode */}
            {hasSearched && (
              <SearchBar
                query={query}
                onChange={setQuery}
                onSubmit={handleSearch}
                onOpenFilter={() => setFilterOpen(true)}
                isFixed={true}
              />
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        isSignedIn={isSignedIn}
        onNewThread={handleNewThread}
        onSelectHistory={handleSelectHistory}
        onNavigate={setCurrentPage}
        onSignOut={handleSignOut}
        onSignInClick={() => setShowAuth(true)}
      />

      <main
        className="transition-all duration-300 ease-in-out"
        style={{ marginLeft: mainMarginLeft }}
      >
        {renderContent()}
      </main>

      <FilterPanel isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  );
};

export default Index;
