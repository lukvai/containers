import {Box, CircularProgress} from "@mui/material";

const Loading = (): JSX.Element => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    )
}

export default Loading