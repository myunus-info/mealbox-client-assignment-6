import TrackOrders from '@/components/modules/order/track-order/TrackOrders';
import { getOrders } from '@/services/Orders';

interface IOrderItem {
  name: string | undefined;
  quantity: number | undefined;
}

export interface IOrderedData {
  id: string;
  orderDate: string;
  estimatedDelivery: number;
  status: 'pending' | 'in_progress' | 'delivered';
  items: IOrderItem[];
}

interface IOrdersResponse {
  data: {
    _id: string;
    createdAt: string;
    status: string;
    meals: { meal?: string; quantity?: number }[];
  }[];
}

export default async function TrackOrder() {
  const orders: IOrdersResponse = await getOrders();

  const orderedData: IOrderedData[] = orders?.data?.map(order => ({
    id: order._id,
    orderDate: order.createdAt,
    estimatedDelivery: new Date(order.createdAt).getTime() + 3 * 24 * 60 * 60 * 1000,
    status: order.status as 'pending' | 'in_progress' | 'delivered',
    items: order.meals.map(meal => ({
      name: meal.meal,
      quantity: meal.quantity,
    })),
  }));

  return (
    <div>
      <TrackOrders orders={orderedData} />
    </div>
  );
}
