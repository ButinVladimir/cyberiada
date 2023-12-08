import { useTranslation } from 'react-i18next';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface TopPanelProps {
  onOpenJobModal: () => void;
}

export default function TopPanel(props: TopPanelProps) {
  const { onOpenJobModal } = props;
  const { t } = useTranslation();

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h3" gutterBottom>
        {t(`pages.jobs`, { ns: 'ui'})}
      </Typography>

      <ButtonGroup>
        <Button
          type="button"
          variant="contained"
          onClick={onOpenJobModal}
        >
          {t('jobs.createNewJob', { ns: 'ui' })}
        </Button>
      </ButtonGroup>
    </Box>
  );
}
