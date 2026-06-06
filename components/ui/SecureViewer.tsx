"use client";
import { useEffect, useRef } from "react";

interface SecureViewerProps {
  htmlContent: string;
  studentEmail: string;
  title: string;
}

export function SecureViewer({ htmlContent, studentEmail, title }: SecureViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Block keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl+S, Ctrl+P, Ctrl+C, Ctrl+A, Ctrl+Shift+I, F12
      if (
        (e.ctrlKey && (e.key === "s" || e.key === "S")) ||
        (e.ctrlKey && (e.key === "p" || e.key === "P")) ||
        (e.ctrlKey && (e.key === "c" || e.key === "C")) ||
        (e.ctrlKey && (e.key === "a" || e.key === "A")) ||
        (e.ctrlKey && (e.key === "u" || e.key === "U")) ||
        (e.ctrlKey && e.shiftKey && (e.key === "i" || e.key === "I")) ||
        (e.ctrlKey && e.shiftKey && (e.key === "j" || e.key === "J")) ||
        e.key === "F12" ||
        e.key === "PrintScreen"
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Block right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Block drag
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Block copy
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("contextmenu", handleContextMenu, true);
    document.addEventListener("dragstart", handleDragStart, true);
    document.addEventListener("copy", handleCopy, true);

    // Inject print-blocking CSS
    const printStyle = document.createElement("style");
    printStyle.id = "secure-viewer-print-block";
    printStyle.textContent = `
      @media print {
        body * { display: none !important; visibility: hidden !important; }
        body::after {
          content: "Printing is disabled for this content.";
          display: block !important;
          visibility: visible !important;
          font-size: 2rem;
          text-align: center;
          padding: 4rem;
          color: #ef4444;
        }
      }
    `;
    document.head.appendChild(printStyle);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("contextmenu", handleContextMenu, true);
      document.removeEventListener("dragstart", handleDragStart, true);
      document.removeEventListener("copy", handleCopy, true);
      const existingStyle = document.getElementById("secure-viewer-print-block");
      if (existingStyle) existingStyle.remove();
    };
  }, []);

  // Enable interaction for iframes (PDFs) and hide native toolbars
  useEffect(() => {
    if (!containerRef.current) return;
    const iframes = containerRef.current.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      iframe.style.pointerEvents = "auto";
      const src = iframe.getAttribute("src");
      if (src && src.toLowerCase().includes(".pdf") && !src.includes("#")) {
        iframe.setAttribute("src", `${src}#toolbar=0`);
      }
    });
  }, [htmlContent]);

  // Generate watermark SVG with student email
  const watermarkSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="350" height="180">
      <text
        x="50%" y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="Inter, sans-serif"
        font-size="16"
        fill="rgba(0,0,0,0.13)"
        transform="rotate(-25, 175, 90)"
        font-weight="800"
      >${studentEmail}</text>
    </svg>
  `;
  const watermarkDataUri = `data:image/svg+xml;base64,${typeof window !== "undefined" ? btoa(watermarkSvg) : ""}`;

  return (
    <div className="relative">
      {/* Header bar */}
      <div className="flex items-center gap-3 px-6 py-4 bg-white border-2 border-black rounded-t-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        <div className="w-3 h-3 rounded-full bg-red-500 border border-black"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black"></div>
        <div className="w-3 h-3 rounded-full bg-green-500 border border-black"></div>
        <span className="ml-2 text-sm font-bold text-black/60 font-display truncate">
          📄 {title}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[10px] font-bold text-white bg-red-500 px-2 py-0.5 rounded-full border border-black uppercase tracking-wider">
            View Only
          </span>
          <span className="text-[10px] font-bold text-white bg-black px-2 py-0.5 rounded-full border border-black uppercase tracking-wider">
            🔒 Secured
          </span>
        </div>
      </div>

      {/* Content area */}
      <div
        ref={containerRef}
        className="relative bg-white border-2 border-t-0 border-black rounded-b-2xl overflow-hidden"
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
        }}
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        onPaste={(e) => e.preventDefault()}
      >
        {/* Watermark overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            backgroundImage: `url("${watermarkDataUri}")`,
            backgroundRepeat: "repeat",
            opacity: 1,
          }}
        />

        {/* Transparent overlay to intercept clicks on content (prevents text selection) */}
        <div className="absolute inset-0 z-20 pointer-events-none" />

        {/* Actual content */}
        <div
          className="relative z-0 p-6 md:p-8 prose prose-sm max-w-none
            prose-headings:font-display prose-headings:text-black prose-headings:font-extrabold
            prose-p:text-black/80 prose-p:leading-relaxed
            prose-strong:text-black prose-strong:font-bold
            prose-ul:text-black/80 prose-ol:text-black/80
            prose-li:text-black/80
            prose-a:text-blue-600 prose-a:font-semibold prose-a:no-underline
            prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-r-lg"
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            pointerEvents: "none",
          }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}
