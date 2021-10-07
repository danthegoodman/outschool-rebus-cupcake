import React, { useState, useEffect, useCallback } from "react";
import { Jumbotron } from "reactstrap";
import {Link, Redirect, useParams} from "react-router-dom";
import {RebusPuzzle} from "../component/RebusPuzzle";

export default function PlayPage() {
  const {gameId} = useParams<{gameId?: string}>();
  if(!gameId){
    return <Redirect to={`/play/${new Date().getTime()}`}/>
  }

  return (
    <div>
      <Jumbotron className="m-4 p-4 bg-mango">
        <h1>Outschool Rebus Puzzles</h1>
        <PlayGame gameId={gameId}/>
      </Jumbotron>
      <Link to="/start">Back to Start Page</Link>
    </div>
  );
}

type GameData = {
  id: string;
  email: string;
  puzzles: string[];
  guesses: string[];
}
function PlayGame(props: {gameId: string}){
  const {data, error, post} = useFetchGame(props.gameId);

  if(error) return <div>{error.message ?? error}</div>
  if(!data) return <div>Loading...</div>;

  return (
    <div>
      {data.puzzles.map(it=> <RebusPuzzle key={it} puzzle={it}/>)}
      <pre>gameData={JSON.stringify(data, null,2)}</pre>
    </div>
  );
}

function useFetchGame(gameId: string) {
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<GameData | undefined>(undefined);

  useEffect(() => {
    fetch(`/api/game?id=${encodeURIComponent(gameId)}`)
      .then((res) => res.json())
      .then(setData, setError);
  }, [gameId]);

  const post = useCallback(
    (data: GameData) => {
      fetch(`/api/game?id=${encodeURIComponent(gameId)}`, { method: "POST", body: JSON.stringify(data) })
        .then((res) => res.json())
        .then(setData, setError);
    },
    [gameId]
  );

  return { data, error, post } as const;
}
