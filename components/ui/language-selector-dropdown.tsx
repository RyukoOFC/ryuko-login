import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";

export const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "zh-CN", label: "简体中文", flag: "🇨🇳" },
  { code: "zh-TW", label: "繁體中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "pt-BR", label: "Português (BR)", flag: "🇧🇷" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fa", label: "فارسی", flag: "🇮🇷" },
];

type LanguageSelectorProps = {
  value?: string;
  onChange?: (code: string) => void;
};

export const Component = ({ value, onChange }: LanguageSelectorProps = {}) => {
  const [internalCode, setInternalCode] = useState(languages[0].code);
  const code = value ?? internalCode;
  const selected = languages.find((l) => l.code === code) ?? languages[0];
  const [open, setOpen] = useState(false);

  const select = (lang: (typeof languages)[number]) => {
    setInternalCode(lang.code);
    onChange?.(lang.code);
    setOpen(false);
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm",
          "bg-background/80 backdrop-blur-md shadow-sm",
          "border-border text-foreground",
          "hover:bg-muted transition-all"
        )}
      >
        <span>{selected.flag}</span>
        <span>{selected.label}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 mt-2 w-48 max-h-72 overflow-y-auto rounded-xl",
            "bg-background/95 backdrop-blur-xl",
            "shadow-lg border border-border",
            "animate-fade-in"
          )}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => select(lang)}
              className={cn(
                "flex items-center gap-2 w-full px-3 py-2 text-sm text-left transition-colors",
                code === lang.code
                  ? "font-semibold text-foreground bg-muted"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <span>{lang.flag}</span>
              <span className="flex-1">{lang.label}</span>
              {code === lang.code && (
                <Check className="h-4 w-4 text-foreground" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
