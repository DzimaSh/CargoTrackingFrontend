import axios from "axios";
import React from "react";
import { useEffect, useState } from "react"
import { useTable } from "react-table";
import { useNavigate, useSearchParams, useLocation, Link } from "react-router-dom";
import { configureRequest, configureRequestWithoutParams } from "../service/auth.service";
import './ClientsTable.css';

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
          <tr {...headerGroup.getHeaderGroupProps()} className="table-head">
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
            <tr {...row.getRowProps()} className="table-body">
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
  const [name, setName] = useState('');
  const [statuses, setStatuses] = useState('');
  const url = "http://localhost:8080/api/clients";
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()

  useEffect(() => {
    const nameFromUrl = searchParams.get('name');
    if (nameFromUrl !== null) {
      setName(nameFromUrl);
    }
    const statusesFromUrl = searchParams.get('statuses');
    if (statusesFromUrl !== null) {
      setStatuses(statusesFromUrl);
    }
  }, [searchParams])

  useEffect(() => {
    let params1 = { 
      name,
      statuses,
    };
    let config = configureRequest(params1);

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
  }, [name, statuses]);


  const columns = React.useMemo(() => [
      {
        Header: 'Id',
        accessor: 'id'
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Status',
        accessor: 'status'
      },
      {
        Header: 'Delete date',
        accessor: 'deleteDate',
        Cell: ({cell}) => (
          <>
            {cell.row.values.deleteDate &&
              <button onClick={() => handleActivatingClient(cell.row.values.id)}>
                {cell.row.values.deleteDate} Activate
              </button>
            }
          </>
        )
      }
    ]
  )

  const handleActivatingClient = (id) => {
    let config = configureRequestWithoutParams();
    axios.put(url + `/activate/${id}`, undefined, config)
      .then(response => {
        if (response.status >= 400) {
          throw Error(response.status);
        }            
        window.location.reload();
      })
  }

  const handleNameChange = e => {
    setName(e.target.value);
    navigate(location.pathname + `?name=${e.target.value}&statuses=${statuses}`);
  }

  const handleStatusesChange = e => {
    setStatuses(e.target.value);
    navigate(location.pathname + `?name=${name}&statuses=${e.target.value}`);
  }

  return (
    <div className="clients">
      <div className="user-links">
        <ul>
          <li><Link to={'/clients/new'}>Create new client</Link></li>
          <li><Link to={'/'}>Go back</Link></li>
        </ul>
      </div>
      <div className="clients-table">
        <div className="search-params">
          <div className="default-input">
            <input type='text' onChange={handleNameChange} value={name} placeholder="Serach by name"></input>
          </div>
          <div className="status-select">
            <select onChange={handleStatusesChange} value={statuses}>
              <option default value="">Search by status</option>
              <option>PRIVATE</option>
              <option>LEGAL</option>
            </select>
          </div>
        </div>
        <Table columns={columns} data={clients} />
      </div>
    </div>
  )
}
