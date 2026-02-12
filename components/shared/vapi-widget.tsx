'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, X, Phone, PhoneOff, Zap } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Vapi from '@vapi-ai/web';
import { motion, AnimatePresence } from 'framer-motion';

export default function VapiWidgetComponent() {
    const pathname = usePathname();
    const [widgetState, setWidgetState] = useState<'idle' | 'ringing' | 'connecting' | 'active'>('idle');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [callDuration, setCallDuration] = useState(0);

    const vapiRef = useRef<any>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const durationTimerRef = useRef<NodeJS.Timeout | null>(null);

    const SILENCE_TIMEOUT_MS = 20000;
    const RING_DELAY_MS = 10000;
    const RING_DURATION_MS = 18000;

    useEffect(() => {
        let ringDurationTimer: NodeJS.Timeout;

        if (widgetState === 'ringing') {
            try {
                const audio = new Audio('/audio/mixkit-on-hold-ringtone-1361.wav');
                audio.loop = true;
                audio.volume = 0.5;
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch((err) => console.log('Ringtone autoplay blocked:', err));
                }
                audioRef.current = audio;

                if (typeof navigator !== 'undefined' && navigator.vibrate) {
                    navigator.vibrate([200, 100, 200, 100, 200]);
                }

                // Auto-decline after 15 seconds
                ringDurationTimer = setTimeout(() => {
                    setWidgetState('idle');
                }, RING_DURATION_MS);

            } catch (e) {
                console.error('Ring setup failed', e);
            }
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                audioRef.current = null;
            }
            if (typeof navigator !== 'undefined' && navigator.vibrate) {
                navigator.vibrate(0);
            }
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            if (ringDurationTimer) clearTimeout(ringDurationTimer);
        };
    }, [widgetState]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const vapi = new Vapi('30686dbf-b3b3-4a90-8ac2-02fa48f2fa78');
        vapiRef.current = vapi;

        const ringTimer = setTimeout(() => {
            setWidgetState(prev => prev === 'idle' ? 'ringing' : prev);
        }, RING_DELAY_MS);

        const resetSilenceTimer = () => {
            if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = setTimeout(() => vapi.stop(), SILENCE_TIMEOUT_MS);
        };

        vapi.on('call-start', () => {
            setWidgetState('active');
            resetSilenceTimer();
            const startTime = Date.now();
            durationTimerRef.current = setInterval(() => {
                setCallDuration(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        });

        vapi.on('call-end', () => {
            setWidgetState('idle');
            setIsSpeaking(false);
            if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
            if (durationTimerRef.current) clearInterval(durationTimerRef.current);
            setCallDuration(0);
        });

        vapi.on('speech-start', () => {
            setIsSpeaking(true);
            if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        });

        vapi.on('speech-end', () => {
            setIsSpeaking(false);
            resetSilenceTimer();
        });

        vapi.on('error', (error: any) => {
            console.error('[Vapi Error]', error);
            setWidgetState('idle');
        });

        return () => {
            clearTimeout(ringTimer);
            vapi.stop();
            vapi.removeAllListeners();
            if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
            if (durationTimerRef.current) clearInterval(durationTimerRef.current);
        };
    }, []);

    const handleAnswer = async () => {
        setWidgetState('connecting');
        try {
            console.log('[Vapi] Starting call...');
            await vapiRef.current?.start('4028a9a3-8d13-4881-9cf6-0be745180e17');
            console.log('[Vapi] Call started successfully');
        } catch (err: any) {
            console.error('[Vapi] Failed to start call:', err?.message || err);
            setWidgetState('idle');
        }
    };

    const handleDecline = (e: React.MouseEvent) => {
        e.stopPropagation();
        setWidgetState('idle');
    };

    const stopCall = () => {
        vapiRef.current?.stop();
    };

    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    if (!pathname || pathname.startsWith('/book') || pathname.startsWith('/houseboats')) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[9999] font-sans touch-manipulation">
            <AnimatePresence mode="wait">

                {/* 1. IDLE STATE: Minimal & Powerful */}
                {widgetState === 'idle' && (
                    <motion.button
                        key="idle"
                        layoutId="widget-container"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAnswer}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="group relative flex items-center gap-4 px-1.5 py-1.5 pr-6 bg-zinc-950/80 backdrop-blur-xl border border-white/5 rounded-[1rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:bg-zinc-900 transition-all"
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                        {/* Icon Circle */}
                        <div className="relative flex items-center justify-center w-12 h-12 rounded-[0.8rem] bg-zinc-800 group-hover:bg-green-500 transition-colors duration-300">
                            <Phone className="w-5 h-5 text-green-400 group-hover:text-black fill-current transition-colors duration-300" />
                            {/* Pulse Ring */}
                            <div className="absolute inset-0 rounded-[0.8rem] border border-green-500/20 group-hover:border-green-500/50 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                        </div>

                        {/* Text Container */}
                        <div className="flex flex-col items-start gap-0.5">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Lily AI</span>
                            <span className="text-sm font-bold text-white leading-none tracking-tight">Ask AI</span>
                        </div>
                    </motion.button>
                )}

                {/* 2. RINGING STATE: Refined Banner */}
                {widgetState === 'ringing' && (
                    <motion.div
                        key="ringing"
                        layoutId="widget-container"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="bg-black/80 backdrop-blur-2xl text-white rounded-[2rem] p-4 shadow-2xl flex items-center gap-4 border border-white/5 w-[85vw] max-w-[320px]"
                    >
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-green-400 fill-current" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-0.5">Incoming Call</p>
                            <p className="text-sm font-bold truncate text-white">Lily AI Assistant</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleDecline}
                                className="w-10 h-10 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 rounded-full flex items-center justify-center transition-all"
                            >
                                <PhoneOff className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleAnswer}
                                className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-black hover:bg-green-400 transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)] animate-pulse"
                            >
                                <Phone className="w-5 h-5 fill-current" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 3. ACTIVE STATE: Precision Interface */}
                {(widgetState === 'active' || widgetState === 'connecting') && (
                    <motion.div
                        key="active"
                        layoutId="widget-container"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.8 }}
                        className="bg-black text-white rounded-full pl-2 pr-6 py-2 shadow-2xl flex items-center gap-4 border border-zinc-800 w-auto min-w-[220px]"
                    >
                        {/* Status Orb */}
                        <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center shrink-0 relative overflow-hidden">
                            {widgetState === 'connecting' ? (
                                <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                            ) : isSpeaking ? (
                                // Audio Waveform
                                <div className="flex gap-0.5 items-center h-4">
                                    <span className="w-0.5 bg-green-400 rounded-full animate-[bounce_1s_infinite] h-2" />
                                    <span className="w-0.5 bg-green-400 rounded-full animate-[bounce_1s_infinite_100ms] h-4" />
                                    <span className="w-0.5 bg-green-400 rounded-full animate-[bounce_1s_infinite_200ms] h-2" />
                                    <span className="w-0.5 bg-green-400 rounded-full animate-[bounce_1s_infinite_100ms] h-3" />
                                </div>
                            ) : (
                                <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                            )}
                        </div>

                        <div className="flex-1 font-mono font-medium text-xs text-zinc-400">
                            {widgetState === 'connecting' ? 'CONNECTING...' : (
                                <span className="text-white tracking-widest">{formatTime(callDuration)}</span>
                            )}
                        </div>

                        <button
                            onClick={stopCall}
                            className="w-8 h-8 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white rounded-full flex items-center justify-center transition-all shrink-0"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
