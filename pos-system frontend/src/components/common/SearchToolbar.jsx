import { Box, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function SearchToolbar({
    value,
    onChange,
    onRefresh,
    placeholder = 'Search...',
}) {
    return (
        <Box className="d-flex flex-column flex-md-row gap-2 mb-3">
            <TextField
                fullWidth
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />

            {onRefresh ? (
                <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={onRefresh}
                >
                    Refresh
                </Button>
            ) : null}
        </Box>
    );
}