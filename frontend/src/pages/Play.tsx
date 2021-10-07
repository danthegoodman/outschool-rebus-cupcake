import React, { useState, useEffect, useCallback } from "react";
import { Jumbotron } from "reactstrap";
import {Link, Redirect, useParams} from "react-router-dom";

export default function PlayPage() {
  const {gameId} = useParams<{gameId: string}>();
  if(!gameId){
    return <Redirect to={`/play/${new Date().getTime()}`}/>
  }

  return (
    <div>
      <Jumbotron className="m-4 p-4 bg-mango">
        <h1>Outschool Rebus Puzzles</h1>
        <p>TODO: GameId={gameId}</p>
      </Jumbotron>
      <Link to="/start">Back to Start Page</Link>
    </div>
  );
}
