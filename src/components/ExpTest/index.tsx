import React from 'react';
import { calculateExpFromLevel, IPerson } from '@state/person';

export function ExpTest() {
  const [player, setPlayer] = React.useState<IPerson>({
    exp: 0,
    id: '',
    name: 'player',
    level: 0,
  });
  const [exp, setExp] = React.useState<string>('');
  const nextNeededExp = React.useMemo<number>(() => calculateExpFromLevel(player.level), [player.level]);

  const handleChangeExp: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target; 
    setExp(value);

    let parsedValue = parseInt(value);
    if (isNaN(parsedValue)) {
      parsedValue = 0;
    }

    setPlayer(prevValue => ({
      ...prevValue,
      exp: parsedValue,
    }));
  };

  const handleIncreaseLevelClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setPlayer(prevValue => ({
      ...prevValue,
      level: prevValue.level + 1,
    }));
  };

  const handleLevelUpClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setPlayer(prevValue => {
      const nextLevelExpReq = calculateExpFromLevel(prevValue.level);
      let { exp, level }  = prevValue;
      if (exp >= nextLevelExpReq) {
        exp -= nextLevelExpReq;
        level++;
      }

      return {
        ...prevValue,
        exp,
        level,
      };
    });
  };

  return (
    <>
      <div>Current level: {player.level}</div>
      <div>Current exp: {player.exp}</div>
      <div>Next needed exp: {nextNeededExp}</div>
      <div>
        <input value={exp} onChange={handleChangeExp} />
      </div>
      <div>
        <button onClick={handleIncreaseLevelClick}>Increase level</button>
        <button onClick={handleLevelUpClick}>Level up</button>
      </div>
    </>
  );
}