import { useState, useEffect } from 'react'
import { Dialog, Stack, Typography, TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import "./AddSegment.scss";
import Toolbar from "../../../../components/toolbar/Toolbar";
import DialogActionsContainer from "../dialogActions/DialogActions";
import AddIcon from '@mui/icons-material/Add';
import { showmessage } from '../../../../utils/toastr';

export default function AddSegment({ open, close }) {

  const [schema, setSchema] = useState({
    segmentName: "",
    schema: [
      'First Name',
      'Last Name'
    ],
  });
  const [newSchema, setNewSchema] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);

  const dropDownData = [
    {
      value: 'first_name',
      label: 'First Name'
    },
    {
      value: 'last_name',
      label: 'Last Name'
    },
    {
      value: 'gender',
      label: 'Gender'
    },
    {
      value: 'age',
      label: 'Age'
    },
    {
      value: 'account_name',
      label: 'Account Name'
    },
    {
      value: 'city',
      label: 'City'
    },
    {
      value: 'state',
      label: 'State'
    },
  ]

  /**
   * @function CloseDialog
   * @description emit the value from child to parent and close the dialog
   */
  const CloseDialog = () => {
    setNewSchema('')
      setSchema({
        segmentName: "",
        schema: [],
      })
    close(false);
  };

  //Styling dialog
  const sx = {
    "& .MuiDialog-container": {
      alignItems: "center",
      justifyContent: "flex-end",
    },
    "& .MuiPaper-root": {
      width: "500px",
      minHeight: "100vh",
      borderRadius: "4px",
      margin: "0",
    },
  };

  const onClickAddSchema = () => {
    if(!newSchema) {
      showmessage('Select Schema', 'error')
    } else {
      let arr = schema.schema;
      let find = arr.find((item) => item == newSchema);
      if(!find) {
        arr.push(newSchema);
        setSchema(prev => ({schema: arr,...prev}))
        setNewSchema('');
      } else {
        showmessage('Already Added', 'error')
      }
    }
  }
  
  //save the segment submit trigger
  const onSubmit = () => {
    let arr = [];
    let map = new Map();
    let length = dropDownData.length;
    for(let i=0;i<length;i++) {
      map.set(dropDownData[i].label, dropDownData[i].value)
    }
    schema.schema.forEach((label) => {
      if(map.has(label)) {
        let value = map.get(label);
        let obj = {}
        obj[value] = label
        arr.push(obj)
      }
    })
    let payload = {
      segment_name: schema.segmentName,
      schema: arr,
    };
    // sent this payload to the backend
    console.log({payload})
  };

  // Validation of the button
  useEffect(() => {
    if(schema.segmentName && schema.schema.length > 0) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true)
    }
  }, [schema])
  

  //traits container
  const traitsSection = (traits, className) => {
    return (
      <Stack direction={"row"} alignItems={"center"} columnGap={"5px"}>
        <span className={"typeStyle " + className}></span>
        <Typography className="fs-12">
          - {traits} Traits
        </Typography>
      </Stack>
    );
  };

  //removeSchema
  const onRemoveSchema = (row) => {
    let arr = schema.schema;
    arr = arr.filter((item) => item != row);
    let obj = {
      schema: arr,
      segmentName: schema.segmentName
    }
    setSchema(obj)
  }

  //body top section
  const nameSection = () => {
    return (
      <>
      <Stack className='topContainer' rowGap={'20px'}>
      <Typography> Enter the Name of the Segment </Typography>
          <TextField
          placeholder='Name of the segment'
          value={schema.segmentName}
          onChange={(event) => {
            setSchema(prev => ({...prev, segmentName:event.target.value}))
          }}
           />
          <Typography>To save your segment, you need to add the schemas to build the query</Typography>
          <Stack direction={'row'} justifyContent={'flex-end'} columnGap={'10px'}>
            { traitsSection('User', 'userColor') }
            { traitsSection('Group', 'groupColor') }
          </Stack>
      </Stack>
      
      </>
    )
  }

  //body middle section
  const schemaSection = () => {
    return (
      <>
        <Stack rowGap={"20px"} className={schema.schema.length > 0 && "schemaArrContainer"}>
          {schema.schema &&
            schema.schema.length > 0 &&
            schema.schema.map((item, index) => (
              <Stack direction={"row"} alignItems={"center"} columnGap={"5px"}>
                <TextField fullWidth select value={item} key={index}>
                  {dropDownData.map((data, i) => (
                    <MenuItem key={i} value={data.label}>
                      {data.label}
                    </MenuItem>
                  ))}
                </TextField>
                  <div
                    onClick={() => onRemoveSchema(item)}
                    className="removeContainer"
                  >
                    <div className="minus"></div>
                  </div>
              </Stack>
            ))}
        </Stack>
        <div className="addSchema">
          <FormControl fullWidth>
            <InputLabel id="schema-select-label">
              Add schema to segment
            </InputLabel>
            <Select
              labelId="schema-select-label"
              id="demo-simple-select"
              label="Add schema to segment"
              onChange={(event) => {
                setNewSchema(event.target.value);
              }}
              value={newSchema}
            >
              {dropDownData.map((data, i) => (
                <MenuItem key={i} value={data.label}>
                  {data.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <Stack
          onClick={onClickAddSchema}
          direction={"row"}
          alignItems={"center"}
          style={{ cursor: "pointer" }}
          className="addSchema"
        >
          <AddIcon style={{ color: "#44B697", fontSize: "13px" }} />
          <Typography color={"#44B697"} style={{ fontSize: "13px" }}>
            Add new schema
          </Typography>
        </Stack>
      </>
    );
  };

  return (
    <>
      <Dialog
        sx={sx}
        open={open}
        onClose={(event, reason) => {
          if (reason && reason === "backdropClick") return;
          CloseDialog();
        }}
      >
        {/* Header */}
        <Toolbar
          name={"Saving Segment"}
          dialog={true}
          CloseDialog={CloseDialog}
        />

        {/* Body */}
        <Stack className='bodyContainer' rowGap={'20px'}>
          {nameSection()}
          {schemaSection()}
        </Stack>

        {/* Footer Actions */}
        <DialogActionsContainer disableSubmit={disableSubmit} onSubmit={onSubmit} CloseDialog={CloseDialog} />
      </Dialog>
    </>
  );
}
