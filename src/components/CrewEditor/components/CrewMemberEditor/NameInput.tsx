import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { ICommonParamsState } from './types';

interface INameInputProps {
  commonParamsState: ICommonParamsState;
  setCommonParamsState: React.Dispatch<React.SetStateAction<ICommonParamsState>>;
}

export default function NameInput(props: INameInputProps) {
  const {
    commonParamsState,
    setCommonParamsState,
  } = props;

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((event) => {
    const { value } = event.target;

    setCommonParamsState((prevState: ICommonParamsState) => ({
      ...prevState,
      name: value,
    }));
  }, [setCommonParamsState]);

  return (
    <Grid item xs={12}>
      <TextField
        name="name"
        label="Name"
        fullWidth
        value={commonParamsState.name}
        onChange={handleNameChange}
      />
    </Grid>
  );
}