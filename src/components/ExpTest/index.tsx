import React from 'react';
import { calculateExpToLevelUp, calculateLevelUpsFromExp } from '@state/person';

export function ExpTest() {
  const [player, setPlayer] = React.useState({
    exp: 0,
    level: 0,
  });
  const [exp, setExp] = React.useState<string>('');
  const nextNeededExp = React.useMemo<number>(() => calculateExpToLevelUp(player.level, 1), [player.level]);
  const levelUpsAvailable = React.useMemo<number>(() => calculateLevelUpsFromExp(player.level, player.exp), [player.level, player.exp]);

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
      const nextLevelExpReq = calculateExpToLevelUp(prevValue.level, 1);
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

  const handleMaxLevelUpClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setPlayer(prevValue => {
      const exp = calculateExpToLevelUp(prevValue.level, levelUpsAvailable);

      return {
        ...prevValue,
        exp: prevValue.exp - exp,
        level: prevValue.level + levelUpsAvailable,
      };
    });
  };

  return (
    <>
      <div>Current level: {player.level} ({levelUpsAvailable} levelups available)</div>
      <div>Current exp: {player.exp}</div>
      <div>Next needed exp: {nextNeededExp}</div>
      <div>
        <input value={exp} onChange={handleChangeExp} />
      </div>
      <div>
        <button onClick={handleIncreaseLevelClick}>Increase level</button>
        <button onClick={handleLevelUpClick}>Level up</button>
        <button onClick={handleMaxLevelUpClick}>Max level up</button>
      </div>
    </>
  );
}