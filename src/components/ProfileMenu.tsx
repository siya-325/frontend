import { useState, useRef, useEffect } from "react";
import { LogOut, Moon, EyeOff, HelpCircle, Settings, Info } from "lucide-react";

interface ProfileMenuProps {
  userName: string;
  userEmail: string;
  onSignOut: () => void;
  onNavigate: (page: string) => void;
}

const ProfileMenu = ({ userName, userEmail, onSignOut, onNavigate }: ProfileMenuProps) => {
  const [open, setOpen] = useState(false);
  const [themeToggle, setThemeToggle] = useState(true);
  const [incognito, setIncognito] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initial = userName.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-accent transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold shrink-0">
          {initial}
        </div>
        <span className="text-sm text-foreground truncate">{userName}</span>
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-64 bg-popover border border-border rounded-xl shadow-2xl overflow-hidden animate-fade-in-fast z-50">
          <div className="p-4 border-b border-border">
            <p className="text-sm font-medium text-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
          </div>

          <div className="p-1.5">
            <MenuToggle icon={Moon} label="Dark mode" checked={themeToggle} onChange={setThemeToggle} />
            <MenuToggle icon={EyeOff} label="Incognito mode" checked={incognito} onChange={setIncognito} />
          </div>

          <div className="border-t border-border p-1.5">
            <MenuItem icon={HelpCircle} label="Help" onClick={() => { onNavigate("help"); setOpen(false); }} />
            <MenuItem icon={Settings} label="Settings" onClick={() => { onNavigate("settings"); setOpen(false); }} />
            <MenuItem icon={Info} label="About" onClick={() => { onNavigate("about"); setOpen(false); }} />
          </div>

          <div className="border-t border-border p-1.5">
            <MenuItem icon={LogOut} label="Sign out" onClick={() => { onSignOut(); setOpen(false); }} />
          </div>
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ icon: Icon, label, onClick }: { icon: any; label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-secondary-foreground rounded-md hover:bg-accent transition-colors"
  >
    <Icon className="w-4 h-4 text-muted-foreground" />
    {label}
  </button>
);

const MenuToggle = ({ icon: Icon, label, checked, onChange }: { icon: any; label: string; checked: boolean; onChange: (v: boolean) => void }) => (
  <button
    onClick={() => onChange(!checked)}
    className="flex items-center justify-between w-full px-3 py-2 text-sm text-secondary-foreground rounded-md hover:bg-accent transition-colors"
  >
    <span className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-muted-foreground" />
      {label}
    </span>
    <div className={`w-9 h-5 rounded-full transition-colors relative ${checked ? "bg-primary" : "bg-muted"}`}>
      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-transform ${checked ? "left-[18px]" : "left-0.5"}`} />
    </div>
  </button>
);

export default ProfileMenu;
