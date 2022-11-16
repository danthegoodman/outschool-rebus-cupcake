import React, {useEffect, useMemo} from "react";
import {Table} from "reactstrap";
import {sortBy} from 'lodash';
import useFetch, {CachePolicies} from "use-http";

type TopScoresProps = {autoreload?: boolean};
type ScoreData = {
  scores: ScoreRecord[];
};
type ScoreRecord = {
  email: string;
  score: Number;
};

export function TopScores({autoreload}: TopScoresProps) {
  const {get, loading, data, error} = useFetch<ScoreData>(`/api/scoreboard`, {cachePolicy: CachePolicies.NO_CACHE}, []);
  useEffect(()=>{
    if(!autoreload) return;
    const t = setInterval(()=> get(), 10e3);
    return ()=> clearInterval(t);
  }, [autoreload])


  if (error) return <div>{error.message ?? error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="px-2 pt-2">
      <Table className="responsive-table">
        <thead>
        <tr>
          <th>{loading? "." : null}</th>
          <th className="archivo-black">User</th>
          <th className="archivo-black">Score</th>
        </tr>
        </thead>
        <Rows scores={data.scores}/>
      </Table>
    </div>
  );
}

type RowData = ScoreRecord & {place: number};

function Rows(props: {scores: ScoreRecord[]}){
  const rows = useMemo(()=>scoresToRowData(props.scores), [props.scores])
  return <tbody>{rows.map(renderRow)}</tbody>

  function renderRow({email, score, place}: RowData) {
    return (
      <tr key={email}>
        <td className="align-middle p-1">
          <div className="label">Place</div>
          <h4 className="archivo-paragraph">{place}.</h4>
        </td>
        <td className="align-middle">
          <div className="label">User</div>
          <h4 className="archivo-paragraph">{email}</h4>
        </td>
        <td className="align-middle px-2">
          <div className="label">Score</div>
          <h4 className="archivo-paragraph">{score}</h4>
        </td>
      </tr>
    );
  }
}

function scoresToRowData(scores: ScoreRecord[]): RowData[]{
  const result = sortBy(scores, [it=> -it.score, it=>it.email])
    .map((it, ndx)=>({...it, place: ndx+1}));
  for(let i = 1; i < result.length; i++){
    const curr = result[i];
    const prev = result[i-1];
    if(curr.score === prev.score){
      curr.place = prev.place;
    }
  }
  return result;
}
