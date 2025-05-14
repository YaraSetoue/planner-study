export const dashboardStyles = {
  progressBar: {
    light: {
      backgroundColor: '#f0f0f0',
      '& .MuiLinearProgress-bar': {
        backgroundColor: '#4CAF50'
      }
    },
    dark: {
      backgroundColor: '#2A2F38',
      '& .MuiLinearProgress-bar': {
        backgroundColor: '#00C851'
      }
    }
  },
  topicCard: {
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
    }
  },
  statCard: {
    borderLeft: '4px solid',
    borderRadius: '16px',
    transition: 'box-shadow 0.3s',
    '&:hover': {
      boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
    }
  }
};