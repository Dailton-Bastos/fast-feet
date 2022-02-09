import React from 'react'

import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react'

interface ListTableProps {
  thead: string[]
  children: React.ReactNode
}

export const ListTable = ({ thead, children }: ListTableProps) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          {thead.map((head) => (
            <Th
              key={head}
              fontSize="md"
              textTransform="capitalize"
              _last={{ textAlign: 'right' }}
            >
              {head}
            </Th>
          ))}
        </Tr>
      </Thead>

      <Tbody color="#666">{children}</Tbody>
    </Table>
  )
}
