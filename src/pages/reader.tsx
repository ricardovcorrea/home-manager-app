import { useCallback, useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { BarCodeReader } from "../components";
import { getProductById } from "../services/products";

const READER_ACTIONS: {
  [key: string]: {
    title: string;
  };
} = {
  read_product: {
    title: "Read product",
  },
  create_product: {
    title: "Create new products",
  },
};

export const ReaderPage = () => {
  const [searchParams] = useSearchParams();

  const [pageState, setPageState] = useState<{
    lastBarcodeRead?: string;
    product?: { id: string; name: string; stock: number };
    action?: {
      title: string;
    };
  }>({});

  useEffect(() => {
    const actionName = searchParams.get("action") || "";

    setPageState((oldState) => ({
      ...oldState,
      action: READER_ACTIONS[actionName] || READER_ACTIONS["read_product"],
    }));
  }, []);

  const handleOnRead = useCallback(
    (code: string) => {
      if (pageState.lastBarcodeRead !== undefined) {
        return;
      }

      setPageState((oldState) => ({ ...oldState, lastBarcodeRead: code }));
    },
    [pageState.lastBarcodeRead]
  );

  useEffect(() => {
    if (pageState.lastBarcodeRead === undefined) {
      return;
    }

    getProductById(pageState.lastBarcodeRead).then((product) => {
      setPageState((oldState) => ({
        ...oldState,
        product,
        lastBarcodeRead: undefined,
      }));
    });
  }, [pageState.lastBarcodeRead]);

  let ProductElement: JSX.Element | null = null;
  if (pageState.product !== undefined) {
    ProductElement = (
      <div className='reader-page__product'>
        <div>
          <span>Name:</span>
          {pageState.product.name}
        </div>
        <div>
          <span>Stock:</span>
          {pageState.product.stock}
        </div>
      </div>
    );
  }

  return (
    <div className={"reader-page"}>
      <div className={"reader-page__content"}>
        <h1>{pageState.action?.title}</h1>
        <div className='reader-page__reader'>
          <BarCodeReader onRead={handleOnRead} onError={() => {}} />
        </div>
        {ProductElement}
      </div>
    </div>
  );
};
