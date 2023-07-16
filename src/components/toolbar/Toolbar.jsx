import { Typography, Stack } from '@mui/material';
import './Toolbar.scss'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function Toolbar({name, dialog = false, CloseDialog}) {
  return (
    <>
    <Stack direction={'row'} alignItems={'center'} sx={{
        background: '#39AEBC',
        height: '64px'
    }}>
        <ArrowBackIosNewIcon style={{ scale: '0.8', cursor: 'pointer', color: 'white' }} onClick={() => dialog && CloseDialog(true)} />
        <Typography className='fs-18 text-White'>{ name }</Typography>
    </Stack>
    </>
  )
}
