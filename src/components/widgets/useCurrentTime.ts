import { useState, useEffect } from 'react';

export interface LiveTime {
  date: Date;
  hours: number;
  minutes: number;
  seconds: number;
  hours12: number;
  isPm: boolean;
  formattedTime: string;
  formattedDate: string;
  dayName: string;
  monthName: string;
  dayNumber: number;
  secondRatio: number;
  minuteRatio: number;
  hourRatio: number;
}

export function useCurrentTime(): LiveTime {
  const [date, setDate] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const hours12 = hours % 12 || 12;
  const isPm = hours >= 12;

  const secondRatio = seconds / 60;
  const minuteRatio = (minutes + secondRatio) / 60;
  const hourRatio = (hours12 + minuteRatio) / 12;

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const monthName = date.toLocaleDateString('en-US', { month: 'short' });
  const dayNumber = date.getDate();
  const formattedDate = `${dayName}, ${monthName} ${dayNumber}`;

  return {
    date,
    hours,
    minutes,
    seconds,
    hours12,
    isPm,
    formattedTime,
    formattedDate,
    dayName,
    monthName,
    dayNumber,
    secondRatio,
    minuteRatio,
    hourRatio
  };
}

export function numberToWords(num: number): string {
  const ones = [
    'ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE',
    'TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN',
    'EIGHTEEN', 'NINETEEN'
  ];
  const tens = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY'];

  if (num < 20) return ones[num];
  const digit = num % 10;
  return digit === 0 ? tens[Math.floor(num / 10)] : `${tens[Math.floor(num / 10)]} ${ones[digit]}`;
}
