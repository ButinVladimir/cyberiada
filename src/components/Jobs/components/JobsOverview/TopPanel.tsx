import i18n from 'i18next';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface TopPanelProps {
  onOpenJobModal: () => void;
}

export default function TopPanel(props: TopPanelProps) {
  const { onOpenJobModal } = props;
  
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h3" sx={{ marginBottom: 2 }}>
        {i18n.t(`pages.jobs`, { ns: 'ui'})}
      </Typography>

      <ButtonGroup>
        <Button
          type="button"
          variant="contained"
          onClick={onOpenJobModal}
        >
          {i18n.t('jobs.createNewJob', { ns: 'ui' })}
        </Button>
      </ButtonGroup>
    </Box>
  );
}
