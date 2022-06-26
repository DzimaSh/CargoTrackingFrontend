import axios from "axios";
import React from "react";
import { useEffect, useState } from "react"
import { useTable } from "react-table";
import { configureRequest } from "../service/auth.service";

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable(
    {
      columns,
      data,
    }
  )

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export function ClientsTable() {
    const [clients, setClients] = useState([]);
    const url = "http://localhost:8080/api/clients/";

    useEffect(() => {
        let config = configureRequest();

        axios.get(url, config)
            .then(response => {
                if (response.status >= 400) {
                    throw Error(response.status);
                }
                return response.data
            })
            .then(data => {
                setClients(data.content)
            })
        }, []);


    const columns = React.useMemo(() => [
        {
            Header: 'Status',
            accessor: 'status'
        },
        {
            Header: 'Id',
            accessor: 'id'
        },
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Delete date',
            accessor: 'deleteDate'
        }
        ]   
    )
  return (
    <Table columns={columns} data={clients} />
  )
}
