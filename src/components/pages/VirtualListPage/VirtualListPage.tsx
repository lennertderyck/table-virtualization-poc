import { FC } from 'react';
import { Person } from '../../../types/indentities';
import persons from '../../../utils/data/persons';
import Table from '../../elements/Table/Table';
import { TableColumn } from '../../elements/Table/Table.types';

// console.log(Array.from({ length: 1_000_000 }, (_, i) => {
//   const firstName = faker.person.firstName();
//   const lastName = faker.person.lastName();
  
//   return {
//     id: i,
//     firstName,
//     lastName,
//     email: faker.internet.email({ firstName, lastName}),
//   }
// }));

interface Props {};

const VirtualListPage: FC<Props> = () => {
  const columns: TableColumn<Person>[] = [
    { id: 'id', 
      accessor: 'id', 
      header: 'Id', 
      cell: (person) => `Person ${person.id + 1}`, 
      order: 1,
    },
    {
      id: 'fullName',
      accessor: 'fullName',
      header: 'Name',
      cell: (person) => `${person.firstName} ${person.lastName}`,
      pin: 'left',
      order: 0,
    },
    { id: 'email', 
      accessor: 'email', 
      header: 'Email', 
      cell: (person) => person.email,
      order: 2,
    },
  ];
        
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="w-[700px]">
        <Table
          layout="fixed"
          data={persons}
          columns={columns}
          onSelectedRowsChange={d => console.log(d.map(p => p.lastName))}
        />
      </div>
    </div>
  )
}

export default VirtualListPage;