import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ICommonParamsState } from './types';

interface ICommonParamInputsProps {
  commonParamsState: ICommonParamsState;
  setCommonParamsState: React.Dispatch<React.SetStateAction<ICommonParamsState>>;
}

const commonParamsLabelMap: Record<Exclude<keyof ICommonParamsState, 'name'>, string> = {
  level: 'Level',
  exp: 'Experience',
  hp: 'HP',
  loyalty: 'Loyalty',
  attributePoints: 'Attribute points',
  skillPoints: 'Skill points',
};

export default function CommonParamInputs(props: ICommonParamInputsProps) {
  const {
    commonParamsState,
    setCommonParamsState,
  } = props;

  const handleCommonParamChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((event) => {
    const { name, value } = event.target;

    setCommonParamsState((prevState) => ({
      ...prevState,
      [name]: +value,
    }));
  }, [setCommonParamsState]);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h4">
          Basic parameters
        </Typography>
      </Grid>

      {Object.entries(commonParamsLabelMap).map(([name, label]) => (
        <Grid key={name} item xs={12} md={6} lg={4}>
          <TextField
            type="number"
            name={name}
            label={label}
            fullWidth
            value={commonParamsState[name as keyof ICommonParamsState]}
            onChange={handleCommonParamChange}
          />
        </Grid>
      ))}
    </>
  );
}