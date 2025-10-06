
'use client';

import React, { useState, useRef, useEffect } from 'react';
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
    if (!stream) {
      await getMicrophonePermission();
      // This function will call itself again via the effect if permission is granted
      return;
    }
    
    setAudio(null);
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
  
  useEffect(() => {
    // This effect handles starting the recording after permission has been granted
    if(permission && stream && recordingStatus === 'recording' && !mediaRecorder.current) {
      startRecording();
    }
  }, [permission, stream, recordingStatus]);


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
