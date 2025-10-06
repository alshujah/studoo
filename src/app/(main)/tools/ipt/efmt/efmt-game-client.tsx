
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { placeholderImages } from '@/lib/placeholder-images';
import { FaceCard } from './face-card';
import { Play, Repeat, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

const emotions = ['joy', 'sadness', 'anger', 'fear', 'surprise', 'disgust'];

type Card = {
  id: number;
  emotion: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const createBoard = () => {
  const emotionPairs = [...emotions, ...emotions];
  const shuffled = emotionPairs.sort(() => Math.random() - 0.5);
  return shuffled.map((emotion, index) => ({
    id: index,
    emotion,
    isFlipped: false,
    isMatched: false,
  }));
};

export function EfmtGameClient() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  const startGame = () => {
    setCards(createBoard());
    setFlippedCards([]);
    setMoves(0);
    setTimer(0);
    setGameState('playing');
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards.find(c => c.id === id)?.isFlipped) {
      return;
    }

    const newCards = cards.map(c => (c.id === id ? { ...c, isFlipped: true } : c));
    setCards(newCards);
    setFlippedCards([...flippedCards, id]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(m => m + 1);
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard?.emotion === secondCard?.emotion) {
        // Matched
        const newCards = cards.map(c =>
          c.emotion === firstCard.emotion ? { ...c, isMatched: true } : c
        );
        setCards(newCards);
        setFlippedCards([]);
        if (newCards.every(c => c.isMatched)) {
          setGameState('finished');
        }
      } else {
        // Not a match
        setTimeout(() => {
          const newCards = cards.map(c =>
            c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c
          );
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  if (gameState === 'idle') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 bg-muted/30 rounded-lg">
        <h3 className="text-xl font-semibold">Ready to Train Your Brain?</h3>
        <Button onClick={startGame}>
          <Play className="mr-2" /> Start Game
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center p-2 rounded-md bg-muted">
        <p>Moves: <span className="font-bold">{moves}</span></p>
        <p>Time: <span className="font-bold">{timer}s</span></p>
        <Button onClick={startGame} variant="outline" size="sm">
          <Repeat className="mr-2" /> Restart
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map(card => (
          <FaceCard
            key={card.id}
            id={card.id}
            emotion={card.emotion}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={handleCardClick}
          />
        ))}
      </div>

       <Dialog open={gameState === 'finished'} onOpenChange={(open) => !open && startGame()}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-headline text-2xl">
                <CheckCircle className="text-green-500" />
                Level Complete!
              </DialogTitle>
              <DialogDescription>
                Great job! You've completed the basic emotions task.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <p>Your Time: <span className="font-bold">{timer} seconds</span></p>
              <p>Total Moves: <span className="font-bold">{moves}</span></p>
            </div>
            <DialogFooter>
              <Button onClick={startGame}>Play Again</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>
  );
}
