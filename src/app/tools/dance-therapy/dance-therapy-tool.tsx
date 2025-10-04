
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, CameraOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function DanceTherapyTool() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const getCameraPermission = async () => {
      if (!isSessionActive) {
        if (videoRef.current?.srcObject) {
            const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        setIsSessionActive(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();

    return () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [isSessionActive, toast]);

  const toggleSession = () => {
      setIsSessionActive(!isSessionActive);
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Virtual Mirror</CardTitle>
                    <CardDescription>Use this space to observe your movements.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full aspect-video rounded-md bg-muted flex items-center justify-center border">
                        <video ref={videoRef} className="w-full h-full object-cover rounded-md" autoPlay muted playsInline style={{ transform: 'scaleX(-1)' }} />
                    </div>
                     {isSessionActive && hasCameraPermission === false && (
                            <Alert variant="destructive" className="mt-4">
                                <AlertTitle>Camera Access Required</AlertTitle>
                                <AlertDescription>
                                    Please allow camera access to use this feature. You may need to refresh the page and try again.
                                </AlertDescription>
                            </Alert>
                        )}
                </CardContent>
            </Card>

            <Button onClick={toggleSession} size="lg">
              <Camera className="mr-2" />
              {isSessionActive ? 'End Session' : 'Start Session'}
            </Button>
        </div>

        <div className="flex flex-col gap-4">
            <Card className="flex-grow">
                <CardHeader>
                    <CardTitle>Guided Exercise: Embodied Emotions</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm max-w-none text-card-foreground">
                    <p>Find a comfortable stance. Take a few deep breaths to center yourself.</p>
                    <ol>
                        <li><strong>Connect:</strong> Bring to mind a recent feeling. It could be joy, frustration, or anything else. Don&apos;t judge it, just acknowledge it.</li>
                        <li><strong>Locate:</strong> Where do you feel this emotion in your body? Is it a tightness in your chest? A warmth in your belly? A buzzing in your hands?</li>
                        <li><strong>Movement:</strong> Let that part of your body lead a small movement. If it&apos;s tightness in your chest, maybe your shoulders curl inward. If it&apos;s warmth, maybe you gently sway.</li>
                        <li><strong>Amplify:</strong> Slowly, allow that small movement to grow. Let it expand through your arms, your legs, your spine. What does this emotion look like as a dance?</li>
                        <li><strong>Explore:</strong> Move with this feeling for a few minutes. There is no right or wrong way. The goal is expression, not performance.</li>
                        <li><strong>Release:</strong> When you feel ready, slowly bring your movements to a close. Shake out your limbs, take another deep breath, and notice how you feel.</li>
                    </ol>
                    <p className="text-xs text-muted-foreground">This is a simplified exercise. In a full session, an AI would analyze movement to provide gentle, non-judgmental feedback and further guidance.</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
