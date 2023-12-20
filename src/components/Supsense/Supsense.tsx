import React, { useEffect, useState } from "react";

interface SupsenseProps<T> {
  callback: (value: T) => React.ReactNode;
  loader: React.ReactNode;
  promise: Promise<T>;
}

export default function Supsense<T>({
  callback,
  loader,
  promise,
}: SupsenseProps<T>) {
  const [value, setValue] = useState<T>();
  async function updateState() {
    setValue(await promise);
  }
  useEffect(() => {
    setValue(undefined);
    updateState();
  }, [promise]);
  if (value) return callback(value);
  else return loader;
}
