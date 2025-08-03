import { useState, useEffect } from "react";

interface LrcLine {
  time: number;
  text: string;
}

export const useLrcParser = (file: File | null) => {
  const [lyrics, setLyrics] = useState<LrcLine[]>([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const [currentLyric, setCurrentLyric] = useState<string>('');

  useEffect(() => {
    if (!file) {
      setLyrics([]);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const parsedLyrics = parseLrcContent(content);
      setLyrics(parsedLyrics);
    };
    reader.readAsText(file);
  }, [file]);

  const parseLrcContent = (content: string): LrcLine[] => {
    const lines = content.split('\n');
    const lrcLines: LrcLine[] = [];

    lines.forEach(line => {
      // Match timestamp pattern [mm:ss.xx] or [mm:ss]
      const match = line.match(/\[(\d{2}):(\d{2})\.?(\d{2})?\](.*)/);
      if (match) {
        const minutes = parseInt(match[1]);
        const seconds = parseInt(match[2]);
        const centiseconds = parseInt(match[3] || '0');
        const text = match[4].trim();
        
        if (text) {
          const time = minutes * 60 + seconds + centiseconds / 100;
          lrcLines.push({ time, text });
        }
      }
    });

    // Sort by time
    return lrcLines.sort((a, b) => a.time - b.time);
  };

  const updateCurrentTime = (currentTime: number) => {
    // Find the current lyric based on time
    let newIndex = -1;
    for (let i = 0; i < lyrics.length; i++) {
      if (currentTime >= lyrics[i].time) {
        newIndex = i;
      } else {
        break;
      }
    }

    if (newIndex !== currentLyricIndex) {
      setCurrentLyricIndex(newIndex);
      setCurrentLyric(newIndex >= 0 ? lyrics[newIndex].text : '');
    }
  };

  const getCurrentLyric = () => {
    return currentLyric;
  };

  const getAllLyrics = () => {
    return lyrics;
  };

  const adjustTiming = (index: number, newTime: number) => {
    const updatedLyrics = [...lyrics];
    if (updatedLyrics[index]) {
      updatedLyrics[index].time = newTime;
      setLyrics(updatedLyrics.sort((a, b) => a.time - b.time));
    }
  };

  return {
    lyrics,
    currentLyric,
    currentLyricIndex,
    updateCurrentTime,
    getCurrentLyric,
    getAllLyrics,
    adjustTiming
  };
};