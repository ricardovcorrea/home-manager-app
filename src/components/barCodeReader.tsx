import { useCallback, useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface ICameraDevice {
  id: string;
  label: string;
}
interface IBarCodeReaderProps {
  onRead: (code: string) => void;
}

export const BarCodeReader = (props: IBarCodeReaderProps) => {
  const readerRef = useRef<Html5Qrcode>();
  const [availableCameras, setAvailableCameras] = useState<ICameraDevice[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<ICameraDevice>();

  useEffect(() => {
    if (readerRef.current !== undefined) {
      return;
    }

    Html5Qrcode.getCameras().then((cameras) => {
      if (cameras === undefined || cameras.length === 0) {
        return;
      }

      setAvailableCameras(cameras);
      setSelectedCamera(cameras[0]);
    });
  }, []);

  useEffect(() => {
    if (selectedCamera === undefined || readerRef.current !== undefined) {
      return;
    }

    readerRef.current = new Html5Qrcode('barcode-reader');

    readerRef.current.start(
      selectedCamera.id,
      {
        fps: 10,
      },
      (decodedText, decodedResult) => {
        props.onRead(decodedText);
      },
      () => {}
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
  }, [selectedCamera]);

  return (
    <div className={'barcode-reader'}>
      <div id={'barcode-reader'} />
      <div className={'barcode-reader__line'} />
      <div className={'barcode-reader__camera-name'}>
        {selectedCamera?.label}
      </div>
      <select
        className={'barcode-reader__available-cameras'}
        onChange={(e) => {
          const aCam = availableCameras.find((ac) => ac.id === e.target.value);

          if (aCam === null) {
            return;
          }

          readerRef.current = undefined;
          setSelectedCamera(aCam);
        }}
      >
        {availableCameras.map((camera) => (
          <option value={camera.id} key={camera.id}>
            {camera.label}
          </option>
        ))}
      </select>
    </div>
  );
};
