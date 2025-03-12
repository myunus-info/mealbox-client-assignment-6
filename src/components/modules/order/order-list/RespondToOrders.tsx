import OrdersTable from './OrdersTable';
import { getCustomerOrders } from '@/services/Respond';

const RespondToOrders = async () => {
  const orders = await getCustomerOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
        <p className="text-muted-foreground">Track and update order status</p>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Orders</h2>
        <OrdersTable orders={orders?.data} />
      </div>
    </div>
  );
};

export default RespondToOrders;
