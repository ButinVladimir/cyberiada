import i18n from 'i18next';
import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { IAttributes } from '@state/common';

interface IAttributeInputsProps {
  attributesState: IAttributes;
  setAttributesState: React.Dispatch<React.SetStateAction<IAttributes>>;
}

const params: (keyof IAttributes)[] = [
  'strength',
  'endurance',
  'agility',
  'perception',
  'intellect',
  'charisma',
];

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
          {i18n.t('sections.attributes', { ns: 'common' })}
        </Typography>
      </Grid>

      {params.map((name) => (
        <Grid key={name} item xs={12} md={6} lg={4}>
          <TextField
            type="number"
            name={name}
            label={i18n.t(`attributes.${name}`, { ns: 'common' })}
            fullWidth
            value={attributesState[name]}
            onChange={handleAttributeChange}
          />
        </Grid>
      ))}
    </>
  );
}