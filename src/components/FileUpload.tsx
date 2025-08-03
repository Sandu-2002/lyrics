import { useCallback, useState } from "react";
import { Upload, X, FileAudio, Image, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface FileUploadProps {
  onBackgroundImage: (file: File) => void;
  onAudioFile: (file: File) => void;
  onLrcFile: (file: File) => void;
  onWatermarkImage?: (file: File) => void;
}

export const FileUpload = ({ onBackgroundImage, onAudioFile, onLrcFile, onWatermarkImage }: FileUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<{
    background?: File;
    audio?: File;
    lrc?: File;
    watermark?: File;
  }>({});

  const handleDrop = useCallback((e: React.DragEvent, type: 'background' | 'audio' | 'lrc' | 'watermark') => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (!file) return;

    // Validate file types
    const validations = {
      background: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      audio: ['audio/mpeg', 'audio/wav', 'audio/mp3'],
      lrc: ['text/plain', '.lrc'],
      watermark: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    };

    if (type === 'lrc' && !file.name.endsWith('.lrc')) {
      toast({ title: "Invalid file", description: "Please upload a .lrc file", variant: "destructive" });
      return;
    }

    if (type !== 'lrc' && !validations[type].includes(file.type)) {
      toast({ title: "Invalid file type", description: `Please upload a valid ${type} file`, variant: "destructive" });
      return;
    }

    setUploadedFiles(prev => ({ ...prev, [type]: file }));
    
    // Call the appropriate handler
    switch (type) {
      case 'background':
        onBackgroundImage(file);
        break;
      case 'audio':
        onAudioFile(file);
        break;
      case 'lrc':
        onLrcFile(file);
        break;
      case 'watermark':
        onWatermarkImage?.(file);
        break;
    }

    toast({ title: "File uploaded", description: `${file.name} uploaded successfully` });
  }, [onBackgroundImage, onAudioFile, onLrcFile, onWatermarkImage]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, type: 'background' | 'audio' | 'lrc' | 'watermark') => {
    const file = e.target.files?.[0];
    if (file) {
      handleDrop({ preventDefault: () => {}, dataTransfer: { files: [file] } } as any, type);
    }
  };

  const removeFile = (type: 'background' | 'audio' | 'lrc' | 'watermark') => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[type];
      return newFiles;
    });
    toast({ title: "File removed", description: "File removed successfully" });
  };

  const uploadAreas = [
    {
      type: 'background' as const,
      title: 'Background Image',
      description: 'Upload JPG, PNG, GIF or WebP',
      icon: Image,
      accept: 'image/*'
    },
    {
      type: 'audio' as const,
      title: 'Audio File',
      description: 'Upload MP3 or WAV',
      icon: FileAudio,
      accept: 'audio/*'
    },
    {
      type: 'lrc' as const,
      title: 'Lyrics File',
      description: 'Upload .lrc file',
      icon: FileText,
      accept: '.lrc'
    },
    {
      type: 'watermark' as const,
      title: 'Watermark (Optional)',
      description: 'Upload image watermark',
      icon: Image,
      accept: 'image/*'
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
        Upload Files
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        {uploadAreas.map((area) => {
          const Icon = area.icon;
          const file = uploadedFiles[area.type];
          
          return (
            <Card key={area.type} className="relative overflow-hidden border-border bg-card/50 backdrop-blur-sm">
              <div
                className="p-6 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors cursor-pointer group"
                onDrop={(e) => handleDrop(e, area.type)}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
              >
                <input
                  type="file"
                  accept={area.accept}
                  onChange={(e) => handleFileInput(e, area.type)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="text-center space-y-2">
                  <Icon className="w-8 h-8 mx-auto text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="space-y-1">
                    <p className="font-medium">{area.title}</p>
                    <p className="text-sm text-muted-foreground">{area.description}</p>
                  </div>
                  
                  {file ? (
                    <div className="mt-3 p-2 bg-primary/10 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium truncate">{file.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(area.type);
                          }}
                          className="h-6 w-6 p-0 hover:bg-destructive/20"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 mt-3">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm">Click or drag to upload</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};