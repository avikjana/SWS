"use client";
import { useEffect, useRef, useState, useCallback } from "react";

interface SecureViewerProps {
  htmlContent: string;
  studentEmail: string;
  title: string;
}

export function SecureViewer({ htmlContent, studentEmail, title }: SecureViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenDenied, setFullscreenDenied] = useState(false);

  // ── Request fullscreen on the secure wrapper div ──────────────────────────
  const enterFullscreen = useCallback(async () => {
    const el = fullscreenRef.current;
    if (!el) return;
    try {
      if (el.requestFullscreen) await el.requestFullscreen();
      else if ((el as any).webkitRequestFullscreen) await (el as any).webkitRequestFullscreen();
      else if ((el as any).mozRequestFullScreen) await (el as any).mozRequestFullScreen();
      setIsFullscreen(true);
      setFullscreenDenied(false);
      setIsLocked(false);
    } catch {
      setFullscreenDenied(true);
    }
  }, []);

  // ── On mount: immediately request fullscreen and set up all guards ─────────
  useEffect(() => {
    // Request fullscreen immediately
    enterFullscreen();

    // -- Fullscreen change detector --
    const handleFullscreenChange = () => {
      const isFs =
        !!document.fullscreenElement ||
        !!(document as any).webkitFullscreenElement ||
        !!(document as any).mozFullScreenElement;
      setIsFullscreen(isFs);
      if (!isFs) {
        // User exited fullscreen → lock immediately
        setIsLocked(true);
      }
    };

    // -- Focus/blur lock --
    const handleBlur = () => setIsLocked(true);

    // -- Mouse leaves the browser window --
    const handleMouseLeave = () => setIsLocked(true);

    // -- Page hidden (alt-tab, task-switch, Snipping Tool, etc.) --
    const handleVisibilityChange = () => {
      if (document.hidden) setIsLocked(true);
    };

    // -- Block all keyboard shortcuts --
    const handleKeyDown = (e: KeyboardEvent) => {
      const blocked =
        (e.ctrlKey && ["s","S","p","P","c","C","a","A","u","U"].includes(e.key)) ||
        (e.ctrlKey && e.shiftKey && ["i","I","j","J","c","C","s","S"].includes(e.key)) ||
        (e.metaKey && ["s","S","p","P","c","C","a","A"].includes(e.key)) ||
        ["F12","PrintScreen","F6","F5"].includes(e.key);

      if (blocked) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (e.key === "PrintScreen") setIsLocked(true);
        return false;
      }
    };

    // -- Catch PrintScreen on keyUp (browser fires clipboard event on keyup) --
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") {
        // Clear clipboard immediately
        try { navigator.clipboard.writeText(""); } catch {}
        setIsLocked(true);
      }
    };

    // -- Block right-click --
    const handleContextMenu = (e: MouseEvent) => { e.preventDefault(); return false; };
    // -- Block drag --
    const handleDragStart = (e: DragEvent) => { e.preventDefault(); return false; };
    // -- Block copy/cut --
    const handleCopy = (e: ClipboardEvent) => { e.preventDefault(); return false; };
    const handleCut = (e: ClipboardEvent) => { e.preventDefault(); return false; };

    // Register all listeners (useCapture=true so extensions can't intercept them easily)
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("keyup", handleKeyUp, true);
    document.addEventListener("contextmenu", handleContextMenu, true);
    document.addEventListener("dragstart", handleDragStart, true);
    document.addEventListener("copy", handleCopy, true);
    document.addEventListener("cut", handleCut, true);

    // Inject CSS: block print + apply CSS filter trick to defeat screenshot extensions
    // Some screenshot extensions capture DOM canvas elements; backdrop-filter on a
    // transparent overlay makes the captured pixels garbled on unsupported capture paths.
    const secureStyle = document.createElement("style");
    secureStyle.id = "sws-secure-style";
    secureStyle.textContent = `
      @media print {
        body * { display: none !important; visibility: hidden !important; }
        body::after {
          content: "Printing is not allowed.";
          display: block !important; visibility: visible !important;
          font-size: 2rem; text-align: center; padding: 4rem; color: #ef4444;
        }
      }
      /* Prevent browser-native screenshot highlight from showing content */
      ::selection { background: transparent; color: transparent; }
      ::-moz-selection { background: transparent; color: transparent; }
    `;
    document.head.appendChild(secureStyle);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("keyup", handleKeyUp, true);
      document.removeEventListener("contextmenu", handleContextMenu, true);
      document.removeEventListener("dragstart", handleDragStart, true);
      document.removeEventListener("copy", handleCopy, true);
      document.removeEventListener("cut", handleCut, true);
      document.getElementById("sws-secure-style")?.remove();
      // Exit fullscreen if still in it
      try {
        if (document.fullscreenElement) document.exitFullscreen();
      } catch {}
    };
  }, [enterFullscreen]);

  // Enable scroll on embedded PDF iframes
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.querySelectorAll("iframe").forEach((iframe) => {
      iframe.style.pointerEvents = "auto";
      const src = iframe.getAttribute("src");
      if (src && src.toLowerCase().includes(".pdf") && !src.includes("#")) {
        iframe.setAttribute("src", `${src}#toolbar=0`);
      }
    });
  }, [htmlContent]);

  // Watermark
  const watermarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="350" height="180">
    <text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle"
      font-family="Inter,sans-serif" font-size="14" fill="rgba(0,0,0,0.12)"
      transform="rotate(-25,175,90)" font-weight="800">${studentEmail}</text>
    <text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle"
      font-family="Inter,sans-serif" font-size="10" fill="rgba(0,0,0,0.07)"
      transform="rotate(-25,175,90)" font-weight="600">StudyWithSutirtha</text>
  </svg>`;
  const watermarkUri = `data:image/svg+xml;base64,${typeof window !== "undefined" ? btoa(watermarkSvg) : ""}`;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    // This outer div is what gets fullscreened
    <div
      ref={fullscreenRef}
      style={{ background: "#000" }}
      className="relative w-full"
    >
      {/* ── LOCK SCREEN (shown when not in fullscreen OR focus lost) ── */}
      {(isLocked || !isFullscreen) && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center text-center p-8"
          style={{ background: "#000" }}
        >
          <div className="w-16 h-16 bg-red-500/10 border-2 border-red-500 rounded-full flex items-center justify-center mb-5 animate-pulse">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          {fullscreenDenied ? (
            <>
              <h3 className="text-xl font-extrabold text-white mb-2">Fullscreen Required</h3>
              <p className="text-sm text-gray-400 max-w-xs mb-6 leading-relaxed">
                This content can only be viewed in fullscreen mode to prevent screenshots.
                Please allow fullscreen access when prompted.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-extrabold text-white mb-2">
                {isFullscreen ? "Content Hidden" : "Fullscreen Required"}
              </h3>
              <p className="text-sm text-gray-400 max-w-xs mb-6 leading-relaxed">
                {isFullscreen
                  ? "Content is hidden because the window lost focus or a screenshot was detected."
                  : "Notes can only be viewed in fullscreen mode. Click below to enter fullscreen and resume."}
              </p>
            </>
          )}

          <button
            onClick={enterFullscreen}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl border border-blue-400 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            Enter Fullscreen to View
          </button>

          <p className="text-[10px] text-gray-600 mt-4 max-w-xs">
            Your email <span className="text-gray-400">{studentEmail}</span> is watermarked on all pages.
            Any sharing will be traced back to your account.
          </p>
        </div>
      )}

      {/* ── ACTUAL CONTENT (only visible in fullscreen + unlocked) ── */}
      {isFullscreen && !isLocked && (
        <div className="relative min-h-screen bg-white flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-3 bg-white border-b-2 border-black flex-shrink-0 sticky top-0 z-50">
            <div className="w-3 h-3 rounded-full bg-red-500 border border-black" />
            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black" />
            <div className="w-3 h-3 rounded-full bg-green-500 border border-black" />
            <span className="ml-2 text-sm font-bold text-black/60 truncate">📄 {title}</span>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-[10px] font-bold text-white bg-red-500 px-2 py-0.5 rounded-full border border-black uppercase tracking-wider">
                View Only
              </span>
              <span className="text-[10px] font-bold text-white bg-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                🔒 Fullscreen Secured
              </span>
            </div>
          </div>

          {/* Content area */}
          <div
            ref={containerRef}
            className="relative flex-1 overflow-auto"
            style={{ userSelect: "none", WebkitUserSelect: "none" } as React.CSSProperties}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
          >
            {/* Dense watermark overlay */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                backgroundImage: `url("${watermarkUri}")`,
                backgroundRepeat: "repeat",
                backgroundSize: "350px 180px",
              }}
            />

            {/* Content */}
            <div
              className="relative z-0 p-6 md:p-10 prose prose-sm max-w-none
                prose-headings:font-display prose-headings:text-black prose-headings:font-extrabold
                prose-p:text-black/80 prose-p:leading-relaxed
                prose-strong:text-black prose-ul:text-black/80 prose-ol:text-black/80
                prose-li:text-black/80 prose-a:text-blue-600 prose-a:no-underline
                prose-code:bg-gray-100 prose-code:px-1.5 prose-code:rounded prose-code:text-sm
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50
                prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-r-lg"
              style={{ userSelect: "none", WebkitUserSelect: "none", pointerEvents: "none" } as React.CSSProperties}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
