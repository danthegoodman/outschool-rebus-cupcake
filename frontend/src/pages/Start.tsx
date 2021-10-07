import React, { useState, useEffect, useCallback } from "react";
import { Button, Jumbotron } from "reactstrap";
import {Link} from "react-router-dom";

export default function StartMenu() {
  return (
    <div>
      <Jumbotron className="m-4 p-4 bg-mango">
        <h1>Outschool Rebus Puzzles</h1>
        <p className="lead">
          Challenge your friends and coworkers to some good-natured competition.
        </p>
        <hr className="my-2" />
        <p>Start a game below</p>
        <p className="lead">
          <Button tag={Link} color="primary" to="/play">
            Play!
          </Button>
        </p>

        <p>Or add/delete rebus puzzles:</p>
        <p className="lead">
          <Button tag={Link} color="primary" to="/manage">
            Manage!
          </Button>
        </p>
      </Jumbotron>
      <a href="/auth/logout">Logout</a>
    </div>
  );
}
