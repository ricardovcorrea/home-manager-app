import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

export const BarCodeReader = () => {
  const readerRef = useRef<Html5Qrcode>();
  const [availableCameras, setAvailableCameras] = useState<any[]>([]);

  useEffect(() => {
    if (readerRef.current === undefined) {
      Html5Qrcode.getCameras().then((cameras) => {
        if (cameras === undefined || cameras.length === 0) {
          return;
        }

        setAvailableCameras(cameras);
      });
    }
  }, []);

  useEffect(() => {
    if (
      availableCameras === undefined ||
      availableCameras.length === 0 ||
      readerRef.current !== undefined
    ) {
      return;
    }

    readerRef.current = new Html5Qrcode('barcode-reader');

    readerRef.current.start(
      availableCameras[0].id,
      {
        fps: 10,
      },
      (decodedText, decodedResult) => {
        console.log(decodedText);
        console.log(decodedResult);
      },
      (errorMessage) => {
        // ignore errors
      }
    );

    return () => {
      if (
        readerRef.current === undefined ||
        readerRef.current.isScanning === false
      ) {
        return;
      }

      readerRef.current.stop().then(() => {
        if (readerRef.current === undefined) {
          return;
        }

        readerRef.current.clear();
      });
    };
  }, [availableCameras]);

  return <div className={'barcode-reader'} id={'barcode-reader'}></div>;
};
