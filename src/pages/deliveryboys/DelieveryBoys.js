import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  ButtonDropdown,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Label,
  Badge,
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import TaskContainer from "./components/TaskContainer/TaskContainer.js";

// import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import MUIDataTable from "mui-datatables";

import cloudIcon from "../../assets/tables/cloudIcon.svg";
import funnelIcon from "../../assets/tables/funnelIcon.svg";
import optionsIcon from "../../assets/tables/optionsIcon.svg";
import printerIcon from "../../assets/tables/printerIcon.svg";
import searchIcon from "../../assets/tables/searchIcon.svg";
import moreIcon from "../../assets/tables/moreIcon.svg";
import * as Icons from "@material-ui/icons";

import s from "./Tables.module.scss";
import mock from "./mock.js";

const DelieveryBoys = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [firstTable] = useState(mock.firstTable);
  const [secondTable] = useState(mock.secondTable);
  const [transactions, setTransactions] = useState(mock.transactionsWidget);
  const [tasks, setTasks] = useState(mock.tasksWidget);
  const [firstTableCurrentPage, setFirstTableCurrentPage] = useState(0);
  const [secondTableCurrentPage, setSecondTableCurrentPage] = useState(0);
  const [tableDropdownOpen, setTableMenuOpen] = useState(false);

  const pageSize = 4;
  const firstTablePagesCount = Math.ceil(firstTable.length / pageSize);
  const secondTablePagesCount = Math.ceil(secondTable.length / pageSize);

  const setFirstTablePage = (e, index) => {
    e.preventDefault();
    setFirstTableCurrentPage(index);
  };

  const setSecondTablePage = (e, index) => {
    e.preventDefault();
    setSecondTableCurrentPage(index);
  };

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const transactionMenuOpen = (id) => {
    setTransactions(
      transactions.map((transaction) => {
        if (transaction.id === id) {
          transaction.dropdownOpen = !transaction.dropdownOpen;
        }
        return transaction;
      })
    );
  };

  const tableMenuOpen = () => {
    setTableMenuOpen(!tableDropdownOpen);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.completed = !task.completed;
        }
        return task;
      })
    );
  };

  return (
    <div>
      <Row>
        <Col>
          <Row className="mb-4">
            <Col>
              <Widget>
                <div className={s.tableTitle}>
                  <div className="headline-2">Shops</div>
                  <Dropdown
                    className="d-none d-sm-block"
                    nav
                    isOpen={tableDropdownOpen}
                    toggle={() => tableMenuOpen()}
                  >
                    <DropdownToggle nav>
                      <img
                        className="d-none d-sm-block"
                        src={moreIcon}
                        alt="More..."
                      />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <div>Copy</div>
                      </DropdownItem>
                      <DropdownItem>
                        <div>Edit</div>
                      </DropdownItem>
                      <DropdownItem>
                        <div>Delete</div>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div className="widget-table-overflow">
                  <Table className="table-striped table-borderless " responsive>
                    <thead>
                      <tr>
                        <th>
                          <div className="checkbox checkbox-primary">
                            <input
                              id="checkbox200"
                              className="styled"
                              type="checkbox"
                            />
                            <label for="checkbox200" />
                          </div>
                        </th>
                        <th className={s.nameCol}>NAME</th>
                        <th>EMAIL</th>
                        <th>PRODUCT</th>
                        <th>PRICE</th>
                        <th>DATE</th>
                        <th>CITY</th>
                        <th>STATUS</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                      {secondTable
                        .slice(
                          secondTableCurrentPage * pageSize,
                          (secondTableCurrentPage + 1) * pageSize
                        )
                        .map((item) => (
                          <tr key={uuidv4()}>
                            <td>
                              <div className="checkbox checkbox-primary">
                                <input
                                  id={item.id}
                                  className="styled"
                                  type="checkbox"
                                />
                                <label for={item.id} />
                              </div>
                            </td>
                            <td className="d-flex align-items-center">
                              <img
                                className={s.image}
                                src={item.img}
                                alt="User"
                              />
                              <span className="ml-3">{item.name}</span>
                            </td>
                            <td>{item.email}</td>
                            <td>{item.product}</td>
                            <td>{item.price}</td>
                            <td>{item.date}</td>
                            <td>{item.city}</td>
                            <td>
                              <Badge color={item.color}>{item.status}</Badge>
                            </td>
                            <td>
                              <a style={{ padding: "3px" }}>
                                <Badge color={"secondary-cyan"}>
                                  {" "}
                                  <Icons.Edit />
                                </Badge>
                              </a>
                              <a style={{ padding: "3px" }}>
                                <Badge color={"secondary-red"}>
                                  {" "}
                                  <Icons.Delete />
                                </Badge>
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <Pagination className="pagination-with-border">
                    <PaginationItem disabled={secondTableCurrentPage <= 0}>
                      <PaginationLink
                        onClick={(e) =>
                          setSecondTablePage(e, secondTableCurrentPage - 1)
                        }
                        previous
                        href="#top"
                      />
                    </PaginationItem>
                    {[...Array(secondTablePagesCount)].map((page, i) => (
                      <PaginationItem
                        active={i === secondTableCurrentPage}
                        key={i}
                      >
                        <PaginationLink
                          onClick={(e) => setSecondTablePage(e, i)}
                          href="#top"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem
                      disabled={
                        secondTableCurrentPage >= secondTablePagesCount - 1
                      }
                    >
                      <PaginationLink
                        onClick={(e) =>
                          setSecondTablePage(e, secondTableCurrentPage + 1)
                        }
                        next
                        href="#top"
                      />
                    </PaginationItem>
                  </Pagination>
                </div>
              </Widget>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DelieveryBoys;
