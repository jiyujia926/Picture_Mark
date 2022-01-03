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
const server = "http://122.51.228.166:8000";
// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function AnnotationList() {
  const [rows, setRows] = React.useState([]);
  const [username, setUsername] = React.useState(cookie.load("username"));
  const [loading, setloading] = React.useState(true);
  const [mid, setmid] = React.useState(window.location.href.split("/")[4]);

  React.useEffect(() => {
    missionannotation();
  }, []);
  async function missionannotation() {
    let data = {
      mid: mid,
    };
    let res = await axios.post(`${server}/missionannotation`, data);
    console.log(res.data);
    setRows(res.data);
    setloading(false);
  }
  const changestate1 = (e) => {
    change1(e.target.value);
  };
  const changestate2 = (e) => {
    change2(e.target.value);
  };
  async function change1(user) {
    let data = {
      mid: mid,
      username: user,
    };
    let res = await axios.post(`${server}/changestate1/`, data);
    alert(res.data);
    window.location.href = window.location.href;
  }
  async function change2(user) {
    let data = {
      mid: mid,
      username: user,
    };
    let res = await axios.post(`${server}/changestate2/`, data);
    alert(res.data);
    window.location.href = window.location.href;
  }
  const handleview = (e) => {
    window.location.href = '/check/'+mid+"/"+e.target.value
  }
  const exportjson = (e)=> {
    window.open("http://122.51.228.166:8000/export/"+mid+"/"+e.target.value);
  }

  return (
    <div className="homewrapper">
      <p>当前任务:{mid}</p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">用户</TableCell>
              <TableCell align="center">标注结果</TableCell>
              <TableCell align="center">审核状态</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>

          {loading ? (
            <h1>Loading</h1>
          ) : (
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.user}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.user}
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" value={row.user} onClick={handleview}>
                      查看
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    {row.state == 0 ? (
                      "未审核"
                    ) : (
                      <>{row.state == 1 ? "已通过" : "未通过"}</>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {row.state == 0 ? (
                      <>
                        <Button
                          variant="outlined"
                          value={row.user}
                          onClick={changestate1}
                        >
                          通过
                        </Button>
                        <Button
                          variant="outlined"
                          value={row.user}
                          onClick={changestate2}
                        >
                          不通过
                        </Button>
                      </>
                    ) : (
                      <>
                        {row.state == 1 ? (
                          <Button
                            variant="outlined"
                            value={row.user}
                            onClick={changestate2}
                          >
                            不通过
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            value={row.user}
                            onClick={changestate1}
                          >
                            通过
                          </Button>
                        )}
                      </>
                    )}
                    <Button variant="outlined" value={row.user} onClick={exportjson}>
                      导出
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}
