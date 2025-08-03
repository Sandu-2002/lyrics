import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Volume2, 
  Image, 
  Clock, 
  Palette, 
  Filter, 
  Download,
  Settings,
  Wand2,
  Sparkles
} from "lucide-react";

interface AdvancedFeaturesProps {
  watermarkText: string;
  watermarkOpacity: number;
  backgroundBlur: number;
  audioVolume: number;
  onWatermarkTextChange: (text: string) => void;
  onWatermarkOpacityChange: (opacity: number) => void;
  onBackgroundBlurChange: (blur: number) => void;
  onAudioVolumeChange: (volume: number) => void;
}

export const AdvancedFeatures = ({
  watermarkText,
  watermarkOpacity,
  backgroundBlur,
  audioVolume,
  onWatermarkTextChange,
  onWatermarkOpacityChange,
  onBackgroundBlurChange,
  onAudioVolumeChange
}: AdvancedFeaturesProps) => {
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
        Advanced Features
      </h2>
      
      <Card className="p-4 space-y-6 bg-card/50 backdrop-blur-sm">
        {/* Watermark Settings */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Image className="w-4 h-4" />
            <Label className="text-base font-medium">Watermark & Branding</Label>
          </div>
          
          <div className="space-y-3">
            <div>
              <Label className="text-sm">Watermark Text</Label>
              <Input
                value={watermarkText}
                onChange={(e) => onWatermarkTextChange(e.target.value)}
                placeholder="Your brand name or @username"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label className="text-sm">Opacity: {watermarkOpacity}%</Label>
              <Slider
                value={[watermarkOpacity]}
                onValueChange={(value) => onWatermarkOpacityChange(value[0])}
                max={100}
                min={0}
                step={5}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Audio & Timing */}
        <div className="space-y-3 border-t border-border pt-3">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4" />
            <Label className="text-base font-medium">Audio & Timing</Label>
          </div>
          
          <div className="space-y-3">
            <div>
              <Label className="text-sm">Audio Volume: {audioVolume}%</Label>
              <Slider
                value={[audioVolume]}
                onValueChange={(value) => onAudioVolumeChange(value[0])}
                max={100}
                min={0}
                step={5}
                className="mt-1"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-sm">Auto-sync lyrics timing</Label>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-sm">Loop playback</Label>
              <Switch />
            </div>
          </div>
        </div>

        {/* Visual Filters */}
        <div className="space-y-3 border-t border-border pt-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <Label className="text-base font-medium">Visual Filters</Label>
          </div>
          
          <div className="space-y-3">
            <div>
              <Label className="text-sm">Background Blur: {backgroundBlur}px</Label>
              <Slider
                value={[backgroundBlur]}
                onValueChange={(value) => onBackgroundBlurChange(value[0])}
                max={20}
                min={0}
                step={1}
                className="mt-1"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Select defaultValue="none">
                <SelectTrigger>
                  <SelectValue placeholder="Color Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Filter</SelectItem>
                  <SelectItem value="sepia">Sepia</SelectItem>
                  <SelectItem value="grayscale">Grayscale</SelectItem>
                  <SelectItem value="vintage">Vintage</SelectItem>
                  <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="none">
                <SelectTrigger>
                  <SelectValue placeholder="Vignette" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Vignette</SelectItem>
                  <SelectItem value="subtle">Subtle</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="strong">Strong</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Quick Templates */}
        <div className="space-y-3 border-t border-border pt-3">
          <div className="flex items-center space-x-2">
            <Wand2 className="w-4 h-4" />
            <Label className="text-base font-medium">Quick Templates</Label>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              🎵 Pop Style
            </Button>
            <Button variant="outline" size="sm">
              🎸 Rock Vibes
            </Button>
            <Button variant="outline" size="sm">
              🎭 Cinematic
            </Button>
            <Button variant="outline" size="sm">
              ✨ Dreamy
            </Button>
            <Button variant="outline" size="sm">
              🌃 Neon City
            </Button>
            <Button variant="outline" size="sm">
              🌸 Soft Focus
            </Button>
          </div>
        </div>

        {/* Export Options */}
        <div className="space-y-3 border-t border-border pt-3">
          <div className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <Label className="text-base font-medium">Export Settings</Label>
          </div>
          
          <div className="space-y-3">
            <Select defaultValue="720p">
              <SelectTrigger>
                <SelectValue placeholder="Video Quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="480p">480p (Standard)</SelectItem>
                <SelectItem value="720p">720p (HD)</SelectItem>
                <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                <SelectItem value="4k">4K (Ultra HD)</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="mp4">
              <SelectTrigger>
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mp4">MP4 (Recommended)</SelectItem>
                <SelectItem value="webm">WebM</SelectItem>
                <SelectItem value="mov">MOV</SelectItem>
                <SelectItem value="gif">GIF (Short clips)</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center justify-between">
              <Label className="text-sm">Include audio waveform</Label>
              <Switch />
            </div>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="bg-accent/10 p-3 rounded-lg border border-accent/20">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <Label className="text-sm font-medium">Pro Tips</Label>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Use high contrast colors for better readability</li>
            <li>• Keep text animations subtle for better focus</li>
            <li>• Upload high-quality background images (1080p+)</li>
            <li>• Test your video on mobile devices</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};