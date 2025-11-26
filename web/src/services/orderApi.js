const API_BASE_URL = 'http://localhost:8080/api';

export const orderApi = {
  async getAllOrders() {
    const response = await fetch(`${API_BASE_URL}/orders`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  async getOrderById(id) {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  },

  async getOrdersByEmail(email) {
    const response = await fetch(`${API_BASE_URL}/orders/customer/${encodeURIComponent(email)}`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  async createOrder(orderData) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  async updateOrderStatus(id, status) {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status?status=${status}`, {
      method: 'PATCH'
    });
    if (!response.ok) throw new Error('Failed to update order status');
    return response.json();
  },

  async deleteOrder(id) {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete order');
  }
};
