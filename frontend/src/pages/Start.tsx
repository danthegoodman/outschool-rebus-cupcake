import React, { useState, useEffect, useCallback } from "react";
import { Button, Col, Jumbotron, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { Boombox } from "../component/Boombox";
import { SingleEmoji } from "../component/RebusPuzzle";

export default function StartMenu() {
  return (
    <>
      <Row className="py-4 mx-2" xs={3}>
        <Col xs={1} md={4} />
        <Col className="px-4 mx-2" xs={10} md={4}>
          <Boombox />
        </Col>
        <Col xs={1} md={4} />
      </Row>
      <Row className="py-4 mx-2">
        <Col>
          <Jumbotron className="m-4 p-4 bg-mango rounded">
            <Row>
              <Col>
                <h1 className="text-white display-2 bg-blurple rounded d-flex justify-content-center py-2">
                  Outschool Rebus Puzzles
                </h1>
                <h4 className="lead d-flex justify-content-center">
                  Challenge your friends and coworkers to some good-natured
                  competition.
                </h4>
                <hr className="my-2" />
              </Col>
            </Row>
            <Row className="align-middle pt-3 d-flex justify-content-center">
              <Col className="d-flex justify-content-center" xs={4}>
                <h3>Start a game:</h3>
              </Col>
              <Col
                className="d-flex justify-content-center align-bottom"
                xs={2}
              ></Col>
              <Col className="d-flex justify-content-center" xs={4}>
                <h3>Add/delete rebus puzzles:</h3>
              </Col>
            </Row>
            <Row className="align-middle pt-3 mb-2 d-flex justify-content-center">
              <Col className="d-flex justify-content-center" xs={4}>
                <Button tag={Link} color="blurple" to="/play">
                  Play!
                </Button>
              </Col>
              <Col
                className="d-flex justify-content-center align-bottom"
                xs={2}
              >
                <h4>
                  <SingleEmoji shortName="sparkles" />
                  OR
                  <SingleEmoji shortName="sparkles" />
                </h4>
              </Col>
              <Col className="d-flex justify-content-center" xs={4}>
                <Button tag={Link} color="blurple" to="/manage">
                  Manage!
                </Button>
              </Col>
            </Row>
          </Jumbotron>
        </Col>
      </Row>
      <Row className="py-2 px-1">
        <Col className="px-4 mx-2 " xs={10} />
        <Col className="px-4 mx-2 " xs={1}>
          <Button className="btn-blurple px-4 py-2" href="/auth/logout">
            Logout
          </Button>
        </Col>
      </Row>
    </>
  );
}
