import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { School } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const Header = ({ onNewTask }) => (
  <AppBar 
    position="sticky" 
    sx={{ 
      bgcolor: 'background.paper',
      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      borderRadius: { xs: 0, md: '0 0 12px 12px' },
      borderBottom: '1px solid',
      borderColor: 'divider'
    }}
  >
    <Container maxWidth="xl">
      <Toolbar sx={{ 
        px: { xs: 0, sm: 2 },
        gap: 3,
        justifyContent: 'space-between'
      }}>
        {/* Left Section - Logo */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1.5,
          flexShrink: 0,
          textDecoration: 'none',
          '&:hover': { opacity: 0.8 }
        }} component={Link} to="/">
          <School sx={{ 
            fontSize: 32,
            color: 'primary.main'
          }} />
          <Typography variant="h6" sx={{
            fontWeight: 700,
            color: 'text.primary',
            letterSpacing: -0.5
          }}>
            Study Planner
          </Typography>
        </Box>

        {/* Center Section - Navigation */}
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' },
          gap: 1,
          flexGrow: 1,
          justifyContent: 'center',
          ml: 4
        }}>
          <Button
            component={Link}
            to="/dashboard"
            color="inherit"
            sx={{
              fontWeight: 500,
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
                backgroundColor: 'action.hover'
              }
            }}
          >
            Progresso
          </Button>
        </Box>

        {/* Right Section - Actions */}
        <Box sx={{ 
          display: 'flex', 
          gap: 1.5,
          alignItems: 'center',
          flexShrink: 0
        }}>
          <Button 
            variant="contained"
            onClick={onNewTask}
            sx={{
              fontWeight: 600,
              boxShadow: 'none',
              borderRadius: 2,
              px: 2.5,
              py: 1,
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transform: 'translateY(-1px)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            Nova Tarefa
          </Button>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);