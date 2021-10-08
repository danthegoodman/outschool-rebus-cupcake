import React, { useState, useEffect, useCallback } from "react";
import { Button, Col, Jumbotron, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { Boombox } from "../component/Boombox";
import { SingleEmoji } from "../component/RebusPuzzle";

export default function StartMenu() {
  return (
    <>
      <Row className="py-4">
        <Col xs={0} md={4} />
        <Col className="px-4" xs={12} md={4}>
          <Boombox />
        </Col>
        <Col xs={0} md={4} />
      </Row>
      <Row className="py-4 d-flex justify-content-center">
        <Col xs={12} md={10}>
          <Jumbotron className="p-4 bg-mango rounded">
            <Row>
              <Col>
                <h1 className="text-white text-center display-2 bg-blurple rounded py-2">
                  Outschool Rebus Puzzles
                </h1>
                <h4 className="lead text-center">
                  Challenge your friends and coworkers to some good-natured
                  competition.
                </h4>
                <hr className="my-2" />
              </Col>
            </Row>
            <Row className="align-middle pt-3 d-flex justify-content-center">
              <Col xs={4}>
                <h3 className="text-center">Start a game:</h3>
              </Col>
              <Col
                className="d-flex justify-content-center align-bottom"
                xs={2}
              ></Col>
              <Col className="d-flex justify-content-center" xs={4}>
                <h3>Add/delete rebus puzzles:</h3>
              </Col>
            </Row>
            <Row className="align-middle pt-2 mb-1 d-flex justify-content-center">
              <Col className="d-flex justify-content-center" xs={5} md={4}>
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
              <Col className="d-flex justify-content-center" xs={5} md={4}>
                <Button tag={Link} color="blurple" to="/manage">
                  Manage!
                </Button>
              </Col>
            </Row>
          </Jumbotron>
        </Col>
      </Row>
      <Row className="py-2 px-1 d-flex justify-content-end ">
        <Col xs={4} md={10}>
          {" "}
        </Col>
        <Col className="px-1 mx-2 d-flex justify-content-end" xs={4} md={2}>
          <Button className="btn-blurple px-4 py-2 mb-4" href="/auth/logout">
            Logout
          </Button>
        </Col>
        <Col xs={1} />
      </Row>
    </>
  );
}
