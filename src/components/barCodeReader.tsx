import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

interface ICameraDevice {
  id: string;
  label: string;
}
interface IBarCodeReaderProps {
  onRead: (code: string) => void;
  onError: (error: string) => void;
}

const LAST_USED_CAMERA_KEY = "last-used-camera";
const DEFAULT_CAMERA_CONFIG = {
  fps: 30,
  qrbox: { width: 200, height: 100 },
  aspectRatio: 1.3333,
};

export const BarCodeReader = (props: IBarCodeReaderProps) => {
  const readerRef = useRef<Html5Qrcode>();
  const [availableCameras, setAvailableCameras] = useState<ICameraDevice[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<ICameraDevice>();

  useEffect(() => {
    if (readerRef.current !== undefined) {
      return;
    }

    const lastUsedCamera = window.localStorage.getItem(LAST_USED_CAMERA_KEY);
    if (lastUsedCamera !== null) {
      setSelectedCamera(JSON.parse(lastUsedCamera));
    }

    Html5Qrcode.getCameras().then((cameras) => {
      if (cameras === undefined || cameras.length === 0) {
        return;
      }

      setAvailableCameras(cameras);

      if (lastUsedCamera === null) {
        setSelectedCamera(cameras[0]);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedCamera === undefined || readerRef.current !== undefined) {
      return;
    }

    window.localStorage.setItem(
      LAST_USED_CAMERA_KEY,
      JSON.stringify(selectedCamera)
    );

    readerRef.current = new Html5Qrcode("barcode-reader");

    readerRef.current.start(
      selectedCamera.id,
      DEFAULT_CAMERA_CONFIG,
      props.onRead,
      props.onError
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
  }, [selectedCamera, props.onRead]);

  return (
    <div className={"barcode-reader"}>
      <select
        className={"barcode-reader__available-cameras"}
        value={selectedCamera?.id}
        onChange={(e) => {
          const availableCamera = availableCameras.find(
            (ac) => ac.id === e.target.value
          );

          if (availableCamera === null) {
            return;
          }

          readerRef.current = undefined;
          setSelectedCamera(availableCamera);
        }}
      >
        {availableCameras.map((camera) => (
          <option value={camera.id} key={camera.id}>
            {camera.label}
          </option>
        ))}
      </select>
      <div
        id={"barcode-reader"}
        onClick={() => {
          props.onRead("3124124");
        }}
      />
    </div>
  );
};
