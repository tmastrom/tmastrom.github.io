import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Column {
  id: 'name' | 'score';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  {
    id: 'score',
    label: 'Score',
    minWidth: 170,
    align: 'right',
  },
];

interface Data {
  rowId: number;
  name: string;
  score: number;
}

function createData(
  rowId: number,
  name: string,
  score: number,
): Data {
  return { rowId, name, score };
}

const parseSignedIntString = (intStr: string) => {
  let signedInt = 0;
  if(intStr[0] === '-'){
    signedInt = -Math.abs(parseInt(intStr));
  }
  else {
    signedInt = parseInt(intStr);
  }
  return signedInt;
}

const rows = [
  createData(0, 'Player1', 0),
];

export default function ScoreTalbe() {
  const [openScore, setOpenScore] = useState(false);
  const [openPlayerAdd, setOpenPlayerAdd] = useState(false);
  const [playerName, setPlayerName] = useState<string>('');
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [addScore, setAddScore] = useState<string>('');
  const [scoreObj, setScoreObj] = useState(rows); 

  const handleClickOpen = (rowId: number) => {
    setSelectedRow(rowId);
    setOpenScore(true);
  };

  const handleAddScore = () => {
    console.log('add score');
    // create copies of current state
    const row = Number(selectedRow);
    let updateScore = JSON.parse(JSON.stringify(scoreObj));
    
    // check if values are NaN
    const newAdd = parseSignedIntString(addScore);

    updateScore[row].score = updateScore[row].score + newAdd;
    setScoreObj(updateScore);
    handleCloseScore();
  }

  const handlePlayerName = (e: any) => {
    if(openPlayerAdd){
        setPlayerName(e.target.value);
    }
  }

  const handleTextFieldChange = (e: any) => {
    const regex = /^-?\d*\.?\d+$/;
    if(openScore){
      if(e.target.value.match(regex) || e.target.value[0] === '-'){
        setAddScore(e.target.value);
      }
      else {
        setAddScore('');
      }
    }
  }

  const handleAddPlayer = (e: any) => {
    console.log('add player');
    let updateScoreObj = scoreObj;
    const ind = scoreObj.length;
    updateScoreObj.push(createData(ind, playerName, 0));
    setScoreObj(updateScoreObj);
    handlClosePlayerAdd();  
  }

  const handleReset = () => {
    console.log('reset');
    setScoreObj(rows);
    setAddScore('');
    setSelectedRow(0);
  }

  const handleOpenAddPlayer = () => {
    console.log('open add player modal');
    // open modal to enter name 
    setOpenPlayerAdd(true);
  }

  const handlClosePlayerAdd = () => {
    console.log('handle close score');
    setPlayerName('');
    setOpenPlayerAdd(false);
  }

  // close modal and reset values
  const handleCloseScore = () => {
    console.log('handle close score');
    setOpenScore(false);
    setSelectedRow(0);
    setAddScore('');
  };

  const handleDeletePlayer = () => {
    console.log('handle delete player');
    const row = selectedRow;
    let update = [...scoreObj]; 
    // delete player from selected row 
    update.splice(row, 1)
    // reorder indexes of scoerobj
    for(let i = 0; i < update.length; i += 1){
      update[i].rowId = i;
    } 
    // set new scoreObj
    setScoreObj(update);
    // close modal
    handleCloseScore();
  }
  
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {scoreObj.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} onClick={() => handleClickOpen(row.rowId)} key={row.rowId}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer> 
      { openScore && 
        <Dialog open={openScore} onClose={handleCloseScore}>
          <DialogTitle> add score for: { scoreObj[selectedRow].name }</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add Score
            </DialogContentText>
            <TextField  value={addScore} onChange={(e) => handleTextFieldChange(e)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseScore}>Cancel</Button>
            <Button onClick={handleAddScore}>Add</Button>
            <Button onClick={handleDeletePlayer}>Delete</Button>
          </DialogActions>
        </Dialog>
      }
      <Button variant="contained" onClick={handleReset}>
        New Game
      </Button>
      <Button variant="contained" onClick={handleOpenAddPlayer}>
        Add Player
      </Button>
      { openPlayerAdd && 
        <Dialog open={openPlayerAdd} onClose={handlClosePlayerAdd}>
          <DialogTitle> Enter Player Name</DialogTitle>
          <DialogContent>
            <DialogContentText>
              
            </DialogContentText>
            <TextField value={playerName} onChange={(e) => handlePlayerName(e)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handlClosePlayerAdd}>Cancel</Button>
            <Button onClick={handleAddPlayer}>Add</Button>
          </DialogActions>
        </Dialog>
      }
    </Paper>
  );
}
