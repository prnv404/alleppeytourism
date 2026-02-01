'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';

// Dynamically import Vapi to ensure client-side only or use inside useEffect
import Vapi from '@vapi-ai/web';

export default function VapiWidgetComponent() {
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const vapiRef = useRef<any>(null);

    useEffect(() => {
        // Initialize Vapi instance only on client side
        const vapi = new Vapi('30686dbf-b3b3-4a90-8ac2-02fa48f2fa78'); // Public Key
        vapiRef.current = vapi;

        const onCallStart = () => {
            setIsConnecting(false);
            setIsSessionActive(true);
        };

        const onCallEnd = () => {
            setIsConnecting(false);
            setIsSessionActive(false);
            setIsSpeaking(false);
        };

        const onSpeechStart = () => {
            setIsSpeaking(true);
        };

        const onSpeechEnd = () => {
            setIsSpeaking(false);
        };

        const onError = (e: any) => {
            console.error('Vapi error:', e);
            setIsConnecting(false);
            setIsSessionActive(false);
        };

        // Attach listeners
        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);
        vapi.on('error', onError);

        // Cleanup
        return () => {
            vapi.stop(); // Ensure stop on unmount
            vapi.removeAllListeners();
        };
    }, []);

    const toggleCall = async () => {
        const vapi = vapiRef.current;
        if (!vapi) return;

        if (isSessionActive) {
            vapi.stop();
        } else {
            setIsConnecting(true);
            try {
                await vapi.start('4028a9a3-8d13-4881-9cf6-0be745180e17'); // Assistant ID
            } catch (err) {
                console.error('Failed to start Vapi:', err);
                setIsConnecting(false);
            }
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] font-sans touch-manipulation">
            <button
                onClick={toggleCall}
                disabled={isConnecting}
                className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300 transform active:scale-95 focus:outline-none 
          ${isSessionActive
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-[#0D9488] hover:bg-emerald-700 text-white'
                    } ${isConnecting ? 'opacity-80 cursor-wait' : 'cursor-pointer'}`}
                aria-label={isSessionActive ? "End Call" : "Start Voice Assistant"}
                style={{ WebkitTapHighlightColor: 'transparent' }} // Improve mobile touch feel
            >
                {/* Pulsing rings when speaking */}
                {isSessionActive && isSpeaking && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
                )}

                {/* Connection Loader */}
                {isConnecting ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                ) : isSessionActive ? (
                    <Square className="w-5 h-5 fill-current" />
                ) : (
                    <Mic className="w-6 h-6" />
                )}
            </button>
        </div>
    );
}
