import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Jumbotron,
  Row,
  Input,
  Button,
  FormGroup,
  Label,
  Table,
} from "reactstrap";
import { useGet, useDelete, usePost } from "../util/fetch";
import { RebusPuzzle } from "../component/RebusPuzzle";

export default function ManageView() {
  return (
    <>
      <Row className="py-4 mx-2 mt-4" xs={2}>
        <Col xs={2} />
        <Col className="px-4 mx-2 text-center" xs={8}>
          <h1>Outschool Rebus Puzzles: Management</h1>
        </Col>
        <Col xs={2} />
      </Row>
      <Row className="py-2 mx-2">
        <Col>
          <Jumbotron className="m-4 p-4 bg-mango rounded">
            <RebusList />
            <hr />
            <RebusInput />
          </Jumbotron>
        </Col>
      </Row>
      <Row className="py-4 mx-2">
        <Col className="px-4 mx-2">
          <Link className="btn btn-secondary" to="/start">
            Back to Start Page
          </Link>
        </Col>
      </Row>
    </>
  );
}

type IRebus = {
  puzzle: string;
  solution: string;
  hint?: string;
  contributor: string;
};

function RebusList() {
  const { data, error } = useGet<IRebus[]>("/api/rebus");
  const { del } = useDelete("/api/rebus");

  function handleDelete(rebus: IRebus) {
    del({ puzzle: rebus.puzzle });
  }

  if (error) return <div>Error: {error.message ?? error}</div>;
  if (!data) return <div>Loading...</div>;

  return <RebusTable puzzles={data} onDelete={handleDelete} />;
}

function RebusTable({
  puzzles,
  onDelete,
}: {
  puzzles: IRebus[];
  onDelete?: (rebus: IRebus) => void;
}) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Rebus</th>
          <th>Solution</th>

          <th>Hint</th>
          {!!onDelete && <th>Owner</th>}
        </tr>
      </thead>
      <tbody>
        {puzzles.map((it) => (
          <RebusRow key={it.puzzle} rebus={it} onDelete={onDelete} />
        ))}
      </tbody>
    </Table>
  );
}

function RebusRow({
  rebus,
  onDelete,
}: {
  rebus: IRebus;
  onDelete?: (rebus: IRebus) => void;
}) {
  function handleDelete() {
    onDelete && onDelete(rebus);
  }

  return (
    <tr>
      <td>
        <RebusPuzzle puzzle={rebus.puzzle} />
      </td>
      <td>{rebus.solution}</td>
      <td title={rebus.contributor}>{rebus.hint ? rebus.hint : "No hints!"}</td>
      {onDelete && (
        <>
          <td title={rebus.contributor}>
            {rebus.contributor.replace("@outschool.com", "")}
          </td>
          <td>
            <span
              onClick={handleDelete}
              style={{ color: "red", cursor: "pointer" }}
            >
              X
            </span>
          </td>
        </>
      )}
    </tr>
  );
}

function RebusInput() {
  const { post } = usePost<IRebus[]>("/api/rebus");
  const [puzzle, setPuzzle] = useState("");
  const [solution, setSolution] = useState("");
  const [hint, setHint] = useState("");

  function handlePuzzleChange(e: React.SyntheticEvent<HTMLInputElement>) {
    setPuzzle(e.currentTarget.value);
  }

  function handleSolutionChange(e: React.SyntheticEvent<HTMLInputElement>) {
    setSolution(e.currentTarget.value);
  }

  function handleHintChange(e: React.SyntheticEvent<HTMLInputElement>) {
    setHint(e.currentTarget.value);
  }

  function handleSave() {
    post({ puzzle, solution, hint });
  }

  return (
    <div>
      {(puzzle.length > 0 || solution.length > 0) && (
        <RebusTable
          puzzles={[{ puzzle, solution, hint, contributor: "you!" }]}
        />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <FormGroup>
          <Label>Puzzle</Label>
          <Input value={puzzle} onChange={handlePuzzleChange} />
        </FormGroup>
        <div
          style={{
            marginLeft: "10px",
            marginRight: "10px",
            marginTop: "auto",
            marginBottom: "10px",
          }}
        >
          =
        </div>
        <FormGroup>
          <Label>Solution</Label>
          <Input
            value={solution}
            onChange={handleSolutionChange}
            placeholder="Larry"
          />
        </FormGroup>
        <FormGroup style={{ marginLeft: "20px" }}>
          <Label>Hint</Label>
          <Input
            value={hint}
            onChange={handleHintChange}
            placeholder="Learner Pod"
          />
        </FormGroup>
        <Button
          style={{ marginTop: "auto", marginLeft: "20px" }}
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
