import TrackOrders from '@/components/modules/order/track-order/TrackOrders';
import { getOrders } from '@/services/Orders';

interface IOrderItem {
  name: string;
  quantity: number;
}

export interface IOrderedData {
  id: string;
  orderDate: string;
  estimatedDelivery: string;
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
    estimatedDelivery: new Date(order.createdAt).toISOString(),
    status: order.status as 'pending' | 'in_progress' | 'delivered',
    items: order.meals.map(meal => ({
      name: meal.meal ?? '',
      quantity: meal.quantity ?? 0,
    })),
  }));

  return (
    <div>
      <TrackOrders orders={orderedData} />
    </div>
  );
}
