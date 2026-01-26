"use client";

import { useEffect } from "react";

export default function ElevenLabsWidget() {
    useEffect(() => {
        if (document.getElementById("elevenlabs-convai-script")) return;

        const script = document.createElement("script");
        script.id = "elevenlabs-convai-script";
        script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    // @ts-ignore
    return <elevenlabs-convai agent-id="agent_7601kfxd427nfdtswevv8kkq1rba" />;
}
