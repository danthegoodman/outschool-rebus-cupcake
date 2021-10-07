import React, { useMemo } from "react";
import { Progress } from "reactstrap";

function phraseToCountObject(phrase: string) {
  return phrase
    .split(" ")
    .join("")
    .split("")
    .reduce<{ [key: string]: number }>((t, c) => {
      if (t[c]) {
        t[c] += 1;
      } else {
        t[c] = 1;
      }
      return t;
    }, {});
}

export function RebusProgress({
  input,
  solution,
}: {
  input: string;
  solution: string;
}) {
  const justSolutionLetterCount = solution.split(" ").join("").length;
  const inputLetterCount = phraseToCountObject(input.toLowerCase());
  const solutionLetterCount = phraseToCountObject(solution.toLowerCase());

  const totalScore = useMemo(() => {
    let numberCorrect = 0;
    let numberIncorrect = 0;

    for (const key in inputLetterCount) {
      const isApartOfSolution = Boolean(solutionLetterCount[key]);
      if (isApartOfSolution) {
        const difference = solutionLetterCount[key] - inputLetterCount[key];
        if (difference === 0) {
          numberCorrect += solutionLetterCount[key];
        } else {
          numberIncorrect += Math.abs(difference);
        }
      } else {
        numberIncorrect += inputLetterCount[key];
      }
    }
    return Math.floor(
      ((numberCorrect - numberIncorrect) / justSolutionLetterCount) * 100
    );
  }, [inputLetterCount, solutionLetterCount, justSolutionLetterCount]);

  return <Progress value={totalScore} />;
}
