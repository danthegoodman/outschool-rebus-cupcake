import React, { useState, useEffect, useCallback } from "react";
import { Button, Jumbotron } from "reactstrap";
import {Link} from "react-router-dom";

export default function StartMenu() {
  return (
    <div>
      <Jumbotron className="m-4 p-4 bg-mango">
        <h1>Outschool Rebus Puzzles</h1>
        <p>TODO</p>
      </Jumbotron>
      <Link to="/start">Back to Start Page</Link>
    </div>
  );
}
