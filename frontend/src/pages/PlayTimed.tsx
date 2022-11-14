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
  const { gameId } = useParams<{ gameId?: string }>();
  if (!gameId) {
	return <Redirect to={`/play-timed/${new Date().getTime()}`} />;
  }

  return (
	<>
	  <Row className="py-4 mx-2 mt-4" xs={2}>
		<Col xs={0} md={2} />
		<Col className="text-center " xs={12} md={8}>
		  <h1 className="text-white text-center display-4 bg-blurple rounded py-2">
			Outschool Rebus Puzzles: Timed Challenge!
		  </h1>
		</Col>
		<Col xs={0} md={2} />
	  </Row>
	  <Row className="py-2 d-flex justify-content-center">
		<Col xs={0} md={1} />
		<Col xs={12} md={10}>
		  <Jumbotron className="bg-mango rounded">
			<PlayGame gameId={gameId} />
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

type GameData = {
  id: string;
  email: string;
  puzzles: string[];
  solutions: string[];
  guesses: string[];
  hints: string[];
  hacker: boolean;
};
function PlayGame(props: { gameId: string }) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const { get, post, data, error } = useFetch<GameData>(
	`/api/game?id=${encodeURIComponent(props.gameId)}`
  );
  const [hackingDetected, setHackingDetected] = useState(false);
  const [showYouWonModal, setShowYouWonModal] = useState(false);
  const [dismissYouWon, setDismissYouWon] = useState(false);

  const doSave = useCallback(
	(flushedGuesses: string[]) => {
	  if (!flushedGuesses.length) return;
	  if (JSON.stringify(data?.guesses) === JSON.stringify(flushedGuesses))
		return;

	  const newData = { ...data };
	  newData.guesses = flushedGuesses;
	  return post(newData);
	},
	[post, data]
  );
  useAutosave({ data: guesses, onSave: doSave, interval: 3000 });

  const doMarkHacker = useCallback(
	(arg?: boolean) => {
	  if (!arg && IS_DEVMODE) {
		console.log(
		  "you would have been marked a hacker, but this is development. You can call DO_MARK_HACKER from here to trigger this anyway."
		);
		return;
	  }
	  setHackingDetected(true);
	  const newData = { ...data };
	  newData.hacker = true;
	  post(newData);
	},
	[post, data]
  );

  useEffect(() => {
	get();
	// eslint-disable-next-line
  }, []);

  useEffect(() => {
	if (!data) return;
	if (IS_DEVMODE) {
	  (window as any).DO_MARK_HACKER = () => doMarkHacker(true);
	}
	setGuesses(data.guesses);
	setHackingDetected(data.hacker);
	if (!data.hacker && devtools.isOpen) {
	  doMarkHacker();
	}
  }, [data, doMarkHacker]);

  useEffect(() => {
	const fn = (event: any) => {
	  if (event.detail.isOpen) {
		doMarkHacker();
	  }
	};
	globalThis.addEventListener("devtoolschange", fn);
	return () => {
	  globalThis.removeEventListener("devtoolschange", fn);
	};
  }, [data, doMarkHacker]);

  const isAllCorrect = useMemo(() => {
	if (!guesses || !data?.solutions) return false;
	if (guesses.length === 0) return false;
	const totalCorrect = data?.solutions.reduce((t, c, i) => {
	  const guess = guesses[i];
	  if (guess?.toLowerCase() === c.toLowerCase()) {
		return (t += 1);
	  }
	  return t;
	}, 0);
	return totalCorrect === data?.solutions.length ?? 0;
  }, [guesses, data]);

  useEffect(() => {
	if (isAllCorrect && !dismissYouWon) {
	  setShowYouWonModal(true);
	}
  }, [isAllCorrect, dismissYouWon]);

  function handleDismissYouWon() {
	setShowYouWonModal(false);
	setDismissYouWon(true);
  }

  if (hackingDetected) {
	return (
	  <div>
		<p>
		  <img src="/mrresetti.png" alt="" />
		</p>
		<p>NO! YOU CANNOT USE THE DEVTOOLS HERE! YOUR GAME IS NULL AND VOID.</p>
	  </div>
	);
  }

  if (error) return <div>{error.message ?? error}</div>;
  if (!data) return <div>Loading...</div>;

  //TODO loading image when saving or when needing to save?
  return (
	<div className="px-2 pt-4">
	  <Table className="responsive-table">
		<thead>
		  <tr>
			<th>Rebus</th>
			<th>Your Guess</th>
			<th>Hint</th>
		  </tr>
		</thead>
		<tbody>{data.puzzles.map((it, ndx) => renderRow(ndx))}</tbody>
	  </Table>
	  <Modal size="xl" isOpen={showYouWonModal} toggle={handleDismissYouWon}>
		<ModalHeader toggle={handleDismissYouWon}>You Won!</ModalHeader>
		<img
		  alt="You won!"
		  src="https://media.giphy.com/media/3oz8xAFtqoOUUrsh7W/giphy.gif"
		/>
	  </Modal>
	</div>
  );

  function renderRow(index: number) {
	const puzzle = data?.puzzles[index] ?? "";
	const guess = guesses?.[index] ?? "";
	const soln = data?.solutions[index] ?? "";
	const hint = data?.hints?.[index] ?? "";

	const backgroundColor =
	  guess.length === 0
		? "#FFF"
		: soln.toLowerCase() === guess.toLowerCase()
		? "#0F0"
		: "#F44";

	return (
	  <tr key={puzzle}>
		<td className="align-middle p-1">
		  <div className="label">Puzzle</div>
		  <RebusPuzzle puzzle={puzzle} />
		</td>
		<td className="align-middle">
		  <div className="label">Your Guess</div>
		  <Input
			className="pr-5"
			value={guess}
			onInput={handleInput}
			style={{ backgroundColor }}
		  />
		  <RebusProgress input={guess} solution={soln} />
		</td>
		<td className="align-middle px-2">
		  <div className="label">Hint</div>
		  <p>{hint}</p>
		</td>
	  </tr>
	);
	function handleInput(e: any) {
	  setGuesses((prev) => {
		const next = [...prev];
		next[index] = e.target.value;
		return next;
	  });
	}
  }
}
