import { FC } from 'react';
import Table from './components/elements/Table/Table';
import { TableColumn } from './components/elements/Table/Table.types';
import { Person } from './types/indentities';
import persons from './utils/data/persons';

interface Props {};

const App: FC<Props> = () => {
  const columns: TableColumn<Person>[] = [
    { id: 'id', 
      accessor: 'id', 
      header: 'Id', 
      cell: (person) => `Person ${person.id + 1}`, 
      pin: 'left',
    },
    {
      id: 'fullName',
      accessor: 'fullName',
      header: 'Name',
      cell: (person) => `${person.firstName} ${person.lastName}`,
    },
    { id: 'firstName', 
      accessor: 'firstName', 
      header: 'First name', 
      cell: (person) => person.firstName,
      show: false,
    },
    { id: 'lastName', 
      accessor: 'lastName', 
      header: 'Last name', 
      cell: (person) => person.lastName,
      show: false,
    },
    { id: 'email', 
      accessor: 'email', 
      header: 'Email', 
      cell: (person) => person.email,
    },
  ];
        
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="w-[700px]">
          <Table
            layout="fixed"
            data={persons}
            columns={columns}
          />
      </div>
    </div>
  )
}

export default App;