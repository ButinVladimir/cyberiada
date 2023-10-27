import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ISkills } from '@state/person';

interface ISkillInputsProps {
  skillsState: ISkills;
  setSkillsState: React.Dispatch<React.SetStateAction<ISkills>>;
}

const skillsLabelMap: Record<keyof ISkills, string> = {
  closeCombat: 'Close combat',
  rangedCombat: 'Ranged combat',
  stealth: 'Stealth',
  infoGathering: 'Info gathering',
  persuasion: 'Persuasion',
  hacking: 'Hacking',
  engineering: 'Engineering',
  chemistry: 'Chemistry',
};

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
          Skills
        </Typography>
      </Grid>

      {Object.entries(skillsLabelMap).map(([name, label]) => (
        <Grid key={name} item xs={12} md={6} lg={4}>
          <TextField
            type="number"
            name={name}
            label={label}
            fullWidth
            value={skillsState[name as keyof ISkills]}
            onChange={handleSkillChange}
          />
        </Grid>
      ))}
    </>
  );
}