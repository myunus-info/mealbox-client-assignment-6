'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import OrderTrackingCard from './TrackingCard';
import { IOrderedData } from '@/app/(WithDashboardLayout)/customer/shopping/track-orders/page';

const TrackOrders = ({ orders }: { orders: IOrderedData[] }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Track Orders</h1>
        <p className="text-muted-foreground">View and track your meal deliveries</p>
      </div>

      <Tabs defaultValue="all" className="w-full ">
        <TabsList className="hidden">
          <TabsTrigger value="all">All Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {orders.length > 0 ? (
            orders.map(order => <OrderTrackingCard key={order.id} order={order} />)
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No orders found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrackOrders;
