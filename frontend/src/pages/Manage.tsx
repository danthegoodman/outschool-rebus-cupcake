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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
          <h1 className="bg-blurple text-white display-4 rounded py-3">
            Outschool Rebus Puzzles: Management
          </h1>
        </Col>
        <Col xs={2} />
      </Row>
      <Row className="py-4 mx-2">
        <Col className="px-4 mx-2">
          <Link className="btn btn-blurple" to="/start">
            Back to Start Page
          </Link>
        </Col>
      </Row>
      <Row className="py-2 mx-2">
        <Col>
          <RebusJumbotron />
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(false);
    setData((prev) => [...prev, rebus]);
  }
  function handleSelect(rebus: IRebus) {
    setSeletectedPuzzle(rebus);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setSeletectedPuzzle(null);
    setIsModalOpen(false);
  }

  if (error) return <div>Error: {error.message ?? error}</div>;
  if (!data.length) return <div>Loading...</div>;

  return (
    <Jumbotron className="m-4 p-4 bg-mango rounded">
      <Button
        className="btn-blurple"
        style={{ marginTop: "auto", marginLeft: "20px" }}
        onClick={() => setIsModalOpen(true)}
      >
        Add Puzzle
      </Button>
      <RebusTable
        puzzles={data}
        showContributor
        onDelete={handleDelete}
        onSelect={handleSelect}
      />
      <RedusEditModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleUpdate}
        selected={selectedPuzzle}
      />
    </Jumbotron>
  );
}

function RebusTable({
  puzzles,
  hideControls = false,
  showContributor,
  onDelete,
  onSelect,
}: {
  puzzles: IRebus[];
  hideControls?: boolean;
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
          {!hideControls && (
            <>
              <th />
              <th />
            </>
          )}
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
            hideControls={hideControls}
          />
        ))}
      </tbody>
    </Table>
  );
}

function RebusRow({
  rebus,
  hideControls = false,
  showContributor,
  onDelete,
  onSelect,
}: {
  rebus: IRebus;
  showContributor?: boolean;
  hideControls?: boolean;
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
      <td className="align-middle p-1">
        <RebusPuzzle puzzle={rebus.puzzle} />
      </td>
      <td className="align-middle px-2">{rebus.solution}</td>
      <td className="align-middle px-2">
        {rebus.hint ? rebus.hint : "No hints!"}
      </td>
      {showContributor && (
        <td className="align-middle px-2" title={rebus.contributor}>
          {rebus.contributor.replace("@outschool.com", "")}
        </td>
      )}
      {!hideControls && (
        <>
          <td className="align-middle px-2">
            {canEdit && (
              <span
                onClick={handleDelete}
                style={{ color: "red", cursor: "pointer" }}
              >
                X
              </span>
            )}
          </td>
          <td className="align-middle px-2">
            {canEdit && (
              <Button className="btn-blurple" onClick={handleClick}>
                Edit
              </Button>
            )}
          </td>
        </>
      )}
    </tr>
  );
}

type RebusKeys = "puzzle" | "solution" | "hint";

function RebusInput({
  rebus: { puzzle, solution, hint },
  disablePuzzle,
  onChange,
}: {
  rebus: IRebus;
  disablePuzzle?: boolean;
  onChange: (key: RebusKeys, value: string) => void;
}) {
  function handlePuzzleChange(e: React.SyntheticEvent<HTMLInputElement>) {
    onChange("puzzle", e.currentTarget.value);
  }

  function handleSolutionChange(e: React.SyntheticEvent<HTMLInputElement>) {
    onChange("solution", e.currentTarget.value);
  }

  function handleHintChange(e: React.SyntheticEvent<HTMLInputElement>) {
    onChange("hint", e.currentTarget.value);
  }

  return (
    <div>
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
            disabled={disablePuzzle}
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
      </div>
    </div>
  );
}

interface RedusEditModalProps {
  open: boolean;
  selected: IRebus | null;
  onClose: () => void;
  onSave: (rebus: IRebus) => void;
}

function RedusEditModal({
  open,
  selected,
  onClose,
  onSave,
}: RedusEditModalProps) {
  const [puzzle, setPuzzle] = useState({
    puzzle: "",
    solution: "",
    hint: "",
    contributor: getUserData().email,
  });

  useEffect(() => {
    if (selected) {
      setPuzzle(selected);
    } else {
      setPuzzle({
        puzzle: "",
        solution: "",
        hint: "",
        contributor: getUserData().email,
      });
    }
  }, [selected]);

  function handleChange(key: RebusKeys, value: string) {
    setPuzzle((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    onSave(puzzle);
  }

  return (
    <Modal size="xl" isOpen={open} toggle={onClose}>
      <ModalHeader toggle={onClose}>
        {selected ? "Edit" : "Add"} Rebus Puzzle
      </ModalHeader>
      <ModalBody>
        <RebusTable hideControls puzzles={[puzzle]} />
        <RebusInput
          rebus={puzzle}
          disablePuzzle={!!selected}
          onChange={handleChange}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={onClose}>
          Cancel
        </Button>
        <Button className="btn-blurple" onClick={handleSave}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}
