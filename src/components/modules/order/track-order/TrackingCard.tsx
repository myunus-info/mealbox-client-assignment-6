import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type TrackingStatus = 'pending' | 'in_progress' | 'delivered';

interface IOrderedData {
  id: string;
  orderDate: string;
  status: 'pending' | 'in_progress' | 'delivered';
  items: { name: string; quantity: number }[];
  estimatedDelivery: string;
}

interface OrderTrackingCardProps {
  order: IOrderedData;
}

const trackingStepsPending = [
  { label: 'Order Placed', timestamp: 'July 16, 2023 at 1:15 PM', completed: true },
  { label: 'Preparing Meal', timestamp: 'July 16, 2023 at 1:30 PM', completed: true },
  { label: 'Out for Delivery', timestamp: null, completed: false },
  { label: 'Delivered', timestamp: null, completed: false },
];

const trackingStepsInProgress = [
  { label: 'Order Placed', timestamp: 'July 16, 2023 at 1:15 PM', completed: true },
  { label: 'Preparing Meal', timestamp: 'July 16, 2023 at 1:30 PM', completed: true },
  { label: 'Out for Delivery', timestamp: null, completed: true },
  { label: 'Delivered', timestamp: null, completed: false },
];
const trackingStepsDelivered = [
  { label: 'Order Placed', timestamp: 'July 15, 2023 at 12:30 PM', completed: true },
  { label: 'Preparing Meal', timestamp: 'July 15, 2023 at 12:45 PM', completed: true },
  { label: 'Out for Delivery', timestamp: 'July 15, 2023 at 1:15 PM', completed: true },
  { label: 'Delivered', timestamp: 'July 15, 2023 at 1:28 PM', completed: true },
];

const OrderTrackingCard: React.FC<OrderTrackingCardProps> = ({ order }) => {
  const getStatusBadge = (status: TrackingStatus) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            In Progress
          </Badge>
        );
      case 'delivered':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Delivered
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-gray-500" />
              Order {order.id}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Ordered on {order.orderDate}</p>
          </div>
          {getStatusBadge(order.status)}
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Order Items</h4>
            <ul className="space-y-1 text-sm">
              {order.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span className="text-muted-foreground">x{item.quantity}</span>
                </li>
              ))}
            </ul>

            {order.status !== 'delivered' && (
              <div className="mt-4">
                <p className="text-sm font-medium">Estimated Delivery</p>
                <p className="text-sm">{order.estimatedDelivery}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium mb-2">Tracking Status</h4>
            <div className="relative">
              {order.status === 'pending'
                ? trackingStepsPending.map((step, index) => (
                    <div key={index} className="flex items-start mb-4 relative">
                      <div className="flex flex-col items-center mr-4">
                        <div
                          className={cn(
                            'h-8 w-8 rounded-full flex items-center justify-center',
                            step.completed
                              ? 'bg-green-100 text-green-600 border border-green-200'
                              : 'bg-gray-100 text-gray-400 border border-gray-200'
                          )}
                        >
                          {step.completed ? <Check className="h-4 w-4" /> : index + 1}
                        </div>
                        {index < trackingStepsPending.length - 1 && (
                          <div
                            className={cn(
                              'h-10 w-0.5',
                              step.completed && trackingStepsPending[index + 1].completed
                                ? 'bg-green-200'
                                : 'bg-gray-200'
                            )}
                          />
                        )}
                      </div>
                      <div>
                        <p
                          className={cn(
                            'font-medium',
                            step.completed ? 'text-green-700' : 'text-gray-500'
                          )}
                        >
                          {step.label}
                        </p>
                        {step.timestamp && (
                          <p className="text-xs text-muted-foreground">{step.timestamp}</p>
                        )}
                      </div>
                    </div>
                  ))
                : order.status === 'in_progress'
                ? trackingStepsInProgress.map((step, index) => (
                    <div key={index} className="flex items-start mb-4 relative">
                      <div className="flex flex-col items-center mr-4">
                        <div
                          className={cn(
                            'h-8 w-8 rounded-full flex items-center justify-center',
                            step.completed
                              ? 'bg-green-100 text-green-600 border border-green-200'
                              : 'bg-gray-100 text-gray-400 border border-gray-200'
                          )}
                        >
                          {step.completed ? <Check className="h-4 w-4" /> : index + 1}
                        </div>
                        {index < trackingStepsInProgress.length - 1 && (
                          <div
                            className={cn(
                              'h-10 w-0.5',
                              step.completed && trackingStepsInProgress[index + 1].completed
                                ? 'bg-green-200'
                                : 'bg-gray-200'
                            )}
                          />
                        )}
                      </div>
                      <div>
                        <p
                          className={cn(
                            'font-medium',
                            step.completed ? 'text-green-700' : 'text-gray-500'
                          )}
                        >
                          {step.label}
                        </p>
                        {step.timestamp && (
                          <p className="text-xs text-muted-foreground">{step.timestamp}</p>
                        )}
                      </div>
                    </div>
                  ))
                : order.status === 'delivered'
                ? trackingStepsDelivered.map((step, index) => (
                    <div key={index} className="flex items-start mb-4 relative">
                      <div className="flex flex-col items-center mr-4">
                        <div
                          className={cn(
                            'h-8 w-8 rounded-full flex items-center justify-center',
                            step.completed
                              ? 'bg-green-100 text-green-600 border border-green-200'
                              : 'bg-gray-100 text-gray-400 border border-gray-200'
                          )}
                        >
                          {step.completed ? <Check className="h-4 w-4" /> : index + 1}
                        </div>
                        {index < trackingStepsDelivered.length - 1 && (
                          <div
                            className={cn(
                              'h-10 w-0.5',
                              step.completed && trackingStepsDelivered[index + 1].completed
                                ? 'bg-green-200'
                                : 'bg-gray-200'
                            )}
                          />
                        )}
                      </div>
                      <div>
                        <p
                          className={cn(
                            'font-medium',
                            step.completed ? 'text-green-700' : 'text-gray-500'
                          )}
                        >
                          {step.label}
                        </p>
                        {step.timestamp && (
                          <p className="text-xs text-muted-foreground">{step.timestamp}</p>
                        )}
                      </div>
                    </div>
                  ))
                : ''}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTrackingCard;
