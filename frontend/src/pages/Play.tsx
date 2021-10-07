import React, { useState, useEffect, useCallback } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import { Button, Col, Jumbotron, Row, Table } from "reactstrap";
import { RebusPuzzle } from "../component/RebusPuzzle";
import useFetch from "use-http";
import { useAutosave } from "react-autosave";
import devtools from "devtools-detect";
export default function PlayPage() {
  const { gameId } = useParams<{ gameId?: string }>();
  if (!gameId) {
    return <Redirect to={`/play/${new Date().getTime()}`} />;
  }

  return (
    <>
      <Row className="py-4 mx-2 mt-4" xs={2}>
        <Col xs={2} />
        <Col className="px-4 mx-2 text-center " xs={8}>
          <h1 className="blurple">Outschool Rebus Puzzles: Play!</h1>
        </Col>
        <Col xs={2} />
      </Row>
      <Row className="py-2 mx-2">
        <Col>
          <Jumbotron className="m-4 p-4 bg-mango rounded">
            <PlayGame gameId={gameId} />
          </Jumbotron>
        </Col>
      </Row>
      <Row className="py-4 mx-2">
        <Col className="px-4 mx-2">
          <Link className="btn btn-secondary" to="/start">
            Back to Start Page
          </Link>
        </Col>
      </Row>
    </>
  );
}
const IS_DEVMODE =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

type GameData = {
  id: string;
  email: string;
  puzzles: string[];
  solutions: string[];
  guesses: string[];
  hacker: boolean;
};
function PlayGame(props: { gameId: string }) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const { get, post, data, loading, error } = useFetch<GameData>(
    `/api/game?id=${encodeURIComponent(props.gameId)}`
  );
  const [hackingDetected, setHackingDetected] = useState(false);

  const doSave = useCallback(
    async (flushedGuesses: string[]) => {
      if (!flushedGuesses.length) return;
      if (JSON.stringify(data?.guesses) === JSON.stringify(flushedGuesses))
        return;

      const newData = { ...data };
      newData.guesses = flushedGuesses;
      return post(newData);
    },
    [post, data]
  );
  useAutosave({ data: guesses, onSave: doSave, interval: 3000 });

  const doMarkHacker = useCallback(
    (arg?: boolean) => {
      if (!arg && IS_DEVMODE) {
        console.log(
          "you would have been marked a hacker, but this is development. You can call DO_MARK_HACKER from here to trigger this anyway."
        );
        return;
      }
      setHackingDetected(true);
      const newData = { ...data };
      newData.hacker = true;
      post(newData);
    },
    [post, data]
  );
  useEffect(() => {
    get();
  }, []);
  useEffect(() => {
    if (!data) return;
    if (IS_DEVMODE) {
      (window as any).DO_MARK_HACKER = () => doMarkHacker(true);
    }
    setGuesses(data.guesses);
    setHackingDetected(data.hacker);
    if (!data.hacker && devtools.isOpen) {
      doMarkHacker();
    }
  }, [data, doMarkHacker]);

  useEffect(() => {
    let fn = (event: any) => {
      if (event.detail.isOpen) {
        doMarkHacker();
      }
    };
    window.addEventListener("devtoolschange", fn);
    return () => {
      window.removeEventListener("devtoolschange", fn);
    };
  }, [data, doMarkHacker]);

  if (hackingDetected) {
    return (
      <div>
        <p>
          <img src="/mrresetti.png" />
        </p>
        <p>NO! YOU CANNOT USE THE DEVTOOLS HERE! YOUR GAME IS NULL AND VOID.</p>
      </div>
    );
  }

  if (error) return <div>{error.message ?? error}</div>;
  if (!data) return <div>Loading...</div>;

  //TODO loading image when saving or when needing to save?
  return (
    <div className="mx-2 px-2">
      <Table>
        <thead>
          <tr>
            <th>Rebus</th>
            <th>Your Guess</th>
          </tr>
        </thead>
        <tbody>{data.puzzles.map((it, ndx) => renderRow(ndx))}</tbody>
      </Table>
    </div>
  );

  function renderRow(index: number) {
    const puzzle = data?.puzzles[index] ?? "";
    const guess = guesses?.[index] ?? "";
    const soln = data?.solutions[index] ?? "";

    const backgroundColor =
      guess.length === 0
        ? "#FFF"
        : soln.toLowerCase() === guess.toLowerCase()
        ? "#0F0"
        : "#F44";

    return (
      <tr key={puzzle}>
        <td className="align-middle">
          <RebusPuzzle puzzle={puzzle} />
        </td>
        <td className="align-middle">
          <input
            value={guess}
            onInput={handleInput}
            style={{ backgroundColor }}
          />
        </td>
      </tr>
    );
    function handleInput(e: any) {
      setGuesses((prev) => {
        const next = [...prev];
        next[index] = e.target.value;
        return next;
      });
    }
  }
}
