import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Chip, Switch, FormControlLabel, Tooltip } from '@mui/material';
import { testConnection } from '../services/api';
import { painterStore } from '../storages/PainterStore';

const BackendStatus = observer(() => {
    const [backendOnline, setBackendOnline] = useState(null);
    const [checking, setChecking] = useState(false);

    const checkBackend = async () => {
        setChecking(true);
        const isOnline = await testConnection();
        setBackendOnline(isOnline);
        setChecking(false);
    };

    useEffect(() => {
        checkBackend();
        // Check every 30 seconds
        const interval = setInterval(checkBackend, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleToggle = () => {
        painterStore.toggleBackendMode();
        if (!painterStore.useBackend) {
            // If switching to static mode, don't need to check backend
            return;
        }
        // If switching to backend mode, check connection
        checkBackend();
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tooltip title={checking ? 'Checking...' : backendOnline ? 'Backend is reachable' : 'Backend is offline'}>
                <Chip
                    label={checking ? 'Checking...' : backendOnline ? 'Backend Online' : 'Backend Offline'}
                    color={checking ? 'default' : backendOnline ? 'success' : 'error'}
                    size="small"
                    variant="outlined"
                />
            </Tooltip>
            
            <Tooltip title={painterStore.useBackend ? 'Using live backend data' : 'Using static demo data'}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={painterStore.useBackend}
                            onChange={handleToggle}
                            size="small"
                            disabled={!backendOnline && !painterStore.useBackend}
                        />
                    }
                    label="Use Backend"
                />
            </Tooltip>
        </Box>
    );
});

export default BackendStatus;
