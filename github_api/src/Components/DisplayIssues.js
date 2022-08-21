import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
    // ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
    width: '100%',
    lineHeight: '60px',
    border: '1px solid #e0e0e0',
  }));

function DisplayIssues(props) {
    const { loading, issues, form } = props;
    
    return (
        
            loading ? (
              <div>Loading...</div>
            ) : form && issues.length !== 0  ? (
                <></>
            ) : issues.length > 0 ? (
                <div>
                    <h1 style={{ paddingBottom: '2%'}}>All Issues</h1>
                    <Grid 
                        container 
                        alignItems="center" 
                        justifyContent="center"
                        columns={8}
                          >
                        <Box
                            sx={{
                                p: 2,
                                bgcolor: 'background.default',
                                display: 'grid',
                                // gridTemplateColumns: { md: '1fr 2fr' },
                                gap: 2,
                            }}
                        >
                            {issues.map((issue) => (
                                <Item key={issue.number}>
                                    <div>{`Issue #: ${issue.number}`}</div>
                                    <div>{`Title: ${issue.title}`}</div>
                                    <div>{`Body: ${issue.body}`}</div>
                                </Item>
                            ))}
                        </Box>
                    </Grid>
                </div>
            ) : (
              <h1>No Issues Found</h1>
            ) 
    )
}

export default DisplayIssues


