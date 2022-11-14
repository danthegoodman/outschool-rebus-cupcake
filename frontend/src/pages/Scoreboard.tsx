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

export default function PlayTimedPage() {
  return (
	<>
	  <Row className="py-4 mx-2 mt-4" xs={2}>
		<Col xs={0} md={2} />
		<Col className="text-center " xs={12} md={8}>
		  <h1 className="text-white text-center display-4 bg-blurple rounded py-2">
			Outschool Rebus Puzzles: Scoreboard!
		  </h1>
		</Col>
		<Col xs={0} md={2} />
	  </Row>
	  <Row className="py-2 d-flex justify-content-center">
		<Col xs={0} md={1} />
		<Col xs={12} md={10}>
		  <Jumbotron className="bg-mango rounded">
			<TopScores />
		  </Jumbotron>
		</Col>
		<Col xs={0} md={1} />
	  </Row>
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
const IS_DEVMODE =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

function TopScores() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const { get, post, data, error } = useFetch(
	`/api/score`
  );

  useEffect(() => {
	get();
	// eslint-disable-next-line
  }, []);

  if (error) return <div>{error.message ?? error}</div>;
  if (!data) return <div>Loading...</div>;

  //TODO loading image when saving or when needing to save?
  return (
	<div className="px-2 pt-4">
	  <Table className="responsive-table">
		<thead>
		  <tr>
			<th> </th>
			<th>User</th>
			<th>Score</th>
		  </tr>
		</thead>
		<tbody>{data.scores.map((it, ndx) => renderRow(ndx))}</tbody>
	  </Table>
	</div>
  );

  function renderRow(index: number) {
	const user = data?.user[index] ?? "";
	const score = data?.score?.[index] ?? "";

	return (
	  <tr key={index}>
		<td className="align-middle p-1">
		  <div className="label">Place</div>
		  <h3>{index+1}</h3>
		</td>
		<td className="align-middle">
		  <div className="label">User</div>
		  <h3>{user}</h3>
		</td>
		<td className="align-middle px-2">
		  <div className="label">Score</div>
		  <p>{score}</p>
		</td>
	  </tr>
	);
	
  }
}
