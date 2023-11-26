import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { ValueDisplayer } from '@components/common';
import { IPerson } from '@state/person';
import { floatFormatter, decimalFormatter } from '@helpers/formatters';

interface ICrewMemberStatsProps {
  person: IPerson;
}

const CrewMemberStats = observer((props: ICrewMemberStatsProps) => {
  const {
    person,
  } = props;
  const { t } = useTranslation();

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
        {t('general.level', { ns: 'common' })} <b><ValueDisplayer getValue={() => decimalFormatter.format(person.level)} /></b>
      </Typography>

      <Typography>
        {t('general.exp', { ns: 'common' })} <b><ValueDisplayer getValue={() => floatFormatter.format(person.exp)} /></b>
      </Typography>

      <Typography>
        {t('general.hp', { ns: 'common' })} <b><ValueDisplayer getValue={() => `${floatFormatter.format(person.hp)}/${floatFormatter.format(person.personStats.maxHp)}`} /></b>
      </Typography>

      <Typography>
        {t('stats.damage', { ns: 'common' })} <b><ValueDisplayer getValue={() => floatFormatter.format(person.personStats.damage)} /></b>
      </Typography>

      <Typography>
        {t('stats.defense', { ns: 'common' })} <b><ValueDisplayer getValue={() => floatFormatter.format(person.personStats.defense)} /></b>
      </Typography>

      <Typography>
        {t('general.attributePoints', { ns: 'common' })} <b><ValueDisplayer getValue={() => decimalFormatter.format(person.attributePoints)} /></b>
      </Typography>

      <Typography>
        {t('general.skillPoints', { ns: 'common' })} <b><ValueDisplayer getValue={() => decimalFormatter.format(person.skillPoints)} /></b>
      </Typography>

      <Typography>
        {t('general.loyalty', { ns: 'common' })} <b><ValueDisplayer getValue={() => floatFormatter.format(person.loyalty)} /></b>
      </Typography>
    </Stack>
  );
});

export default CrewMemberStats;
