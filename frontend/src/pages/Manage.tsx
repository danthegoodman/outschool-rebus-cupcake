import React, { useState, useEffect, useCallback } from "react";
import {Link} from "react-router-dom";

export default function ManageView() {
  return (
    <div>
      <h1>Outschool Rebus Puzzles</h1>
      <RebusList />
      <RebusInput />
      <Link to="/start">Back to Start Page</Link>
    </div>
  );
}

type RebusDatum = { text: string } | { image: string; shortName: string };

type IRebus = {
  key: string;
  puzzle: RebusDatum[];
  solution: string;
  contributor: string | null;
};

function RebusList() {
  const { data, error } = useGet<IRebus[]>("/api/rebus");

  if (error) return <div>Error: {error.message ?? error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      {data.map((it) => (
        <Rebus key={it.solution} rebus={it} />
      ))}
    </>
  );
}

function Rebus({ rebus }: { rebus: IRebus }) {
  const { del } = useDelete("/api/rebus");

  function handleDelete() {
    del({ key: rebus.key });
  }

  const puzzle = rebus.puzzle.map((it, ndx) =>
    "text" in it ? (
      <span key={ndx}>{it.text}</span>
    ) : (
      <img key={ndx} src={it.image} alt={it.shortName} />
    )
  );

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <p className="rebus">
        {puzzle} = {rebus.solution}
        <span style={{marginLeft: "6px", fontSize: "12px", color: 'gray'}}>
          (by: {rebus.contributor ?? "unknown"})
        </span>
      </p>
      <span
        onClick={handleDelete}
        style={{ color: "red", marginLeft: "20px", cursor: "pointer" }}
      >
        X
      </span>
    </div>
  );
}

function RebusInput() {
  const { post } = usePost<IRebus[]>("/api/rebus");
  const [puzzle, setPuzzle] = useState("");
  const [solution, setSolution] = useState("");

  function handlePuzzleChange(e: React.SyntheticEvent<HTMLInputElement>) {
    setPuzzle(e.currentTarget.value);
  }

  function handleSolutionChange(e: React.SyntheticEvent<HTMLInputElement>) {
    setSolution(e.currentTarget.value);
  }

  function handleSave() {
    post({ puzzle, solution });
  }

  return (
    <div>
      <input
        value={puzzle}
        onChange={handlePuzzleChange}
        placeholder=":teapot::clover:"
      />
      <input
        value={solution}
        onChange={handleSolutionChange}
        placeholder="Potluck"
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

function useGet<TData>(path: string) {
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TData | undefined>(undefined);

  useEffect(() => {
    fetch(path)
      .then((res) => res.json())
      .then(setData, setError);
  }, [path]);

  return { data, error } as const;
}

function usePost<TData>(path: string) {
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

function useDelete(path: string) {
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
