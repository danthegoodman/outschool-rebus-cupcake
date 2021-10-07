import React, { useState, useEffect, useCallback } from "react";
import { Jumbotron } from "reactstrap";
import {Link, Redirect, useParams} from "react-router-dom";
import {useGet} from "../util/fetch";

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

function PlayGame(props: {gameId: string}){
  const {data, error} = useGet(`/api/game?id=${encodeURIComponent(props.gameId)}`);

  if(error) return <div>{error.message ?? error}</div>
  if(!data) return <div>Loading...</div>;
  return <pre>gameData={JSON.stringify(data, null,2)}</pre>
}
