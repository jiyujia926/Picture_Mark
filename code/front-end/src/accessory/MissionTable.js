import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import cookie from "react-cookies";
import axios from "axios";
import { Button } from "@mui/material";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = "http://127.0.0.1:8000";
// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function MissionTable() {
  const [rows, setRows] = React.useState([]);
  const [username, setUsername] = React.useState(cookie.load("username"));
  const [loading, setloading] = React.useState(true);
  React.useEffect(() => {
    getmission();
  }, []);
  async function getmission() {
    let data = {
      User: username,
    };
    let res = await axios.post(`${server}/getmission/`, data);
    console.log(res.data);
    setRows(res.data);
    setloading(false);
  }
  const handlein = (e) => {
    window.location.href = "/annotate/" + e.target.value;
  };
  const handlesetting = (e) => {
    window.location.href = "/mission/" + e.target.value;
  };
  const handledelete = (e) => {
    // console.log(e.target.value)
    deletemission(e.target.value);
  };
  async function deletemission(mid) {
    let data = {
      mid: mid,
    };
    let res = await axios.post(`${server}/deletemission/`, data);
    if (res.data === "删除成功") {
      window.location.href = window.location.href;
    }
  }
  const handledetail = (e) => {};

    const handledeletee = (e) => {
      deletemission2(e.target.value);
    };
    async function deletemission2(mid) {
      let data = {
        mid: mid,
        username: username,
      };
      let res = await axios.post(`${server}/quitmission/`, data);
      if (res.data === "删除成功") {
        window.location.href = window.location.href;
      }
    }
  const handleannotation = (e) => {
    window.location.href = "/annotationlist/" + e.target.value;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>任务编码</TableCell>
            <TableCell align="center">任务名</TableCell>
            <TableCell align="center">任务描述</TableCell>
            <TableCell align="center">发起人</TableCell>
            <TableCell align="center">状态</TableCell>
            <TableCell aligh="center">审核状态</TableCell>
            <TableCell align="center">操作</TableCell>
          </TableRow>
        </TableHead>

        {loading ? (
          <h1>Loading</h1>
        ) : (
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.mid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.mid}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.creator}</TableCell>
                <TableCell align="center">
                  {row.state ? "已发布" : "未发布"}
                </TableCell>
                <TableCell align="center">
                  {row.checkstate ==0 ? "未审核" : <>{row.checkstate ==1 ?"已通过":"未通过"}</>}
                </TableCell>
                <TableCell align="center">
                  {username == row.creator ? (
                    <>
                      <Button
                        variant="outlined"
                        value={row.mid}
                        onClick={handledelete}
                      >
                        删除
                      </Button>
                      <Button
                        variant="outlined"
                        value={row.mid}
                        onClick={handlesetting}
                      >
                        设置
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                  {row.state ? (
                    <>
                      {username == row.creator ? (
                        <>
                          <Button
                            variant="outlined"
                            value={row.mid}
                            onClick={handleannotation}
                          >
                            查看
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outlined"
                            value={row.mid}
                            onClick={handledeletee}
                          >
                            删除
                          </Button>
                        </>
                      )}
                      <Button
                        variant="outlined"
                        value={row.mid}
                        onClick={handlein}
                      >
                        进入
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
