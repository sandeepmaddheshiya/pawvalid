'use client';

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface QrCodeProps {
  value: string;
  size?: number;
  className?: string;
  darkColor?: string;
  lightColor?: string;
  alt?: string;
}

export default function QrCode({
  value,
  size = 180,
  className = '',
  darkColor = '#0E2342',
  lightColor = '#FFFFFF',
  alt = 'Pet Visa Customs Verification QR Code',
}: QrCodeProps) {
  const [svgUrl, setSvgUrl] = useState<string>('');

  useEffect(() => {
    let isMounted = true;

    QRCode.toDataURL(value, {
      width: size * 2, // 2x for retina sharpness
      margin: 1,
      color: {
        dark: darkColor,
        light: lightColor,
      },
    })
      .then((url) => {
        if (isMounted) {
          setSvgUrl(url);
        }
      })
      .catch((err) => {
        console.error('Failed to generate QR code:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [value, size, darkColor, lightColor]);

  if (!svgUrl) {
    return (
      <div
        className={`flex items-center justify-center bg-zinc-50 border border-zinc-200 rounded-lg animate-pulse ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-[10px] text-zinc-400">Loading QR...</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={svgUrl}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-lg transition-transform ${className}`}
    />
  );
}
