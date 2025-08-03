import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from "lucide-react";

interface FontCustomizationProps {
  textStyle: {
    fontSize: number;
    fontFamily: string;
    color: string;
    fontWeight: string;
    textAlign: 'left' | 'center' | 'right';
    fontStyle?: string;
    textDecoration?: string;
  };
  textPosition: { x: number; y: number };
  onStyleChange: (style: any) => void;
  onPositionChange: (position: { x: number; y: number }) => void;
}

const googleFonts = [
  'Inter',
  'Roboto', 
  'Open Sans',
  'Lato',
  'Montserrat',
  'Oswald',
  'Source Sans Pro',
  'Raleway',
  'PT Sans',
  'Merriweather',
  'Playfair Display',
  'Dancing Script'
];

export const FontCustomization = ({ 
  textStyle, 
  textPosition, 
  onStyleChange, 
  onPositionChange 
}: FontCustomizationProps) => {
  
  const handleStyleUpdate = (key: string, value: any) => {
    onStyleChange({ ...textStyle, [key]: value });
  };

  const toggleBold = () => {
    const newWeight = textStyle.fontWeight === 'bold' ? 'normal' : 'bold';
    handleStyleUpdate('fontWeight', newWeight);
  };

  const toggleItalic = () => {
    const newStyle = textStyle.fontStyle === 'italic' ? 'normal' : 'italic';
    handleStyleUpdate('fontStyle', newStyle);
  };

  const toggleUnderline = () => {
    const newDecoration = textStyle.textDecoration === 'underline' ? 'none' : 'underline';
    handleStyleUpdate('textDecoration', newDecoration);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
        Font Customization
      </h2>
      
      <Card className="p-4 space-y-4 bg-card/50 backdrop-blur-sm">
        {/* Font Family */}
        <div className="space-y-2">
          <Label>Font Family</Label>
          <Select value={textStyle.fontFamily} onValueChange={(value) => handleStyleUpdate('fontFamily', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {googleFonts.map((font) => (
                <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Custom Font Upload */}
        <div className="space-y-2">
          <Label>Upload Custom Font</Label>
          <div className="relative border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer">
            <input
              type="file"
              accept=".ttf,.otf,.woff,.woff2"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const fontName = file.name.split('.')[0];
                  const fontUrl = URL.createObjectURL(file);
                  const fontFace = new FontFace(fontName, `url(${fontUrl})`);
                  fontFace.load().then(() => {
                    document.fonts.add(fontFace);
                    handleStyleUpdate('fontFamily', fontName);
                  });
                }
              }}
            />
            <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Upload .ttf, .otf, .woff files</p>
          </div>
        </div>

        {/* Font Size */}
        <div className="space-y-2">
          <Label>Font Size: {textStyle.fontSize}px</Label>
          <Slider
            value={[textStyle.fontSize]}
            onValueChange={(value) => handleStyleUpdate('fontSize', value[0])}
            max={72}
            min={12}
            step={1}
          />
        </div>

        {/* Font Color */}
        <div className="space-y-2">
          <Label>Font Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={textStyle.color}
              onChange={(e) => handleStyleUpdate('color', e.target.value)}
              className="w-16 h-10 p-1"
            />
            <Input
              type="text"
              value={textStyle.color}
              onChange={(e) => handleStyleUpdate('color', e.target.value)}
              placeholder="#ffffff"
              className="flex-1"
            />
          </div>
        </div>

        {/* Text Formatting */}
        <div className="space-y-2">
          <Label>Text Style</Label>
          <div className="flex gap-2">
            <Button
              variant={textStyle.fontWeight === 'bold' ? 'default' : 'outline'}
              size="sm"
              onClick={toggleBold}
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              variant={textStyle.fontStyle === 'italic' ? 'default' : 'outline'}
              size="sm"
              onClick={toggleItalic}
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              variant={textStyle.textDecoration === 'underline' ? 'default' : 'outline'}
              size="sm"
              onClick={toggleUnderline}
            >
              <Underline className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Text Alignment */}
        <div className="space-y-2">
          <Label>Text Alignment</Label>
          <div className="flex gap-2">
            <Button
              variant={textStyle.textAlign === 'left' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleStyleUpdate('textAlign', 'left')}
            >
              <AlignLeft className="w-4 h-4" />
            </Button>
            <Button
              variant={textStyle.textAlign === 'center' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleStyleUpdate('textAlign', 'center')}
            >
              <AlignCenter className="w-4 h-4" />
            </Button>
            <Button
              variant={textStyle.textAlign === 'right' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleStyleUpdate('textAlign', 'right')}
            >
              <AlignRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Text Position */}
        <div className="space-y-2">
          <Label>Text Position (3:4 Canvas)</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs">Horizontal: {textPosition.x}%</Label>
              <Slider
                value={[textPosition.x]}
                onValueChange={(value) => onPositionChange({ ...textPosition, x: value[0] })}
                max={100}
                min={-100}
                step={1}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Vertical: {textPosition.y}%</Label>
              <Slider
                value={[textPosition.y]}
                onValueChange={(value) => onPositionChange({ ...textPosition, y: value[0] })}
                max={100}
                min={-100}
                step={1}
              />
            </div>
          </div>
        </div>

        {/* Quick Position Presets */}
        <div className="space-y-2">
          <Label>Quick Positions</Label>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm" onClick={() => onPositionChange({ x: 0, y: -80 })}>
              Top
            </Button>
            <Button variant="outline" size="sm" onClick={() => onPositionChange({ x: 0, y: 0 })}>
              Center
            </Button>
            <Button variant="outline" size="sm" onClick={() => onPositionChange({ x: 0, y: 80 })}>
              Bottom
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm" onClick={() => onPositionChange({ x: -60, y: 0 })}>
              Left
            </Button>
            <Button variant="outline" size="sm" onClick={() => onPositionChange({ x: 60, y: 0 })}>
              Right
            </Button>
            <Button variant="outline" size="sm" onClick={() => onPositionChange({ x: 60, y: 80 })}>
              Bottom Right
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};