'use client';

import { Cell, Chip, Column, Row, Table, TableBody, TableHeader } from '@trellis-ui/react';
import { useMemo, useState } from 'react';
import type { SortDescriptor } from 'react-aria-components';

const invoices = [
  { id: 'INV-001', customer: 'Acme Corp', status: 'Paid', amount: 1250 },
  { id: 'INV-002', customer: 'Globex', status: 'Pending', amount: 840 },
  { id: 'INV-003', customer: 'Initech', status: 'Overdue', amount: 2310 },
  { id: 'INV-004', customer: 'Umbrella', status: 'Paid', amount: 460 },
  { id: 'INV-005', customer: 'Hooli', status: 'Pending', amount: 1780 },
];

const statusColor = { Paid: 'primary', Pending: 'warning', Overdue: 'danger' } as const;

export default function TableDemo() {
  const [sort, setSort] = useState<SortDescriptor>({ column: 'amount', direction: 'descending' });
  const rows = useMemo(
    () =>
      [...invoices].sort((a, b) => {
        const key = sort.column as keyof (typeof invoices)[number];
        const result = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
        return sort.direction === 'descending' ? -result : result;
      }),
    [sort],
  );

  return (
    <Table aria-label="Invoices" selectionMode="multiple" sortDescriptor={sort} onSortChange={setSort} className="min-w-[32rem]">
      <TableHeader>
        <Column id="id" isRowHeader allowsSorting>
          Invoice
        </Column>
        <Column id="customer" allowsSorting>
          Customer
        </Column>
        <Column id="status">Status</Column>
        <Column id="amount" allowsSorting>
          Amount
        </Column>
      </TableHeader>
      <TableBody items={rows}>
        {(invoice) => (
          <Row>
            <Cell className="font-medium">{invoice.id}</Cell>
            <Cell>{invoice.customer}</Cell>
            <Cell>
              <Chip color={statusColor[invoice.status as keyof typeof statusColor]}>{invoice.status}</Chip>
            </Cell>
            <Cell className="tabular-nums">${invoice.amount.toLocaleString()}</Cell>
          </Row>
        )}
      </TableBody>
    </Table>
  );
}
