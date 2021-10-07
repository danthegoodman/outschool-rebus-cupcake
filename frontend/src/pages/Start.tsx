import React, { useState, useEffect, useCallback } from "react";
import { Button, Col, Jumbotron, Row } from "reactstrap";
import { Link } from "react-router-dom";
import navyLogo from "../img/CW-logo-2021-NAVY.png";

export default function StartMenu() {
  return (
    <>
      <Row className="py-4 mx-2" xs={2}>
        <Col xs={3} />
        <Col className="px-4 mx-2" xs={6}>
          <img
            className="img-fluid"
            src={navyLogo}
            alt="Cupcake Week 2021 boombox logo"
          />
        </Col>
        <Col xs={3} />
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
        </Col>
      </Row>
      <Row className="py-4 mx-2">
        <Col className="px-4 mx-2 float-sm-right" xs={2}>
          <Button className="ghost" href="/auth/logout">
            Logout
          </Button>
        </Col>
      </Row>
    </>
  );
}
