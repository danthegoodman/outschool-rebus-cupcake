import {useCallback, useEffect, useState} from "react";

export function useGet<TData>(path: string) {
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TData | undefined>(undefined);

  useEffect(() => {
    fetch(path)
      .then((res) => res.json())
      .then(setData, setError);
  }, [path]);

  return { data, error } as const;
}

export function usePost<TData>(path: string) {
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TData | undefined>(undefined);

  const post = useCallback(
    (body) => {
      fetch(path, { method: "POST", body: JSON.stringify(body) })
        .then((res) => res.json())
        .then(setData, setError);
    },
    [path]
  );

  return { data, error, post } as const;
}

export function useDelete(path: string) {
  const [error, setError] = useState<Error | null>(null);

  const del = useCallback(
    (body) => {
      fetch(path, { method: "DELETE", body: JSON.stringify(body) })
        .then((res) => res.json())
        .then(() => {}, setError);
    },
    [path]
  );

  return { error, del } as const;
}
