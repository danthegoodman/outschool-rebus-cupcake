import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Input,
  Jumbotron,
  Row,
} from "reactstrap";
import {sample} from 'lodash';
import { RebusPuzzle } from "../component/RebusPuzzle";
import { RebusProgress } from "../component/RebusProgress";
import { IRebus } from "./Manage";
import useCountDown from 'react-countdown-hook';
import useFetch, {CachePolicies} from "use-http";

const addScoreCtx = createContext<(n:number)=> void>(()=>0);

export default function PlayPage() {
  return (
    <>
      <Row className="py-4 mx-2 mt-4" xs={2}>
        <Col xs={0} md={2} />
        <Col className="text-center " xs={12} md={8}>
          <h1 className="text-white text-center display-4 bg-blurple rounded py-2">
            Outschool Rebus Puzzles: Play!
          </h1>
        </Col>
        <Col xs={0} md={2} />
      </Row>
      <Row className="py-2 d-flex justify-content-center">
        <Col xs={12} md={10}>
          <Jumbotron className="bg-mango rounded position-relative">
            <Row className="py-2 d-flex justify-content-center align-items-center"
                 style={{height: "300px"}}>
              <Col className="text-center mx-5">
                <PlayInit />
              </Col>
            </Row>
          </Jumbotron>
        </Col>
      </Row>
      <Row className="py-4 d-flex justify-content-start">
        <Col md={1} />
        <Col md={11}>
          <Link className="btn btn-blurple" to="/start">
            Back to Start Page
          </Link>
        </Col>
      </Row>
    </>
  );
}

interface IScore {
  score: number
}

function PlayInit(){
  const [rebusList,setRebusList] = useState<IRebus[]>([]);
  const [score,setScore] = useState<number | null>(null);
  const {get:scoreGet, put: scorePut, error: scoreError} = useFetch<IScore>("/api/score", {cachePolicy: CachePolicies.NO_CACHE});
  const {get:rebusGet, error: rebusError} = useFetch<IRebus[]>("/api/rebus");

  const addPoints = useCallback((points)=>{
    console.log(points)
    setScore(prev=> prev + points);
    scorePut({points}).then(resp=>console.log(resp.score));
  }, [scorePut, setScore]);

  useEffect(() => {
    rebusGet().then(it=>setRebusList(it));
    scoreGet().then(it=>setScore(it.score))
  }, [scoreGet, rebusGet, setRebusList, setScore]);

  const error = scoreError ?? rebusError;
  if (error) return <div>Error: {error.message ?? error}</div>;
  if (!rebusList.length || score === null) return <div>Loading...</div>;

  return <addScoreCtx.Provider value={addPoints}>
    <>
      <ScoreDisplay score={score}/>
      <GameWaiting rebusList={rebusList}/>
    </>
  </addScoreCtx.Provider>
}

function ScoreDisplay(props: {score: number}){
  return <div style={{position:'absolute', top: "10px", right: "20px", fontSize: "32px", fontWeight: 700}}>
    Score: {props.score}
  </div>
}

function GameWaiting(props: {rebusList: IRebus[]}){
  const [ready, setReady] = useState(false);

  if(!ready){
    return (
      <Button
        className="btn-blurple m-2"
        onClick={() => setReady(true)}
      >
        I'm Ready!
      </Button>
    )
  }

  return <PlayGame rebusList={props.rebusList} />
}

function PlayGame(props: {rebusList: IRebus[]}){
  const [reeb, setReeb] = useState(()=>sample(props.rebusList)!);
  const handleNext = useCallback(()=>{
    setReeb(prev=>{
      let next;
      do {
        next = sample(props.rebusList)!
      } while(next === prev);
      return next;
    })
  }, [setReeb, props.rebusList]);

  return <PlayRebus key={reeb.puzzle}
                    rebus={reeb}
                    onNext={handleNext} />
}

function PlayRebus(props: {rebus:IRebus, onNext:()=>void}){
  const [winPoints, setWinPoints] = useState(0);
  if(!winPoints){
    return <GameInProgress rebus={props.rebus} onSkip={props.onNext} onWin={setWinPoints}/>
  }
  return <GameWon rebus={props.rebus} points={winPoints} onNext={props.onNext} />
}

function GameInProgress(props: {rebus:IRebus, onSkip:()=>void, onWin:(points: number)=>void}){
  const [guess, setGuess] = useState("");
  const [timeLeft, { start }] = useCountDown(30e3, 1e3);
  React.useEffect(() => {
    start()
    // eslint-disable-next-line
  }, []);

  const {puzzle, solution, hint} = props.rebus;
  const points = timeToPoints(timeLeft);
  const backgroundColor = guess.length === 0 ? "#FFF" : "#FAA";

  return <>
    <div>
      <RebusPuzzle puzzle={puzzle} />
    </div>
    <div>
      <Input autoFocus className="pr-5" value={guess} onInput={handleInput} style={{backgroundColor}}/>
      <RebusProgress input={guess} solution={solution} />
    </div>
    <div className="pt-2" style={{textAlign: 'left'}} >
      <div style={{float:"right"}}>
        <Button
          className="btn-blurple"
          onClick={() => props.onSkip()}
        >
          Skip
        </Button>
      </div>

      Hint: {hint}, {solution.length} letters <br/>
      Guess correctly for {renderPoints(points)}
    </div>

  </>
  function handleInput(e: any){
    if(e.currentTarget.value.toLowerCase() === solution.toLowerCase()){
      props.onWin(points);
    }
    setGuess(e.currentTarget.value)
  }
}

function GameWon(props: {rebus: IRebus, points: number, onNext: ()=>void}){
  const COOLDOWN = 3e3;
  const [timeLeft, { start }] = useCountDown(COOLDOWN, 100);
  const addScore = useContext(addScoreCtx);
  React.useEffect(() => {
    start()
    addScore(props.points);
    const t = setTimeout(props.onNext, COOLDOWN);
    return ()=> clearTimeout(t);
    // eslint-disable-next-line
  }, []);

  const {puzzle, solution, hint} = props.rebus;
  const backgroundColor = "#AFA";

  return <>
    <div>
      <RebusPuzzle puzzle={puzzle} />
    </div>
    <div>
      <Input className="pr-5" disabled value={solution} style={{backgroundColor}}/>
      <RebusProgress input={solution} solution={solution} />
    </div>
    <div className="pt-2" style={{textAlign: 'left'}} >
      <div style={{float:"right"}}>
        Progressing in {(timeLeft/1e3).toFixed(1)}
      </div>

      Hint: {hint}, {solution.length} letters <br/>
      You scored {renderPoints(props.points)}
    </div>
  </>
}

function timeToPoints(ms:number){
  return Math.max(Math.floor(ms/1e3), 1);
}
function renderPoints(score: number){
  return score === 1 ? `1 point` : `${score} points`;
}
