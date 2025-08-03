import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Zap, Sparkles, Camera, Tv, Sun } from "lucide-react";

interface EffectsPanelProps {
  backgroundEffect: string;
  textAnimation: string;
  animationIntensity: number;
  onBackgroundEffectChange: (effect: string) => void;
  onTextAnimationChange: (animation: string) => void;
  onIntensityChange: (intensity: number) => void;
}

const backgroundEffects = [
  { id: 'none', name: 'None', icon: Sun },
  { id: 'shake', name: 'Shake', icon: Zap },
  { id: 'glow', name: 'Glow Pulse', icon: Sparkles },
  { id: 'zoom', name: 'Zoom Motion', icon: Camera },
  { id: 'static', name: 'TV Static', icon: Tv }
];

const textAnimations = [
  { id: 'fade', name: 'Fade In/Out' },
  { id: 'typewriter', name: 'Typewriter' },
  { id: 'bounce', name: 'Bounce In' },
  { id: 'pulse', name: 'Pulse' },
  { id: 'glow', name: 'Glow Pulse' },
  { id: 'slide', name: 'Slide In' },
  { id: 'neon', name: 'Neon Shine' }
];

export const EffectsPanel = ({
  backgroundEffect,
  textAnimation,
  animationIntensity,
  onBackgroundEffectChange,
  onTextAnimationChange,
  onIntensityChange
}: EffectsPanelProps) => {
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
        Visual Effects
      </h2>
      
      <Card className="p-4 space-y-6 bg-card/50 backdrop-blur-sm">
        {/* Background Effects */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Background Effects</Label>
          <div className="grid grid-cols-2 gap-3">
            {backgroundEffects.map((effect) => {
              const Icon = effect.icon;
              return (
                <div
                  key={effect.id}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:border-primary ${
                    backgroundEffect === effect.id 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border bg-card/30'
                  }`}
                  onClick={() => onBackgroundEffectChange(effect.id)}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{effect.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Text Animation */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Text Animation</Label>
          <Select value={textAnimation} onValueChange={onTextAnimationChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select animation" />
            </SelectTrigger>
            <SelectContent>
              {textAnimations.map((animation) => (
                <SelectItem key={animation.id} value={animation.id}>
                  {animation.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Animation Intensity */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-base font-medium">Animation Intensity</Label>
            <span className="text-sm text-muted-foreground">{animationIntensity}%</span>
          </div>
          <Slider
            value={[animationIntensity]}
            onValueChange={(value) => onIntensityChange(value[0])}
            max={100}
            min={10}
            step={5}
            className="w-full"
          />
        </div>

        {/* Advanced Options */}
        <div className="space-y-3 pt-3 border-t border-border">
          <Label className="text-base font-medium">Advanced Options</Label>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Loop Background Animation</Label>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-sm">Pause During Transitions</Label>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <Label className="text-sm">Auto-sync Corrections</Label>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Preview Effects Info */}
        <div className="bg-accent/10 p-3 rounded-lg">
          <p className="text-xs text-muted-foreground">
            💡 All effects are applied in real-time. Adjust settings while your video plays to see changes instantly.
          </p>
        </div>
      </Card>
    </div>
  );
};