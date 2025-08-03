import { useState, useEffect } from "react";
import { FileUpload } from "@/components/FileUpload";
import { VideoCanvas } from "@/components/VideoCanvas";
import { FontCustomization } from "@/components/FontCustomization";
import { EffectsPanel } from "@/components/EffectsPanel";
import { AdvancedFeatures } from "@/components/AdvancedFeatures";
import { useLrcParser } from "@/hooks/useLrcParser";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Save, Music, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  // File states
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [lrcFile, setLrcFile] = useState<File | null>(null);
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);

  // Text styling states
  const [textStyle, setTextStyle] = useState({
    fontSize: 24,
    fontFamily: 'Inter',
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center' as 'left' | 'center' | 'right',
    fontStyle: 'normal',
    textDecoration: 'none'
  });

  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });

  // Effects states
  const [backgroundEffect, setBackgroundEffect] = useState('none');
  const [textAnimation, setTextAnimation] = useState('fade');
  const [animationIntensity, setAnimationIntensity] = useState(50);

  // Advanced features states
  const [watermarkText, setWatermarkText] = useState('');
  const [watermarkOpacity, setWatermarkOpacity] = useState(30);
  const [backgroundBlur, setBackgroundBlur] = useState(0);
  const [audioVolume, setAudioVolume] = useState(80);

  // Hooks
  const { currentLyric, updateCurrentTime } = useLrcParser(lrcFile);
  const { isPlaying, currentTime, duration, play, pause, seek } = useAudioPlayer(audioFile);

  // Update lyrics based on audio time
  useEffect(() => {
    updateCurrentTime(currentTime);
  }, [currentTime, updateCurrentTime]);

  // File handlers
  const handleBackgroundImage = (file: File) => {
    const url = URL.createObjectURL(file);
    setBackgroundImage(url);
  };

  const handleAudioFile = (file: File) => {
    setAudioFile(file);
  };

  const handleLrcFile = (file: File) => {
    setLrcFile(file);
  };

  const handleWatermarkImage = (file: File) => {
    setWatermarkImage(file);
  };

  const exportVideo = async () => {
    if (!audioFile || !lrcFile || !backgroundImage) {
      toast({
        title: "Missing Files",
        description: "Please upload audio, lyrics, and background image before exporting.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Export Started",
      description: "Your lyric video is being generated. This may take a few minutes.",
    });

    try {
      // Create canvas for video frames
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 720;
      canvas.height = 960;

      // Export video configuration
      const exportData = {
        backgroundImage,
        textStyle,
        textPosition,
        backgroundEffect,
        textAnimation,
        animationIntensity,
        audioFile: audioFile.name,
        lrcFile: lrcFile.name,
        dimensions: { width: 720, height: 960 }
      };

      // Save configuration as JSON
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'lyric-video-config.json';
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Export Complete",
        description: "Configuration file downloaded. Video rendering requires a backend service.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "An error occurred during export. Please try again.",
        variant: "destructive"
      });
    }
  };

  const saveDraft = () => {
    const draftData = {
      textStyle,
      textPosition,
      backgroundEffect,
      textAnimation,
      animationIntensity,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('lyric-canvas-draft', JSON.stringify(draftData));
    toast({
      title: "Draft Saved",
      description: "Your project settings have been saved locally.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <div className="border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
                <Music className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Lyric Canvas Magic
                </h1>
                <p className="text-sm text-muted-foreground">Create stunning lyric videos</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={saveDraft}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={exportVideo} className="bg-gradient-primary hover:opacity-90">
                <Download className="w-4 h-4 mr-2" />
                Export Video
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          
          {/* Left Panel - File Upload & Effects */}
          <div className="space-y-6">
            <FileUpload
              onBackgroundImage={handleBackgroundImage}
              onAudioFile={handleAudioFile}
              onLrcFile={handleLrcFile}
              onWatermarkImage={handleWatermarkImage}
            />
            
            <EffectsPanel
              backgroundEffect={backgroundEffect}
              textAnimation={textAnimation}
              animationIntensity={animationIntensity}
              onBackgroundEffectChange={setBackgroundEffect}
              onTextAnimationChange={setTextAnimation}
              onIntensityChange={setAnimationIntensity}
            />
          </div>

          {/* Center Panel - Video Preview */}
          <div className="xl:col-span-2">
            <VideoCanvas
              backgroundImage={backgroundImage}
              audioFile={audioFile}
              currentLyric={currentLyric}
              currentTime={currentTime}
              duration={duration}
              isPlaying={isPlaying}
              onPlay={play}
              onPause={pause}
              onSeek={seek}
              textPosition={textPosition}
              textStyle={textStyle}
              backgroundEffect={backgroundEffect}
              textAnimation={textAnimation}
              animationIntensity={animationIntensity}
            />
          </div>

          {/* Right Panel - Font Customization & Advanced Features */}
          <div className="space-y-6">
            <FontCustomization
              textStyle={textStyle}
              textPosition={textPosition}
              onStyleChange={setTextStyle}
              onPositionChange={setTextPosition}
            />
            
            <AdvancedFeatures
              watermarkText={watermarkText}
              watermarkOpacity={watermarkOpacity}
              backgroundBlur={backgroundBlur}
              audioVolume={audioVolume}
              onWatermarkTextChange={setWatermarkText}
              onWatermarkOpacityChange={setWatermarkOpacity}
              onBackgroundBlurChange={setBackgroundBlur}
              onAudioVolumeChange={setAudioVolume}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-card/30 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4" />
              <span>Built with modern web technologies</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Upload your files to get started
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
