import i18n from 'i18next';
import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { IGeneralState } from './types';

interface IGeneralInputsProps {
  generalState: IGeneralState;
  setGeneralState: React.Dispatch<React.SetStateAction<IGeneralState>>;
}

const params: Exclude<keyof IGeneralState, 'name'>[] = [
  'level',
  'exp',
  'hpRatio',
  'loyalty',
  'attributePoints',
  'skillPoints',
];

export default function GeneralInputs(props: IGeneralInputsProps) {
  const {
    generalState,
    setGeneralState,
  } = props;

  const handleGeneralChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((event) => {
    const { name, value } = event.target;

    setGeneralState((prevState) => ({
      ...prevState,
      [name]: +value,
    }));
  }, [setGeneralState]);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h4">
          {i18n.t('sections.general', { ns: 'common' })}
        </Typography>
      </Grid>

      {params.map((name) => (
        <Grid key={name} item xs={12} md={6} lg={4}>
          <TextField
            type="number"
            name={name}
            label={i18n.t(`general.${name}`, { ns: 'common' })}
            fullWidth
            value={generalState[name]}
            onChange={handleGeneralChange}
          />
        </Grid>
      ))}
    </>
  );
}