import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import OrderStatusDropdown from './OrderStatusDropdown';
import { TOrder } from '@/types/order';

interface OrdersTableProps {
  orders: TOrder[];
  // onStatusChange: (orderId: string, newStatus: 'pending' | 'in_progress' | 'delivered') => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Preference</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No orders found
              </TableCell>
            </TableRow>
          ) : (
            orders.map(order => {
              const grandTotal = order?.meals.reduce(
                (acc, curr) => acc + curr.quantity * curr.price,
                0
              );
              return (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">{order._id}</TableCell>
                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}{' '}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate">
                      {order.meals.map(item => `${item.quantity}x ${item.meal.name}`).join(', ')}
                    </div>
                  </TableCell>
                  <TableCell>{order.dietaryPreferences}</TableCell>
                  <TableCell>${grandTotal.toFixed(2)}</TableCell>
                  <TableCell>
                    <OrderStatusDropdown orderId={order._id} currentStatus={order.status} />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
