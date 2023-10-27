import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { IAttributes } from '@state/person';

interface IAttributeInputsProps {
  attributesState: IAttributes;
  setAttributesState: React.Dispatch<React.SetStateAction<IAttributes>>;
}

const attributesLabelMap: Record<keyof IAttributes, string> = {
  strength: 'Strength',
  endurance: 'Endurance',
  agility: 'Agility',
  perception: 'Perception',
  intellect: 'Intellect',
  charisma: 'Charisma',
};

export default function AttributeInputs(props: IAttributeInputsProps) {
  const {
    attributesState,
    setAttributesState,
  } = props;

  const handleAttributeChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((event) => {
    const { name, value } = event.target;

    setAttributesState((prevState) => ({
      ...prevState,
      [name]: +value,
    }));
  }, [setAttributesState]);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h4">
          Attributes
        </Typography>
      </Grid>

      {Object.entries(attributesLabelMap).map(([name, label]) => (
        <Grid key={name} item xs={12} md={6} lg={4}>
          <TextField
            type="number"
            name={name}
            label={label}
            fullWidth
            value={attributesState[name as keyof IAttributes]}
            onChange={handleAttributeChange}
          />
        </Grid>
      ))}
    </>
  );
}