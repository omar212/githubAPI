import React from 'react'
// import { Button, ButtonSet } from '@carbon/react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


export default function ActionButtons(props)  {

    const {fetchIssues, createIssue, showCustomImageForm, showCustomForm, showCustomCommentForm } = props;

    return (
        <Stack spacing={2} direction="column">
            <Button onClick={fetchIssues} variant="outlined">Fetch Issues</Button>
            <Button onClick={createIssue} variant="contained">Create Default Issue</Button>
            <Button onClick={showCustomForm} variant="contained">Create Custom Issue</Button>
            <Button onClick={showCustomCommentForm} variant="contained">Create Comment On Issue</Button>
            <Button onClick={showCustomImageForm} variant="outlined">Check for Image</Button>
        </Stack>
    )
}
