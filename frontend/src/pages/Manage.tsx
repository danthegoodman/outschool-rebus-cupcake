import React, { useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { Link } from "react-router-dom";
import { Col, Jumbotron, Row } from "reactstrap";
import appleEmojis from "../static/emoji-apple.json";
import customEmojis from "../static/emoji-custom.json";
import { useGet, useDelete, usePost } from "../util/fetch";
import { RebusPuzzle } from "../component/RebusPuzzle";

export default function ManageView() {
  return (
    <>
      <Row className="py-4 mx-2" xs={2}>
        <Col xs={2} />
        <Col className="px-4 mx-2 text-center" xs={8}>
          <h1>Outschool Rebus Puzzles: Management</h1>
        </Col>
        <Col xs={2} />
      </Row>
      <Row className="py-4 mx-2">
        <Col>
          <Jumbotron className="m-4 p-4 bg-mango rounded">
            <RebusList />
            <RebusInput />
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to="/start">Back to Start Page</Link>
        </Col>
      </Row>
    </>
  );
}

type IRebus = {
  puzzle: string;
  solution: string;
  contributor: string;
};

function RebusList() {
  const {data, error} = useGet<IRebus[]>("/api/rebus");

  if (error) return <div>Error: {error.message ?? error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <table>
      <thead>
      <tr>
        <th>Rebus</th>
        <th>Solution</th>
        <th>Owner</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {data.map((it) => <RebusRow key={it.puzzle} rebus={it}/>)}
      </tbody>
    </table>
  );
}

function RebusRow({rebus}: { rebus: IRebus }) {
  const {del} = useDelete("/api/rebus");

  function handleDelete() {
    del({puzzle: rebus.puzzle});
  }

  return (
    <tr>
      <td>
        <RebusPuzzle puzzle={rebus.puzzle}/>
      </td>
      <td>
        {rebus.solution}
      </td>
      <td title={rebus.contributor}>
        {rebus.contributor.replace('@outschool.com','')}
      </td>
      <td>
        <span
                onClick={handleDelete}
                style={{color: "red", cursor: "pointer"}}
              >
        X
      </span>
      </td>
    </tr>
  );
}

function RebusInput() {
  const {post} = usePost<IRebus[]>("/api/rebus");
  const [puzzle, setPuzzle] = useState("");
  const [solution, setSolution] = useState("");

  function handlePuzzleChange(
    _e: unknown,
    newValue: string,
    newPlainTextValue: string
  ) {
    console.log({newValue, newPlainTextValue});
    setPuzzle(newValue);
  }

  function handleSolutionChange(e: React.SyntheticEvent<HTMLInputElement>) {
    setSolution(e.currentTarget.value);
  }

  function handleSave() {
    post({puzzle, solution});
  }

  const appleEmojisArray = Object.keys(appleEmojis).map((key) => ({
    id: key,
    // @ts-ignore json loading stuff
    display: appleEmojis[key],
  }));
  const customEmojisArray = Object.keys(customEmojis).map((key) => ({
    id: key,
    // @ts-ignore json loading stuff
    display: customEmojis[key],
  }));

  const allEmojis = [...appleEmojisArray, ...customEmojisArray];

  return (
    <div>
      <MentionsInput value={puzzle} onChange={handlePuzzleChange}>
        <Mention
          trigger=":"
          markup="[__display__](__id__)"
          data={allEmojis}
          appendSpaceOnAdd
          renderSuggestion={(
            suggestion,
            search,
            highlightedDisplay,
            index,
            focused
          ) => {
            return (
              <div>
                <img src={suggestion.display} alt=""/>
              </div>
            );
          }}
        />
      </MentionsInput>
      <input
        value={solution}
        onChange={handleSolutionChange}
        placeholder="Potluck"
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
