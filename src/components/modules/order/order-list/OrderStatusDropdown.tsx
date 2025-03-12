/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { respondToCustomerOrder } from '@/services/Respond';
// import { useToast } from '@/hooks/use-toast';

type OrderStatus = 'pending' | 'in_progress' | 'delivered';

interface OrderStatusDropdownProps {
  orderId: string;
  currentStatus: OrderStatus;
  // onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

const OrderStatusDropdown: React.FC<OrderStatusDropdownProps> = ({ orderId, currentStatus }) => {
  // const { toast } = useToast();

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 mr-2" />;
      case 'in_progress':
        return <Truck className="h-4 w-4 mr-2" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 mr-2" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'in_progress':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'delivered':
        return 'bg-green-500 hover:bg-green-600';
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in_progress':
        return 'In Progress';
      case 'delivered':
        return 'Delivered';
    }
  };

  const handleStatusChange = async (newStatus: OrderStatus) => {
    const payload = { _id: orderId, status: newStatus };

    try {
      const res = await respondToCustomerOrder(payload);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`${getStatusColor(currentStatus)} text-white border-0`}
        >
          {getStatusIcon(currentStatus)}
          {getStatusText(currentStatus)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleStatusChange('pending')} className="cursor-pointer">
          <Clock className="h-4 w-4 mr-2" />
          <span>Pending</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleStatusChange('in_progress')}
          className="cursor-pointer"
        >
          <Truck className="h-4 w-4 mr-2" />
          <span>In Progress</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleStatusChange('delivered')}
          className="cursor-pointer"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          <span>Delivered</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderStatusDropdown;
