import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import {
  Col,
  Input,
  Jumbotron,
  Modal,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import { RebusPuzzle } from "../component/RebusPuzzle";
import useFetch from "use-http";
import { useAutosave } from "react-autosave";
import devtools from "devtools-detect";
import { RebusProgress } from "../component/RebusProgress";

export default function PlayPage() {
  return (
    <>
      <Row className="py-4 d-flex justify-content-start">
        <Col xs={0} md={1} />
        <Col className="px-4" xs={6} md={2}>
          <Link className="btn btn-blurple" to="/start">
            Back to Start Page
          </Link>
        </Col>
        <Col xs={0} md={2} />
      </Row>
    </>
  );
}
