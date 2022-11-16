import { Button, Col, Jumbotron, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { Boombox } from "../component/Boombox";
import { SingleEmoji } from "../component/RebusPuzzle";
import { Scoreboard } from "../component/Scoreboard"

export default function StartMenu() {
  return (
    <>
      <Row className="py-4">
        <Col xs={3} md={4} />
        <Col className="pt-2 m-2" xs={6} md={4}>
          <Boombox />
        </Col>
        <Col xs={1} md={4}></Col>
      </Row>
      <Row className="py-2 pb-4 d-flex justify-content-center">
        <Col xs={12} md={10}>
          <Jumbotron className="p-4 bg-mango rounded">
            <Row>
              <Col>
                <h2 className="text-white text-center archivo-black bg-blurple rounded py-2">
                  Outschool Rebus Puzzles
                </h2>
                <h4 className="py-2 archivo-paragraph text-center">
                  Challenge your friends and coworkers to some good-natured
                  competition.
                </h4>
                <hr className="my-2" />
              </Col>
            </Row>
            <Row className="align-middle pt-3 d-flex justify-content-center">
              <Col xs={3}>
                <h4 className="text-center archivo-black">Get Warmed Up</h4>
              </Col>
              <Col
                className="d-flex justify-content-center align-bottom"
                xs={1}
              ></Col>
              <Col xs={3}>
                <h4 className="text-center archivo-black">Start a game</h4>
              </Col>
              <Col
                className="d-flex justify-content-center align-bottom"
                xs={1}
              ></Col>
              <Col className="d-flex justify-content-center" xs={3}>
                <h4 className="text-center archivo-black">Edit rebus puzzles</h4>
              </Col>
            </Row>
            <Row className="align-middle pt-2 mb-1 d-flex justify-content-center">
              <Col className="d-flex justify-content-center" xs={5} md={3}>
                <Button tag={Link} color="blurple" to="/practice">
                  Practice!
                </Button>
              </Col>
              <Col
                className="d-flex justify-content-center align-bottom"
                xs={1}
              >
                <h4><SingleEmoji shortName="sparkles" /></h4>
              </Col>
              <Col className="d-flex justify-content-center" xs={5} md={3}>
                <Button tag={Link} color="blurple" to="/play">
                  Play!
                </Button>
              </Col>
              <Col
                className="d-flex justify-content-center align-bottom"
                xs={1}
              >
                <h4><SingleEmoji shortName="sparkles" /></h4>
              </Col>
              <Col className="d-flex justify-content-center" xs={5} md={3}>
                <Button tag={Link} color="blurple" to="/manage">
                  Manage!
                </Button>
              </Col>
            </Row>
          </Jumbotron>
        </Col>
      </Row>
      <hr />
      <Row className="align-middle d-flex justify-content-center">
      <Col xs={12} md={10}>
      <Jumbotron className="py-4 my-4 bg-mango rounded">
        <Scoreboard />
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
