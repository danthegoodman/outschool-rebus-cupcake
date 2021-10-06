const {useState, useEffect} = React;

export function AppRoot(){
  return <div>
    <h1>Outschool Rebus Puzzles</h1>
    <RebusList />
  </div>
}

type RebusDatum =
 | {text: string}
 | {image: string, shortName: string};

type IRebus = {
  puzzle: RebusDatum[];
  solution: string;
}

function RebusList(){
  const {data, error} = useFetch<IRebus[]>("/api/rebus-list");

  if(error) return <div>Error: {error.message ?? error}</div>;
  if(!data) return <div>Loading...</div>;

  return data.map(it=><Rebus key={it.solution} rebus={it} />)
}

function Rebus({rebus}: {rebus: IRebus}){
  const puzzle = rebus.puzzle.map((it,ndx)=>
    'text' in it
      ? <span key={ndx}>{it.text}</span>
      : <img key={ndx} src={it.image} alt={it.shortName}/>
  )

  return (
    <p className="rebus" title={rebus.puzzle}>
      {puzzle} = {rebus.solution}
    </p>
  );
}

function useFetch<TData>(path: string) {
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TData | undefined>(undefined);

  useEffect(() => {
    fetch(path)
      .then(res => res.json())
      .then(setData, setError)
  }, [path])

  return {data, error} as const;
}
