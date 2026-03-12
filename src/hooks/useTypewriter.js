// ================================================
// TYPEWRITER HOOK
// Animates through an array of words letter by letter
// ================================================

import { useState, useEffect } from "react";

export function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;

    if (!deleting && charIdx <= word.length) {
      // Typing forward
      timeout = setTimeout(() => {
        setDisplay(word.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > word.length) {
      // Pause at end of word
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      // Deleting backward
      timeout = setTimeout(() => {
        setDisplay(word.slice(0, charIdx));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      // Move to next word
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
      setCharIdx(0);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}