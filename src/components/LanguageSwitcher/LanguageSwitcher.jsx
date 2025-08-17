import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import {
  Language as LanguageIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({ variant = 'icon', size = 'medium' }) => {
  const { currentLanguage, languages, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = async (languageCode) => {
    await changeLanguage(languageCode);
    handleClose();
  };

  return (
    <>
      <Tooltip title={t('common.changeLanguage')}>
        <IconButton
          onClick={handleClick}
          size={size}
          sx={{
            color: 'inherit',
            borderRadius: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            maxWidth: 280,
          },
        }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageSelect(language.code)}
            selected={language.code === currentLanguage.code}
            sx={{
              py: 1.5,
              px: 2,
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              {language.code === currentLanguage.code ? (
                <CheckIcon color="primary" />
              ) : (
                <span style={{ fontSize: '1.2rem' }}>{language.flag}</span>
              )}
            </ListItemIcon>
            <ListItemText>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {language.nativeName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {language.name}
                </Typography>
              </Box>
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;