import i18n from 'i18next';
import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ISkills } from '@state/person';

interface ISkillInputsProps {
  skillsState: ISkills;
  setSkillsState: React.Dispatch<React.SetStateAction<ISkills>>;
}

const params: (keyof ISkills)[] = [
  'closeCombat',
  'rangedCombat',
  'stealth',
  'infoGathering',
  'persuasion',
  'hacking',
  'engineering',
  'chemistry',
];

export default function SkillInputs(props: ISkillInputsProps) {
  const {
    skillsState,
    setSkillsState,
  } = props;

  const handleSkillChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((event) => {
    const { name, value } = event.target;

    setSkillsState((prevState) => ({
      ...prevState,
      [name]: +value,
    }));
  }, [setSkillsState]);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h4">
          {i18n.t('sections.skills', { ns: 'common' })}
        </Typography>
      </Grid>

      {params.map((name) => (
        <Grid key={name} item xs={12} md={6} lg={4}>
          <TextField
            type="number"
            name={name}
            label={i18n.t(`skills.${name}`, { ns: 'common' })}
            fullWidth
            value={skillsState[name]}
            onChange={handleSkillChange}
          />
        </Grid>
      ))}
    </>
  );
}