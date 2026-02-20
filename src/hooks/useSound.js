import { useCallback, useRef } from 'react';

const audioCtxRef = { current: null };

function getAudioContext() {
  if (!audioCtxRef.current) {
    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtxRef.current;
}

function playTone(frequency, duration, type = 'sine', volume = 0.3) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Audio not supported, silently fail
  }
}

export default function useSound() {
  const enabled = useRef(true);

  const play = useCallback((sound) => {
    if (!enabled.current) return;
    switch (sound) {
      case 'click':
        playTone(800, 0.1, 'sine', 0.15);
        break;
      case 'correct':
        playTone(523, 0.15, 'sine', 0.2);
        setTimeout(() => playTone(659, 0.15, 'sine', 0.2), 100);
        setTimeout(() => playTone(784, 0.25, 'sine', 0.2), 200);
        break;
      case 'wrong':
        playTone(300, 0.2, 'sawtooth', 0.15);
        setTimeout(() => playTone(250, 0.3, 'sawtooth', 0.15), 150);
        break;
      case 'levelup':
        playTone(523, 0.15, 'sine', 0.2);
        setTimeout(() => playTone(659, 0.15, 'sine', 0.2), 120);
        setTimeout(() => playTone(784, 0.15, 'sine', 0.2), 240);
        setTimeout(() => playTone(1047, 0.4, 'sine', 0.25), 360);
        break;
      case 'badge':
        playTone(784, 0.12, 'sine', 0.2);
        setTimeout(() => playTone(988, 0.12, 'sine', 0.2), 100);
        setTimeout(() => playTone(1175, 0.3, 'sine', 0.25), 200);
        break;
      case 'navigate':
        playTone(600, 0.08, 'sine', 0.1);
        break;
      case 'complete':
        playTone(440, 0.15, 'triangle', 0.2);
        setTimeout(() => playTone(554, 0.15, 'triangle', 0.2), 150);
        setTimeout(() => playTone(659, 0.15, 'triangle', 0.2), 300);
        setTimeout(() => playTone(880, 0.4, 'triangle', 0.25), 450);
        break;
      case 'tick':
        playTone(1200, 0.05, 'sine', 0.1);
        break;
      default:
        break;
    }
  }, []);

  const toggle = useCallback(() => {
    enabled.current = !enabled.current;
    return enabled.current;
  }, []);

  return { play, toggle, enabled };
}
