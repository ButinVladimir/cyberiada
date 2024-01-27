import { useTranslation } from 'react-i18next';
import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { IAttributes, ATTRIBUTE_FIELDS } from '@state/common';

interface IAttributeInputsProps {
  attributesState: IAttributes;
  setAttributesState: React.Dispatch<React.SetStateAction<IAttributes>>;
}

export default function AttributeInputs(props: IAttributeInputsProps) {
  const {
    attributesState,
    setAttributesState,
  } = props;
  const { t } = useTranslation();

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
          {t('sections.attributes', { ns: 'common' })}
        </Typography>
      </Grid>

      {ATTRIBUTE_FIELDS.map((name) => (
        <Grid key={name} item xs={12} md={6} lg={4}>
          <TextField
            type="number"
            name={name}
            label={t(`attributes.${name}`, { ns: 'common' })}
            fullWidth
            value={attributesState[name]}
            onChange={handleAttributeChange}
          />
        </Grid>
      ))}
    </>
  );
}