import React, { createContext, useCallback, useContext, useState } from "react";

type UseDataResult = ReturnType<typeof useData>;

interface DataProviderProps extends UseDataResult {
  children: React.ReactNode;
}
interface UseDataProps<TData extends Record<string, any>> {
  defaultValues?: Partial<TData>;
}
interface UseDataReturnValues<TData extends Record<string, any>> {
  data: Partial<TData>;
  getValues: <TKey extends keyof TData>(
    key: TKey
  ) => TData[TKey] extends undefined ? TData[TKey] | undefined : TData[TKey];
  setValue: <TKey extends keyof TData>(
    key: TKey,
    value: TData[TKey] extends undefined ? TData[TKey] | undefined : TData[TKey]
  ) => void;
}

export const DataContext = createContext<UseDataResult>({
  data: {},
  getValues: (key: string) => undefined,
  setValue: () => {},
});

export const useData = <TData extends Record<string, any>>({
  defaultValues = {},
}: UseDataProps<TData>): UseDataReturnValues<TData> => {
  const [data, setData] = useState<Partial<TData>>(defaultValues);

  const getValues = useCallback(
    <TKey extends keyof TData>(key: TKey) => {
      const value = data[key];
      return value as TData[TKey] extends undefined
        ? TData[TKey] | undefined
        : TData[TKey];
    },
    [data]
  );

  const setValue = useCallback(
    <TKey extends keyof TData>(
      key: TKey,
      value: TData[TKey] extends undefined
        ? TData[TKey] | undefined
        : TData[TKey]
    ) => {
      setData({ ...data, [key]: value });
    },
    [data]
  );

  return { data, getValues, setValue };
};

export const DataProvider = ({ children, ...props }: DataProviderProps) => {
  return (
    <DataContext.Provider value={{ ...props }}>{children}</DataContext.Provider>
  );
};

export function useDataContext() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
}
