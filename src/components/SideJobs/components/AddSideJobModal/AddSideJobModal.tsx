import { useTranslation } from 'react-i18next';
import React from 'react';
import { observer } from 'mobx-react-lite';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { Quality } from '@state/common';
import { getGameStateManagerInstance } from '@state/gameStateManager';

interface IAddSideJobModalProps {
  opened: boolean;
  onCloseModal: () => void;
}

type SelectCallback = (event: SelectChangeEvent) => void;

const AddSideJobModal = observer((props: IAddSideJobModalProps) => {
  const {
    opened,
    onCloseModal,
  } = props;

  const gameStateManager = getGameStateManagerInstance();
  const { t } = useTranslation();

  const [templateName, setTemplateName] = React.useState<string>("");
  const [quality, setQuality] = React.useState<Quality>(Quality.Average);

  const templates = React.useMemo(() =>
    Array.from(
      gameStateManager.sideJobState.sideJobTemplates.keys()
    ),
    [gameStateManager],
  );

  const handleChangeTemplate = React.useCallback<SelectCallback>(
    (event) => {
      setTemplateName(event.target.value);
    },
    [],);

  const handleChangeQuality = React.useCallback<SelectCallback>(
    (event) => {
      setQuality(event.target.value as Quality);
    },
    [],
  );

  return (
    <Dialog
      maxWidth="xl"
      open={opened}
      onClose={onCloseModal}
    >
      <form id="generate-new-job-form">
        <DialogTitle>{t('jobs.newJob', { ns: 'ui' })}</DialogTitle>
        <DialogContent>
          <Stack
            spacing={2}
            sx={{
              marginTop: 1,
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="select-template-label">
                {t('general.template', { ns: 'common' })}
              </InputLabel>
              <Select
                labelId="select-template-label"
                id="select-template-input"
                value={templateName}
                onChange={handleChangeTemplate}
                label={t('general.template', { ns: 'common' })}
              >
                {templates.map((template) => (
                  <MenuItem key={template} value={template}>
                    {t(`${template}.title`, { ns: 'jobs' })}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="select-quality-label">
                {t('general.quality', { ns: 'common' })}
              </InputLabel>
              <Select
                labelId="select-quality-label"
                id="select-quality-input"
                value={quality}
                onChange={handleChangeQuality}
                label={t('general.quality', { ns: 'common' })}
              >
                {Object.values(Quality).map((quality) => (
                  <MenuItem key={quality} value={quality}>
                    {t(`quality.${quality}`, { ns: 'common' })}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onCloseModal}>
            {t('common.cancel', { ns: 'ui' })}
          </Button>
          <Button type="submit">
            {t('common.create', { ns: 'ui' })}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});

export default AddSideJobModal;
