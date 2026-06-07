"use client";
import { useEffect, useRef, useState } from "react";

interface SecureViewerProps {
  htmlContent: string;
  studentEmail: string;
  title: string;
}

export function SecureViewer({ htmlContent, studentEmail, title }: SecureViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    // Lock on window blur (tab switch, alt-tab, screenshot tools stealing focus)
    const handleBlur = () => setIsLocked(true);

    // Lock when page is hidden (tab switch, app switch on mobile)
    const handleVisibilityChange = () => {
      if (document.hidden) setIsLocked(true);
    };

    // Lock when mouse leaves the browser window
    const handleMouseLeave = () => setIsLocked(true);

    // Block keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const blocked =
        (e.ctrlKey && ["s","S","p","P","c","C","a","A","u","U"].includes(e.key)) ||
        (e.ctrlKey && e.shiftKey && ["i","I","j","J","c","C","s","S"].includes(e.key)) ||
        (e.metaKey && ["s","S","p","P","c","C","a","A"].includes(e.key)) ||
        ["F12","PrintScreen","F6"].includes(e.key);

      if (blocked) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (e.key === "PrintScreen") setIsLocked(true);
        return false;
      }
    };

    // Catch PrintScreen on keyUp + clear clipboard
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") {
        try { navigator.clipboard.writeText(""); } catch {}
        setIsLocked(true);
      }
    };

    const handleContextMenu = (e: MouseEvent) => { e.preventDefault(); return false; };
    const handleDragStart   = (e: DragEvent)   => { e.preventDefault(); return false; };
    const handleCopy        = (e: ClipboardEvent) => { e.preventDefault(); return false; };
    const handleCut         = (e: ClipboardEvent) => { e.preventDefault(); return false; };

    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("keydown",     handleKeyDown,     true);
    document.addEventListener("keyup",       handleKeyUp,       true);
    document.addEventListener("contextmenu", handleContextMenu, true);
    document.addEventListener("dragstart",   handleDragStart,   true);
    document.addEventListener("copy",        handleCopy,        true);
    document.addEventListener("cut",         handleCut,         true);

    // Block printing
    const printStyle = document.createElement("style");
    printStyle.id = "sws-print-block";
    printStyle.textContent = `
      @media print {
        body * { display: none !important; visibility: hidden !important; }
        body::after {
          content: "Printing is not allowed.";
          display: block !important; visibility: visible !important;
          font-size: 2rem; text-align: center; padding: 4rem; color: #ef4444;
        }
      }
      ::selection { background: transparent; color: transparent; }
      ::-moz-selection { background: transparent; color: transparent; }
    `;
    document.head.appendChild(printStyle);

    return () => {
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("keydown",     handleKeyDown,     true);
      document.removeEventListener("keyup",       handleKeyUp,       true);
      document.removeEventListener("contextmenu", handleContextMenu, true);
      document.removeEventListener("dragstart",   handleDragStart,   true);
      document.removeEventListener("copy",        handleCopy,        true);
      document.removeEventListener("cut",         handleCut,         true);
      document.getElementById("sws-print-block")?.remove();
    };
  }, []);

  // Enable scrolling on embedded PDF iframes
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

  // Ultra-dense watermark SVG tile
  const mkWatermark = (email: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="120">
      <text x="50%" y="30%" dominant-baseline="middle" text-anchor="middle"
        font-family="Arial,sans-serif" font-size="11" fill="rgba(0,0,0,0.18)"
        transform="rotate(-28,120,60)" font-weight="900" letter-spacing="1">${email}</text>
      <text x="20%" y="70%" dominant-baseline="middle" text-anchor="middle"
        font-family="Arial,sans-serif" font-size="9" fill="rgba(0,0,0,0.10)"
        transform="rotate(-28,120,60)" font-weight="700">StudyWithSutirtha</text>
      <text x="80%" y="70%" dominant-baseline="middle" text-anchor="middle"
        font-family="Arial,sans-serif" font-size="9" fill="rgba(0,0,0,0.10)"
        transform="rotate(-28,120,60)" font-weight="700">CONFIDENTIAL</text>
    </svg>`;

  const watermarkUri = `data:image/svg+xml;base64,${
    typeof window !== "undefined" ? btoa(mkWatermark(studentEmail)) : ""
  }`;

  const watermarkStyle = {
    backgroundImage: `url("${watermarkUri}")`,
    backgroundRepeat: "repeat",
    backgroundSize: "240px 120px",
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 bg-white border-2 border-black rounded-t-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        <div className="w-3 h-3 rounded-full bg-red-500 border border-black" />
        <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black" />
        <div className="w-3 h-3 rounded-full bg-green-500 border border-black" />
        <span className="ml-2 text-sm font-bold text-black/60 font-display truncate">📄 {title}</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[10px] font-bold text-white bg-red-500 px-2 py-0.5 rounded-full border border-black uppercase tracking-wider">
            View Only
          </span>
          <span className="text-[10px] font-bold text-white bg-black px-2 py-0.5 rounded-full border border-black uppercase tracking-wider">
            🔒 Secured
          </span>
        </div>
      </div>

      {/* Content wrapper */}
      <div
        ref={containerRef}
        className="relative bg-white border-2 border-t-0 border-black rounded-b-2xl overflow-hidden"
        style={{ userSelect: "none", WebkitUserSelect: "none" } as React.CSSProperties}
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
      >
        {/* Scrolling watermark layer */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={watermarkStyle} />

        {/* Lock screen overlay */}
        {isLocked && (
          <div className="absolute inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center text-center p-8 rounded-b-2xl">
            <div className="w-14 h-14 bg-red-500/10 border-2 border-red-500 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-extrabold text-white mb-1.5">Content Hidden</h3>
            <p className="text-[11px] text-gray-400 max-w-sm mb-5 leading-relaxed">
              Content is hidden when you switch apps, tabs, or attempt to screenshot.
              Click below to resume reading.
            </p>
            <button
              onClick={() => setIsLocked(false)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl border border-blue-400 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
            >
              Resume Viewing
            </button>
          </div>
        )}

        {/* Actual content */}
        <div
          className="relative z-0 p-6 md:p-8 prose prose-sm max-w-none
            prose-headings:font-display prose-headings:text-black prose-headings:font-extrabold
            prose-p:text-black/80 prose-p:leading-relaxed
            prose-strong:text-black prose-strong:font-bold
            prose-ul:text-black/80 prose-ol:text-black/80 prose-li:text-black/80
            prose-a:text-blue-600 prose-a:font-semibold prose-a:no-underline
            prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50
            prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-r-lg"
          style={{ userSelect: "none", WebkitUserSelect: "none", pointerEvents: "none" } as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}
