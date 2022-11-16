import React, {} from "react";
import {Col, Jumbotron, Row} from "reactstrap";
import {TopScores} from "../component/TopScores";

export function Scoreboard() {
  return (
    <Row className="align-middle d-flex justify-content-center">
      <Jumbotron className="py-4 my-4 bg-mango rounded">
        <Row className="py-2">
          <Col xs={0} md={2}/>
          <Col className="text-center" xs={12} md={8}>
            <h2
              className="text-white text-center archivo-black bg-blurple rounded py-2">
              Scoreboard!
            </h2>
          </Col>
          <Col xs={0} md={1}/>
        </Row>
        <Row className="py-2 d-flex justify-content-center">
          <Col xs={0} md={1}/>
          <Col xs={12} md={10}>
            <TopScores autoreload/>
          </Col>
          <Col xs={0} md={1}/>
        </Row>
      </Jumbotron>
    </Row>
  );
}
