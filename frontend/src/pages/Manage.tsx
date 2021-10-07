import React, { useEffect, useState } from "react";
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
import useFetch from "use-http";
import { RebusPuzzle } from "../component/RebusPuzzle";
import { getUserData } from "../util/auth";

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
          <RebusJumbotron />
        </Col>
      </Row>
      <Row className="py-4 mx-2">
        <Col className="px-4 mx-2">
          <Link className="btn btn-blurple" to="/start">
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
  hint: string;
  contributor: string;
};

function RebusJumbotron() {
  const [data, setData] = useState<IRebus[]>([]);
  const { get, post, del, error } = useFetch<IRebus[]>("/api/rebus");
  const [selectedPuzzle, setSeletectedPuzzle] = useState<IRebus | null>(null);

  useEffect(() => {
    get().then(setData);
  }, [get]);

  function handleDelete(rebus: IRebus) {
    del({ puzzle: rebus.puzzle });
    setData((prev) => prev.filter((it) => it.puzzle !== rebus.puzzle));
  }
  function handleUpdate(rebus: IRebus) {
    post(rebus);
    setSeletectedPuzzle(null);
    setData((prev) => [...prev, rebus]);
  }
  function handleSelect(rebus: IRebus) {
    setSeletectedPuzzle(rebus);
  }

  if (error) return <div>Error: {error.message ?? error}</div>;
  if (!data.length) return <div>Loading...</div>;

  return (
    <Jumbotron className="m-4 p-4 bg-mango rounded">
      <RebusTable
        puzzles={data}
        showContributor
        onDelete={handleDelete}
        onSelect={handleSelect}
      />
      <hr />
      <RebusInput onUpdate={handleUpdate} selected={selectedPuzzle} />
    </Jumbotron>
  );
}

function RebusTable({
  puzzles,
  showContributor,
  onDelete,
  onSelect,
}: {
  puzzles: IRebus[];
  showContributor?: boolean;
  onDelete?: (rebus: IRebus) => void;
  onSelect?: (rebus: IRebus) => void;
}) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Rebus</th>
          <th>Solution</th>

          <th>Hint</th>
          {showContributor && <th>Owner</th>}
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {puzzles.map((it) => (
          <RebusRow
            key={it.puzzle}
            rebus={it}
            showContributor={showContributor}
            onDelete={onDelete}
            onSelect={onSelect}
          />
        ))}
      </tbody>
    </Table>
  );
}

function RebusRow({
  rebus,
  showContributor,
  onDelete,
  onSelect,
}: {
  rebus: IRebus;
  showContributor?: boolean;
  onDelete?: (rebus: IRebus) => void;
  onSelect?: (rebus: IRebus) => void;
}) {
  function handleDelete() {
    onDelete && onDelete(rebus);
  }

  function handleClick() {
    onSelect && onSelect(rebus);
  }

  const canEdit = rebus.contributor === getUserData().email;

  return (
    <tr>
      <td>
        <RebusPuzzle puzzle={rebus.puzzle} />
      </td>
      <td>{rebus.solution}</td>
      <td>{rebus.hint ? rebus.hint : "No hints!"}</td>
      {showContributor && (
        <td title={rebus.contributor}>
          {rebus.contributor.replace("@outschool.com", "")}
        </td>
      )}
      <td>
        {canEdit && (
          <span
            onClick={handleDelete}
            style={{ color: "red", cursor: "pointer" }}
          >
            X
          </span>
        )}
      </td>
      <td>
        {canEdit && (
          <Button className="btn-blurple" onClick={handleClick}>
            Edit
          </Button>
        )}
      </td>
    </tr>
  );
}

function RebusInput({
  selected,
  onUpdate,
}: {
  selected: IRebus | null;
  onUpdate: (r: IRebus) => void;
}) {
  const [puzzle, setPuzzle] = useState("");
  const [solution, setSolution] = useState("");
  const [hint, setHint] = useState("");
  const contributor = getUserData().email;

  useEffect(() => {
    if (selected) {
      setPuzzle(selected.puzzle);
      setSolution(selected.solution);
      setHint(selected.hint);
    } else {
      setPuzzle("");
      setSolution("");
      setHint("");
    }
  }, [selected]);

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
    if (!solution || !hint || !puzzle) return;
    onUpdate({ puzzle, solution, hint, contributor });
    setPuzzle("");
    setSolution("");
    setHint("");
  }

  return (
    <div>
      {(puzzle.length > 0 || solution.length > 0) && (
        <RebusTable puzzles={[{ puzzle, solution, hint, contributor }]} />
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
          <Input
            value={puzzle}
            onChange={handlePuzzleChange}
            disabled={!!selected}
          />
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
          className="btn-blurple"
          style={{ marginTop: "auto", marginLeft: "20px" }}
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
