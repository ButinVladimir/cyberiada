import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import Grid from '@mui/material/Grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Language } from '@/state/common';
import { IComponentWithGameStateManagerProps } from '@components/common';

type LanguageChangeEventHandler = (event: SelectChangeEvent<Language>) => void;

const LanguageSelector = observer((props: IComponentWithGameStateManagerProps) => {
  const { gameStateManager } = props;
  const { t } = useTranslation();

  const handleChangeLanguage = React.useCallback<LanguageChangeEventHandler>((event) => {
    void gameStateManager.settingsState.setLanguage(event.target.value as Language);
  }, [gameStateManager]);

  const { language }= gameStateManager.settingsState;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <FormControl fullWidth>
        <InputLabel id="settings-language-label">
          {t('settings.language', { ns: 'ui' })}
        </InputLabel>

        <Select
          labelId="settings-language-label"
          value={language}
          label={t('settings.language', { ns: 'ui' })}
          onChange={handleChangeLanguage}
        >
          <MenuItem value="en-US">English</MenuItem>
          <MenuItem value="ru-RU">Русский</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
});

export default LanguageSelector;
