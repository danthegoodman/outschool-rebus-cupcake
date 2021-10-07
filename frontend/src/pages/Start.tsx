import React, { useState, useEffect, useCallback } from "react";
import { Button, Col, Jumbotron, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { Boombox } from "../component/Boombox";

export default function StartMenu() {
  return (
    <>
      <Row className="py-4 mx-2" xs={3}>
        <Col xs={4} />
        <Col className="px-4 mx-2" xs={4}>
          <Boombox />
        </Col>
        <Col xs={4} />
      </Row>
      <Row className="py-4 mx-2">
        <Col>
          <Jumbotron className="m-4 p-4 bg-mango rounded">
            <h1>Outschool Rebus Puzzles</h1>
            <p className="lead">
              Challenge your friends and coworkers to some good-natured
              competition.
            </p>
            <hr className="my-2" />
            <p>Start a game below</p>
            <p className="lead">
              <Button tag={Link} color="blurple" to="/play">
                Play!
              </Button>
            </p>

            <p>Or add/delete rebus puzzles:</p>
            <p className="lead">
              <Button tag={Link} color="blurple" to="/manage">
                Manage!
              </Button>
            </p>
          </Jumbotron>
        </Col>
      </Row>
      <Row className="py-4 mx-2">
        <Col className="px-4 mx-2 float-sm-right" xs={2}>
          <Button className="btn-blurple" href="/auth/logout">
            Logout
          </Button>
        </Col>
      </Row>
    </>
  );
}
