import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, CircularProgress } from '@mui/material';
import { Close } from '@mui/icons-material';

export default function TopSection({
  heading,
  contextButtonText,
  contextButtonAction,
  contextButtonDisabled = false,
  contextButtonLoading = false,
}) {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: 'background.default',
        borderBottom: 1,
        borderColor: 'divider',
        boxShadow: 'none',
        zIndex: 10,
      }}
    >
      <Toolbar sx={{ display:'inline-flex', justifyContent: 'space-between' }}>
        {/* Left Link (Cancel) */}
        <IconButton
          onClick={() => navigate('/my-profile/setting')}
          sx={{ color: 'text.secondary', '&:hover': { textDecoration: 'underline' } }}
        >
          <Typography variant="body2">Back</Typography>
        </IconButton>
 
        {/* Center Heading */}
        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'text.primary',
            fontWeight: 600,
          }}
        >
          {heading}
        </Typography>

        {/* Right Button (Context) */}
        {contextButtonText && contextButtonAction && (
          <Button
            onClick={contextButtonAction}
            disabled={contextButtonDisabled}
            sx={{
              color: contextButtonLoading ? 'text.secondary' : 'primary.main',
              textTransform: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
            startIcon={contextButtonLoading && <CircularProgress size={16} sx={{ mr: 1 }} />}
          >
            {contextButtonLoading ? 'Processing...' : contextButtonText}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}