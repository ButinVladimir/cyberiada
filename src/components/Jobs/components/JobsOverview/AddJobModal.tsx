import i18n from 'i18next';
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
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Quality } from '@state/common';
import { stateContext } from '@/contexts';

interface IAddJobModalProps {
  opened: boolean;
  onCloseModal: () => void;
}

type SelectCallback = (event: SelectChangeEvent) => void;

const AddJobModal = observer((props: IAddJobModalProps) => {
  const {
    opened,
    onCloseModal,
  } = props;

  const gameStateManager = React.useContext(stateContext);

  const [templateName, setTemplateName] = React.useState<string>("");
  const [level, setLevel] = React.useState<number>(0);
  const [quality, setQuality] = React.useState<Quality>(Quality.Average);

  const templates = React.useMemo(() =>
    gameStateManager
      ? Array.from(gameStateManager.jobState.jobTemplates.keys())
      : [],
    [gameStateManager],
  );

  const handleChangeTemplate = React.useCallback<SelectCallback>(
    (event) => {
      setTemplateName(event.target.value);
    },
    [],);

  const handleChangeLevel = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setLevel(+event.target.value);
    },
    [],
  );

  const handleChangeQuality = React.useCallback<SelectCallback>(
    (event) => {
      setQuality(event.target.value as Quality);
    },
    [],
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    gameStateManager?.jobState.generateJob({
      level,
      quality,
      templateName,
    });

    onCloseModal();
  };

  return (
    <Dialog
      maxWidth="xl"
      open={opened}
      onClose={onCloseModal}
    >
      <form id="generate-new-job-form" onSubmit={handleSubmit}>
        <DialogTitle>{i18n.t('jobs.newJob', { ns: 'ui' })}</DialogTitle>
        <DialogContent>
          <Stack
            spacing={2}
            sx={{
              marginTop: 1,
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="select-template-label">
                {i18n.t('general.template', { ns: 'common' })}
              </InputLabel>
              <Select
                labelId="select-template-label"
                id="select-template-input"
                value={templateName}
                onChange={handleChangeTemplate}
                label={i18n.t('general.template', { ns: 'common' })}
              >
                {templates.map((template) => (
                  <MenuItem key={template} value={template}>
                    {i18n.t(`${template}.title`, { ns: 'jobs' })}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              type="number"
              name="level"
              label={i18n.t('general.level', { ns: 'common' })}
              fullWidth
              value={level}
              onChange={handleChangeLevel}
            />

            <FormControl fullWidth>
              <InputLabel id="select-quality-label">
                {i18n.t('general.quality', { ns: 'common' })}
              </InputLabel>
              <Select
                labelId="select-quality-label"
                id="select-quality-input"
                value={quality}
                onChange={handleChangeQuality}
                label={i18n.t('general.quality', { ns: 'common' })}
              >
                {Object.values(Quality).map((quality) => (
                  <MenuItem key={quality} value={quality}>
                    {i18n.t(`quality.${quality}`, { ns: 'common' })}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onCloseModal}>
            {i18n.t('common.cancel', { ns: 'ui' })}
          </Button>
          <Button type="submit">
            {i18n.t('common.create', { ns: 'ui' })}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});

export default AddJobModal;