import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface VideoCanvasProps {
  backgroundImage?: string;
  audioFile?: File;
  currentLyric?: string;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onSeek: (time: number) => void;
  textPosition: { x: number; y: number };
  textStyle: {
    fontSize: number;
    fontFamily: string;
    color: string;
    fontWeight: string;
    textAlign: 'left' | 'center' | 'right';
    fontStyle?: string;
    textDecoration?: string;
  };
  backgroundEffect: string;
  textAnimation: string;
  animationIntensity: number;
}

export const VideoCanvas = ({
  backgroundImage,
  currentLyric,
  currentTime,
  duration,
  isPlaying,
  onPlay,
  onPause,
  onSeek,
  textPosition,
  textStyle,
  backgroundEffect,
  textAnimation,
  animationIntensity
}: VideoCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Force re-render when lyrics change for animation
    setAnimationKey(prev => prev + 1);
  }, [currentLyric]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getBackgroundEffectClass = () => {
    const intensity = animationIntensity / 100;
    switch (backgroundEffect) {
      case 'shake':
        return 'animate-shake';
      case 'glow':
        return 'animate-glow-pulse';
      case 'zoom':
        return 'animate-ken-burns';
      case 'static':
        return 'animate-tv-static';
      default:
        return '';
    }
  };

  const getTextAnimationClass = () => {
    switch (textAnimation) {
      case 'fade':
        return 'animate-fade-in';
      case 'typewriter':
        return 'animate-typewriter';
      case 'bounce':
        return 'animate-bounce-in';
      case 'pulse':
        return 'animate-pulse';
      case 'glow':
        return 'animate-glow-pulse';
      case 'slide':
        return 'animate-slide-in';
      case 'neon':
        return 'animate-neon-shine';
      default:
        return 'animate-fade-in';
    }
  };

  // Convert position percentages to actual pixels for 3:4 canvas (360x480)
  const getActualPosition = () => {
    const canvasWidth = 360;
    const canvasHeight = 480;
    return {
      x: (textPosition.x / 100) * (canvasWidth / 2),
      y: (textPosition.y / 100) * (canvasHeight / 2)
    };
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
        Video Preview
      </h2>
      
      <Card className="p-4 bg-card/50 backdrop-blur-sm border-canvas-border">
        {/* 3:4 Aspect Ratio Canvas */}
        <div className="relative mx-auto bg-canvas-bg rounded-lg overflow-hidden shadow-elevation"
             style={{ width: '360px', height: '480px' }}>
          
          {/* Background Image */}
          {backgroundImage && (
            <div
              ref={canvasRef}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ${getBackgroundEffectClass()}`}
              style={{ 
                backgroundImage: `url(${backgroundImage})`,
                animationDuration: `${2 - (animationIntensity / 100)}s`
              }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/20" />
            </div>
          )}
          
          {/* Lyrics Text */}
          {currentLyric && (
            <div
              key={animationKey}
              className="absolute inset-0 flex items-center justify-center p-6"
              style={{
                transform: `translate(${getActualPosition().x}px, ${getActualPosition().y}px)`
              }}
            >
              <div 
                className={getTextAnimationClass()}
                style={{
                  animationDuration: `${0.5 + (animationIntensity / 200)}s`
                }}
              >
                <p
                  className="text-center leading-relaxed drop-shadow-lg max-w-full break-words"
                  style={{
                    fontSize: `${textStyle.fontSize}px`,
                    fontFamily: textStyle.fontFamily,
                    color: textStyle.color,
                    fontWeight: textStyle.fontWeight,
                    textAlign: textStyle.textAlign,
                    fontStyle: textStyle.fontStyle || 'normal',
                    textDecoration: textStyle.textDecoration || 'none',
                    textShadow: `2px 2px 4px rgba(0,0,0,0.8), 0 0 ${animationIntensity/5}px ${textStyle.color}40`
                  }}
                >
                  {currentLyric}
                </p>
              </div>
            </div>
          )}
          
          {/* Placeholder when no background */}
          {!backgroundImage && (
            <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-border">
              <p className="text-muted-foreground">Upload background image</p>
            </div>
          )}
        </div>
        
        {/* Audio Controls */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-center space-x-4">
            <Button variant="outline" size="sm">
              <SkipBack className="w-4 h-4" />
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={isPlaying ? onPause : onPlay}
              className="bg-gradient-primary hover:opacity-90"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            
            <Button variant="outline" size="sm">
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={(value) => onSeek(value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration || 0)}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};