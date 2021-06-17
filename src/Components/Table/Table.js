import { useEffect, useState } from "react";
import _ from "lodash";
import Fuse from "fuse.js";
import { titleCase } from "../../Utils/helper";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { default as MaterialTable } from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import AddCircleIcon from '@material-ui/icons/AddCircle';

const Table = ({
  title="",
  column=[],
  allData=[],
  searchKeys=["name"],
  onAdd,
  onView,
  onEdit,
  onDelete,
  whiteList,
  whiteListExec
}) => {
  const classes = useStyles();
  const [ data, setData ] = useState([]);
  const [ headCells, setHeadCells ] = useState([]);
  const [ limit, setLimit ] = useState(10);
  const [ page, setPage] = useState(1);
  const [ searchInput, setSearchInput ] = useState("");

  const fuseOptions = {
    keys: searchKeys,
    threshold: 0.3,
  }
  const fuse = new Fuse(allData, fuseOptions);

  useEffect(() => {
    formatHead();
    allData.length > 0 && setData(allData);
  }, [allData]);

  const formatHead = (which, order) => {
    setHeadCells(
      column.map((o, oi) => ({
        id: oi,
        key: o,
        label: titleCase(o),
        order: which === oi ? order : false
      }))
    );
  }

  const handleSort = (id, property) => {
    if(headCells[id].order === "asc") {
      formatHead(id, "desc");
      setData(_.orderBy(data, [property], ["desc"]));
    } else {
      formatHead(id, "asc");
      setData(_.orderBy(data, [property], ["asc"]));
    }
  };

  const handleLimit = (value) => {
    setLimit(value);
    setPage(1);
    formatHead();
  }

  const handlePage = (value) => {
    setPage(value);
  }

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    if(e.target.value.length > 0) {
      setData(_.chain(fuse.search(e.target.value).map(s => s.item)).value());
      setPage(1);
      formatHead();
    } else {
      setData(allData);
      setPage(1);
      formatHead();
    }
  };
  
  return(
    <>
      <Box className={classes.search}>
        <div className="flex-row">
          <Typography variant="h5" className={classes.title}>
            {title}
          </Typography>
          {onAdd && <AddCircleIcon onClick={onAdd} color="primary" className={classes.title} />}
        </div>
        <TextField
          variant="outlined"
          margin="normal"
          label="Search"
          name="search"
          id="search"
          value={searchInput}
          onChange={handleSearch}
          autoFocus={false}
          size="small"
        />
      </Box>
      <MaterialTable aria-labelledby="tableTitle" aria-label="enhanced table">
        <TableHead>
          <TableRow>
            <TableCell key={"cell-number-no"} align="left" sortDirection={false} className={classes.cursor}>No.</TableCell>
            {headCells && headCells.map(headCell => (
              <TableCell
                key={headCell.id}
                align="center"
                sortDirection={!headCell.order ? false : headCell.order}
                onClick={() => handleSort(headCell.id, headCell.key)}
                className={classes.cursor}
              >
                {headCell.label}
                {headCell.order === "desc" && <ArrowDownwardIcon className={classes.sort} />}
                {headCell.order === "asc" && <ArrowUpwardIcon className={classes.sort} />}
              </TableCell>
            ))}
            {(onEdit || onDelete) && <TableCell key={"cell-number"} align="center" sortDirection={false} className={classes.cursor}>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
        {data && _.chain(data).drop((page-1)*limit).take(limit).value().map((d,di) => {
            return (
              <TableRow key={`data-${di}`} onClick={(e) => { e.stopPropagation(); onView(d) }} className={classes.row}>
                <TableCell key="cell-number-data-0">{limit*(page-1)+(di+1)}</TableCell>
                {headCells.map((head, index) => {
                  if(whiteList && whiteList.includes(head.key)) return (
                    <TableCell key={`cell-number-data-${index+1}`} align="center">{whiteListExec[head.key](d[head.key])}</TableCell>
                  )
                  return (<TableCell key={`cell-number-data-${index+1}`} align="center">{d[head.key]}</TableCell>)
                })}
                {(onEdit || onDelete) && <TableCell key={`cell-number-act-${di}`} align="center">
                  <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    {onEdit && <Button onClick={(e) => { e.stopPropagation(); onEdit(d) }}>Edit</Button>}
                    {onDelete && <Button onClick={(e) => { e.stopPropagation(); onDelete(d) }}>Delete</Button>}
                  </ButtonGroup>
                </TableCell>}
              </TableRow>
            );
          })}
        </TableBody>
      </MaterialTable>
      <Box className={classes.pagination}>
        Per Page 
        <Select
          labelId="select-table-limit"
          id="select-table-limit"
          value={limit}
          onChange={(e) => handleLimit(e.target.value)}
          className={classes.selectLimit}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
        <span className={classes.pageOf}>
          {`No ${page} of ${Math.ceil(data.length/limit)}`}
        </span>
        <span className={classes.nextPrevButton}>
          <NavigateBeforeIcon 
            color={page - 1 === 0 ? "disabled" : "primary"} 
            fontSize="small"
            onClick={() => {if(page !== 1) {handlePage(page-1)} }}
          />
          <NavigateNextIcon 
            color={page === Math.ceil(data.length/limit) ? "disabled" : "primary"}
            fontSize="small"
            onClick={() => {if(page !== Math.ceil(data.length/limit)) {handlePage(page+1)} }}
          /> 
        </span>
      </Box>
    </>
  );

};

export default Table;

const useStyles = makeStyles((theme) => ({
  title: {
    alignSelf: "center",
    marginLeft: "10px"
  },
  sort: {
    fontSize: "12px",
    marginLeft: "2px"
  },
  pagination: {
    marginTop: theme.spacing(1),
    textAlign: "right",
  },
  selectLimit: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  pageOf: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
  nextPrevButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    verticalAlign: "bottom"
  },
  search: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cursor: {
    cursor: "pointer"
  },
  row: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "white"
    }
  }
}));
