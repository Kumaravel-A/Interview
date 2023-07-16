import { useState } from 'react'
import { Button } from '@mui/material'
import Toolbar from '../../components/toolbar/Toolbar'
import './Audience.scss'
import AddSegment from './components/addSegment/AddSegment'

export default function Audience() {
  
  const [openAddDialog, setOpenAddDialog] = useState(false)
  
  return (
    <>
    <Toolbar name='View Audience' />
    <div style={{ padding: '20px' }}>
    <Button variant="contained" onClick={() => setOpenAddDialog(true)}> Click to Add Segment </Button>
    </div>
    {/* Dialog Section */}
    <AddSegment open={openAddDialog} close={(event) => setOpenAddDialog(event)} />
    </>
  )
}
