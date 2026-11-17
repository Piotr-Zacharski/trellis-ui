'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type VoiceRecorderStatus = 'idle' | 'requesting' | 'recording' | 'error';

export interface UseVoiceRecorderReturn {
  status: VoiceRecorderStatus;
  /** Recording length in seconds. */
  duration: number;
  /** Recent input levels (0–1), newest last – handy for a waveform. */
  levels: number[];
  error: string | null;
  isSupported: boolean;
  start: () => Promise<void>;
  /** Stops recording and resolves with the audio file. */
  stop: () => Promise<File | null>;
  /** Stops recording and throws the audio away. */
  cancel: () => void;
}

const LEVEL_SAMPLES = 32;

function pickMimeType() {
  if (typeof MediaRecorder === 'undefined') return undefined;
  return ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'].find((type) => MediaRecorder.isTypeSupported(type));
}

/** Microphone recording with MediaRecorder, plus a live level meter. */
export function useVoiceRecorder(): UseVoiceRecorderReturn {
  const [status, setStatus] = useState<VoiceRecorderStatus>('idle');
  const [duration, setDuration] = useState(0);
  const [levels, setLevels] = useState<number[]>(() => Array(LEVEL_SAMPLES).fill(0));
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const frameRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const isSupported =
    typeof window !== 'undefined' && typeof MediaRecorder !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;

  const cleanup = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    clearInterval(timerRef.current);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    void audioContextRef.current?.close();
    audioContextRef.current = null;
    recorderRef.current = null;
  }, []);

  useEffect(() => cleanup, [cleanup]);

  const start = useCallback(async () => {
    if (!isSupported) {
      setError('Voice recording is not supported in this browser.');
      setStatus('error');
      return;
    }
    setError(null);
    setStatus('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const recorder = new MediaRecorder(stream, { mimeType: pickMimeType() });
      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.start();
      recorderRef.current = recorder;

      // Level meter.
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      audioContext.createMediaStreamSource(stream).connect(analyser);
      audioContextRef.current = audioContext;
      const data = new Uint8Array(analyser.frequencyBinCount);
      let lastSample = 0;
      const tick = (time: number) => {
        if (time - lastSample > 60) {
          lastSample = time;
          analyser.getByteTimeDomainData(data);
          let peak = 0;
          for (const value of data) peak = Math.max(peak, Math.abs(value - 128) / 128);
          setLevels((prev) => [...prev.slice(1), Math.min(1, peak * 2)]);
        }
        frameRef.current = requestAnimationFrame(tick);
      };
      frameRef.current = requestAnimationFrame(tick);

      const startedAt = Date.now();
      setDuration(0);
      timerRef.current = setInterval(() => setDuration(Math.floor((Date.now() - startedAt) / 1000)), 250);
      setStatus('recording');
    } catch (err) {
      cleanup();
      setError(err instanceof DOMException && err.name === 'NotAllowedError' ? 'Microphone access was denied.' : 'Could not start recording.');
      setStatus('error');
    }
  }, [cleanup, isSupported]);

  const stop = useCallback(() => {
    const recorder = recorderRef.current;
    if (!recorder) return Promise.resolve(null);
    return new Promise<File | null>((resolve) => {
      recorder.onstop = () => {
        const type = recorder.mimeType || 'audio/webm';
        const extension = type.includes('mp4') ? 'm4a' : type.includes('ogg') ? 'ogg' : 'webm';
        const blob = new Blob(chunksRef.current, { type });
        const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
        cleanup();
        setStatus('idle');
        setLevels(Array(LEVEL_SAMPLES).fill(0));
        resolve(blob.size > 0 ? new File([blob], `recording-${stamp}.${extension}`, { type }) : null);
      };
      recorder.stop();
    });
  }, [cleanup]);

  const cancel = useCallback(() => {
    const recorder = recorderRef.current;
    if (recorder) {
      recorder.onstop = null;
      if (recorder.state !== 'inactive') recorder.stop();
    }
    cleanup();
    setStatus('idle');
    setLevels(Array(LEVEL_SAMPLES).fill(0));
  }, [cleanup]);

  return { status, duration, levels, error, isSupported, start, stop, cancel };
}
