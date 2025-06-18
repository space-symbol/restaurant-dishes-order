import { useEffect, useRef } from "react";

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

export const QRCode = ({ value, size = 200, className }: QRCodeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  console.log("QRCode render:", { value, size, className });

  useEffect(() => {
    const generateQRCode = async () => {
      if (!canvasRef.current) {
        console.log("Canvas ref is null");
        return;
      }

      console.log("Generating QR code for value:", value);

      try {
        // Динамически импортируем QRCode для уменьшения размера бандла
        const QRCodeLib = await import('qrcode');
        console.log("QRCode library imported successfully");
        
        await QRCodeLib.toCanvas(canvasRef.current, value, {
          width: size,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        console.log("QR code generated successfully");
      } catch (error) {
        console.error('Ошибка генерации QR кода:', error);
      }
    };

    generateQRCode();
  }, [value, size]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}; 