import i18n from 'i18next';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

interface TopPanelProps {
  onOpenJobModal: () => void;
}

export default function TopPanel(props: TopPanelProps) {
  const { onOpenJobModal } = props;
  
  return (
    <ButtonGroup sx={{ marginBottom: 2 }}>
      <Button
        type="button"
        variant="contained"
        onClick={onOpenJobModal}
      >
        {i18n.t('jobs.createNewJob', { ns: 'ui' })}
      </Button>
    </ButtonGroup>
  );
}
