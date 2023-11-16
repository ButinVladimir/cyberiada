import i18n from 'i18next';
import { observer } from 'mobx-react-lite';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { ValueDisplayer } from '@components/common';
import { IPerson } from '@state/person';

interface ICrewMemberStatsProps {
  person: IPerson;
}

const CrewMemberStats = observer((props: ICrewMemberStatsProps) => {
  const {
    person,
  } = props;

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={1}
      useFlexGap
      flexWrap="wrap"
      sx={{ marginBottom: 1 }}
    >
      <Typography>
        {i18n.t('general.level', { ns: 'common' })} <b><ValueDisplayer getValue={() => person.level} /></b>
      </Typography>

      <Typography>
        {i18n.t('general.exp', { ns: 'common' })} <b><ValueDisplayer getValue={() => person.exp} /></b>
      </Typography>

      <Typography>
        {i18n.t('general.hp', { ns: 'common' })} <b><ValueDisplayer getValue={() => `${person.hp}/${person.personStats.maxHp}`} /></b>
      </Typography>

      <Typography>
        {i18n.t('stats.damage', { ns: 'common' })} <b><ValueDisplayer getValue={() => person.personStats.damage} /></b>
      </Typography>

      <Typography>
        {i18n.t('stats.defense', { ns: 'common' })} <b><ValueDisplayer getValue={() => person.personStats.defense} /></b>
      </Typography>

      <Typography>
        {i18n.t('general.attributePoints', { ns: 'common' })} <b><ValueDisplayer getValue={() => person.attributePoints} /></b>
      </Typography>

      <Typography>
        {i18n.t('general.skillPoints', { ns: 'common' })} <b><ValueDisplayer getValue={() => person.skillPoints} /></b>
      </Typography>

      <Typography>
        {i18n.t('general.loyalty', { ns: 'common' })} <b><ValueDisplayer getValue={() => person.loyalty} /></b>
      </Typography>
    </Stack>
  );
});

export default CrewMemberStats;
