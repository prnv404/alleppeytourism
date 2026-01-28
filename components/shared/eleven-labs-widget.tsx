"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ElevenLabsWidget() {
    const pathname = usePathname();

    useEffect(() => {
        if (pathname?.startsWith('/book')) return; // Don't inject script on book pages
        if (document.getElementById("elevenlabs-convai-script")) return;

        const script = document.createElement("script");
        script.id = "elevenlabs-convai-script";
        script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed/dist/index.js"; // Use specific endpoint if possible, or keep original
        script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
        script.async = true;
        document.body.appendChild(script);
    }, [pathname]);

    if (pathname?.startsWith('/book')) return null;

    // @ts-ignore
    return <elevenlabs-convai agent-id="agent_7601kfxd427nfdtswevv8kkq1rba" />;
}
