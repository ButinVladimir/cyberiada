import { useTranslation } from 'react-i18next';
import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { IGeneralState } from './types';

interface INameInputProps {
  generalState: IGeneralState;
  setGeneralState: React.Dispatch<React.SetStateAction<IGeneralState>>;
}

export default function NameInput(props: INameInputProps) {
  const {
    generalState,
    setGeneralState,
  } = props;
  const { t } = useTranslation();

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((event) => {
    const { value } = event.target;

    setGeneralState((prevState: IGeneralState) => ({
      ...prevState,
      name: value,
    }));
  }, [setGeneralState]);

  return (
    <Grid item xs={12}>
      <TextField
        name="name"
        label={t('general.name', { ns: 'common' })}
        fullWidth
        value={generalState.name}
        onChange={handleNameChange}
      />
    </Grid>
  );
}