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
import useFetch from "use-http";
import { useAutosave } from "react-autosave";
import devtools from "devtools-detect";

export function Scoreboard() {
  return (
	<>
	  <Row className="py-2" xs={1}>
		<Col xs={0} md={2} />
		<Col className="text-center " xs={12} md={8}>
		  <h2 className="text-white text-center archivo-black bg-blurple rounded py-2">
			Scoreboard!
		  </h2>
		</Col>
		<Col xs={0} md={1} />
	  </Row>
	  <Row className="py-2 d-flex justify-content-center">
		<Col xs={0} md={1} />
		<Col xs={12} md={10}>
		  
			<TopScores />
		 
		</Col>
		<Col xs={0} md={1} />
	  </Row>
	</>
  );
}

const IS_DEVMODE =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

type ScoreData = {
	scores: ScoreRecord[];
	};
type ScoreRecord = {
	email: string;
	score: Number;
};
	
function TopScores() {
  const { get, post, data, error } = useFetch<ScoreData>(
	`/api/scoreboard`
  );

  useEffect(() => {
	get();
	// eslint-disable-next-line
  }, []);

  if (error) return <div>{error.message ?? error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
	<div className="px-2 pt-2">
	  <Table className="responsive-table">
		<thead>
		  <tr>
			<th> </th>
			<th className="archivo-black">User</th>
			<th className="archivo-black">Score</th>
		  </tr>
		</thead>
		<tbody>{data.scores.map((item, ndx) => renderRow(ndx))}</tbody>
	  </Table>
	</div>
  );

  function renderRow(index: number) {
	const user = data?.scores[index].email ?? "";
	const score = data?.scores[index].score ?? "";

	return (
	  <tr key={index}>
		<td className="align-middle p-1">
		  <div className="label">Place</div>
		  <h4 className="archivo-paragraph">{index+1}.</h4>
		</td>
		<td className="align-middle">
		  <div className="label">User</div>
		  <h4 className="archivo-paragraph">{user}</h4>
		</td>
		<td className="align-middle px-2">
		  <div className="label">Score</div>
		  <h4 className="archivo-paragraph">{score}</h4>
		</td>
	  </tr>
	);
	
  }
}