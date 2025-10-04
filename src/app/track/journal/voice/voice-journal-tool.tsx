'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Play, Pause, Save, Square } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function VoiceJournalTool() {
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<'inactive' | 'recording' | 'paused'>('inactive');
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audio, setAudio] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const { toast } = useToast();

  const getMicrophonePermission = async () => {
    if ('MediaRecorder' in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err: any) {
        toast({
            variant: 'destructive',
            title: 'Microphone permission denied',
            description: err.message,
        });
      }
    } else {
        toast({
            variant: 'destructive',
            title: 'Unsupported Browser',
            description: "The MediaRecorder API is not supported in your browser.",
        });
    }
  };

  const startRecording = async () => {
    if (!permission || !stream) {
      await getMicrophonePermission();
      // If permission is granted, the effect will re-run and we can start next time.
      // For now, we return, as the stream might not be ready immediately.
      if (stream) {
        // Fall through to start if stream got set synchronously, though unlikely.
      } else {
        toast({ title: 'Microphone not ready', description: 'Please grant permission and try again.' });
        return;
      }
    }

    setRecordingStatus('recording');
    const media = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localAudioChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined') return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    if (!mediaRecorder.current || recordingStatus === 'inactive') return;
    
    setRecordingStatus('inactive');
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
  };

  const handleSave = () => {
    if (!audio) {
        toast({
            variant: 'destructive',
            title: 'No Recording',
            description: 'Please record something before saving.',
        });
        return;
    }
    
    console.log({
      audioUrl: audio,
    });
    
    toast({
      title: 'Entry Saved (Logged to Console)',
      description: 'In a real app, this would be saved to your account.',
    });
  };
  
  React.useEffect(() => {
    if(permission && stream && recordingStatus === 'inactive') {
        // If permission was just granted and we're not recording, try starting.
        // This is a bit complex, so we'll just enable the button for now.
    }
  }, [permission, stream, recordingStatus]);


  return (
    <div className="flex flex-col items-center gap-6 p-4 border rounded-lg bg-muted/20">
      <div className="flex items-center justify-center gap-4">
        {!permission ? (
            <Button onClick={getMicrophonePermission}>
                <Mic className="mr-2" />
                Get Mic Permission
            </Button>
        ) : recordingStatus === 'inactive' ? (
          <Button onClick={startRecording} size="lg" disabled={!permission}>
            <Mic className="mr-2" />
            Record
          </Button>
        ) : (
          <Button onClick={stopRecording} size="lg" variant="destructive">
            <Square className="mr-2" />
            Stop
          </Button>
        )}
      </div>
      
      {recordingStatus === 'recording' && (
        <div className="flex items-center gap-2 text-destructive">
            <div className="w-3 h-3 rounded-full bg-destructive animate-pulse"></div>
            <span>Recording...</span>
        </div>
      )}

      {audio && (
        <div className="w-full max-w-md space-y-4">
            <audio src={audio} controls className="w-full" />
            <Button onClick={handleSave} className="w-full">
                <Save className="mr-2" />
                Save Entry
            </Button>
        </div>
      )}
    </div>
  );
}
