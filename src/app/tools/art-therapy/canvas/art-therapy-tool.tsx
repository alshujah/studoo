'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Trash2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ArtTherapyTool() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const { toast } = useToast();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Adjust for device pixel ratio for sharper drawing
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.scale(ratio, ratio);
        context.lineCap = 'round';
        context.strokeStyle = brushColor;
        context.lineWidth = brushSize;
        contextRef.current = context;
      }
    }
  }, [brushColor, brushSize]);

  const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const image = canvas.toDataURL('image/png');
      console.log('Saved Drawing Data URL:', image);
      toast({
        title: 'Drawing Saved (to Console)',
        description: 'In a real application, this would save the image to your journal.',
      });
    }
  };
  
  const colors = ['#000000', '#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#8B5CF6', '#EC4899'];

  return (
    <div className="flex flex-col gap-4">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onMouseLeave={finishDrawing}
        className="w-full h-96 bg-gray-100 dark:bg-muted/50 rounded-md border cursor-crosshair"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
        <div className="flex flex-col gap-2">
            <Label>Color</Label>
            <div className="flex flex-wrap gap-2">
                {colors.map(color => (
                    <button 
                        key={color}
                        onClick={() => setBrushColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${brushColor === color ? 'border-ring' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                        aria-label={`Set color to ${color}`}
                    />
                ))}
                <input
                    type="color"
                    value={brushColor}
                    onChange={(e) => setBrushColor(e.target.value)}
                    className="w-8 h-8 p-0 border-none bg-transparent cursor-pointer"
                    aria-label="Choose custom color"
                />
            </div>
        </div>
        <div className="flex flex-col gap-2">
            <Label htmlFor="brush-size">Brush Size ({brushSize}px)</Label>
            <Slider
                id="brush-size"
                min={1}
                max={50}
                step={1}
                value={[brushSize]}
                onValueChange={(value) => setBrushSize(value[0])}
            />
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={clearCanvas}>
          <Trash2 className="mr-2" />
          Clear
        </Button>
        <Button onClick={saveDrawing}>
          <Save className="mr-2" />
          Save
        </Button>
      </div>
    </div>
  );
}
