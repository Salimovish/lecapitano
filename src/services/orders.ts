import { supabase } from '../lib/supabase';
import { Order, OrderStatus } from '../types/order';
import { getPrice } from '../types/menu';

export const OrderService = {
  // Get all orders
  async getOrders(): Promise<Order[]> {
    // Get orders with order items, excluding completed and cancelled orders
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select('*, order_items (*)')
      .neq('status', 'completed')
      .neq('status', 'cancelled');

    if (ordersError) throw ordersError;

    // Get all products to map names
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('*');

    if (productsError) throw productsError;

    // Get supplements to map names
    const supplementIds = ordersData.flatMap(order => 
      order.order_items.filter(item => item.type === 'supplement').map(item => item.product_id)
    );
    const { data: supplementsData, error: supplementsError } = await supabase
      .from('supplements')
      .select('id, name, price')
      .in('id', supplementIds);

    if (supplementsError) throw supplementsError;

    // Create map for product data
    const productMap = new Map(productsData.map(product => [product.id, product]));
    const supplementMap = new Map(supplementsData.map(supplement => [supplement.id, supplement]));
    console.log('Supplements Map:', Array.from(supplementMap.entries()));

    return ordersData.map(order => {
      // Organiser les items par parent
      const itemsMap = new Map();
      order.order_items.forEach(item => {
        if (!item.parent_item_id) {
          // Item principal (pizza)
          itemsMap.set(item.id, {
            ...item,
            supplements: []
          });
        }
      });

      // Ajouter les suppléments aux items principaux
      order.order_items.forEach(item => {
        if (item.parent_item_id) {
          const parentItem = itemsMap.get(item.parent_item_id);
          if (parentItem) {
            parentItem.supplements.push(item);
          }
        }
      });

      return {
        id: order.id,
        number: order.number,
        items: Array.from(itemsMap.values()).map(item => {
          const product = productMap.get(item.product_id);
          const itemTotal = item.unit_price * item.quantity;
          const supplementsTotal = item.supplements.reduce((sum, supplement) => 
            sum + (supplement.unit_price * supplement.quantity), 0);

          return {
            productId: item.product_id,
            name: product?.name || item.type || 'Produit inconnu',
            size: item.size,
            quantity: item.quantity,
            price: itemTotal + supplementsTotal,
            unitPrice: item.unit_price,
            options: item.options,
            type: item.type,
            supplements: item.supplements.map(supplement => {
              const supplementProduct = supplementMap.get(supplement.product_id);
              console.log('Supplement:', {
                productId: supplement.product_id,
                name: supplementProduct?.name,
                quantity: supplement.quantity,
                unitPrice: supplement.unit_price,
                basePrice: supplementProduct?.price
              });
              return {
                productId: supplement.product_id,
                name: supplementProduct?.name || 'Supplément inconnu',
                quantity: supplement.quantity,
                price: supplementProduct?.price || supplement.unit_price
              };
            })
          };
        }),
        status: order.status as OrderStatus,
        deliveryType: order.delivery_type,
        total: order.total,
        createdAt: order.created_at,
        updatedAt: order.updated_at,
        customerName: order.customer_name,
        specialInstructions: order.special_instructions
      };
    });
  },

  // Get a single order by ID
  async getOrderById(orderId: string): Promise<Order> {
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select('*, order_items (*)')
      .eq('id', orderId)
      .single();

    if (orderError) throw orderError;

    // Get products for this order
    const productIds = orderData.order_items.map(item => item.product_id);
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('*')
      .in('id', productIds);

    if (productsError) throw productsError;

    // Get supplements for this order
    const supplementIds = orderData.order_items
      .filter(item => item.type === 'supplement')
      .map(item => item.product_id);
    const { data: supplementsData, error: supplementsError } = await supabase
      .from('supplements')
      .select('id, name, price')
      .in('id', supplementIds);

    if (supplementsError) throw supplementsError;

    // Create map for product data
    const productMap = new Map(productsData.map(product => [product.id, product]));
    const supplementMap = new Map(supplementsData.map(supplement => [supplement.id, supplement]));
    console.log('Supplements Map:', Array.from(supplementMap.entries()));

    // Organiser les items par parent
    const itemsMap = new Map();
    orderData.order_items.forEach(item => {
      if (!item.parent_item_id) {
        // Item principal (pizza)
        itemsMap.set(item.id, {
          ...item,
          supplements: []
        });
      }
    });

    // Ajouter les suppléments aux items principaux
    orderData.order_items.forEach(item => {
      if (item.parent_item_id) {
        const parentItem = itemsMap.get(item.parent_item_id);
        if (parentItem) {
          parentItem.supplements.push(item);
        }
      }
    });

    return {
      id: orderData.id,
      number: orderData.number,
      items: Array.from(itemsMap.values()).map(item => {
        const product = productMap.get(item.product_id);
        const itemTotal = item.unit_price * item.quantity;
        const supplementsTotal = item.supplements.reduce((sum, supplement) => 
          sum + (supplement.unit_price * supplement.quantity), 0);

        return {
          productId: item.product_id,
          name: product?.name || item.type || 'Produit inconnu',
          size: item.size,
          quantity: item.quantity,
          price: itemTotal + supplementsTotal,
          unitPrice: item.unit_price,
          options: item.options,
          type: item.type,
          supplements: item.supplements.map(supplement => {
            const supplementProduct = supplementMap.get(supplement.product_id);
            console.log('Supplement:', {
              productId: supplement.product_id,
              name: supplementProduct?.name,
              quantity: supplement.quantity,
              unitPrice: supplement.unit_price,
              basePrice: supplementProduct?.price
            });
            return {
              productId: supplement.product_id,
              name: supplementProduct?.name || 'Supplément inconnu',
              quantity: supplement.quantity,
              price: supplementProduct?.price || supplement.unit_price
            };
          })
        };
      }),
      status: orderData.status as OrderStatus,
      deliveryType: orderData.delivery_type,
      total: orderData.total,
      createdAt: orderData.created_at,
      updatedAt: orderData.updated_at,
      customerName: orderData.customer_name,
      specialInstructions: orderData.special_instructions
    };
  },

  // Create new order
  async createOrder({
    items,
    total,
    deliveryType,
    customerName,
    specialInstructions
  }: {
    items: Array<{
      productId: string;
      size?: string;
      quantity: number;
      options?: string[];
      type?: 'pizza' | 'supplement' | 'boisson' | 'crepe';
      supplements?: Array<{
        pizzaId: string;
        supplementId: string;
        quantity: number;
      }>;
    }>;
    total: number;
    deliveryType: 'dine-in' | 'takeaway';
    customerName: string;
    specialInstructions?: string;
  }): Promise<Order> {
    // Get products to calculate unit prices
    const productIds = items.map(item => item.productId);
    const supplementIds = items.flatMap(item => 
      item.supplements ? item.supplements.map(s => s.supplementId) : []
    );
    
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('*')
      .in('id', productIds);

    const { data: supplementsData, error: supplementsError } = await supabase
      .from('supplements')
      .select('id, name, price')
      .in('id', supplementIds);

    if (productsError || supplementsError) throw (productsError || supplementsError);

    const productMap = new Map(productsData.map(product => [product.id, product]));
    const supplementMap = new Map(supplementsData.map(supplement => [supplement.id, supplement]));
    console.log('Supplements Map:', Array.from(supplementMap.entries()));

    // Get the next order number
    const { data: nextNumberData, error: nextNumberError } = await supabase
      .rpc('get_next_order_number');

    if (nextNumberError) throw nextNumberError;

    const orderNumber = String(nextNumberData).padStart(4, '0');

    // Recalculer le total avec les suppléments
    const calculatedTotal = items.reduce((sum, item) => {
      const product = productMap.get(item.productId);
      const itemTotal = getPrice(product, item.size as any) * item.quantity;
      
      const supplementsTotal = item.supplements 
        ? item.supplements.reduce((suppSum, supplement) => {
            const supplementProduct = supplementMap.get(supplement.supplementId);
            return suppSum + (supplementProduct?.price || 0) * supplement.quantity;
          }, 0)
        : 0;

      return sum + itemTotal + supplementsTotal;
    }, 0);

    // Create the main order
    const { data: orderResult, error: orderError } = await supabase
      .from('orders')
      .insert({
        number: orderNumber,
        total: calculatedTotal,
        delivery_type: deliveryType,
        status: 'pending' as OrderStatus,
        customer_name: customerName,
        special_instructions: specialInstructions
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Prepare order items with unit prices
    const orderItemsToInsert: any[] = [];
    
    for (const item of items) {
      const product = productMap.get(item.productId);
      
      // Insérer l'élément principal (pizza ou autre)
      const { data: mainItemResult, error: mainItemError } = await supabase
        .from('order_items')
        .insert({
          order_id: orderResult.id,
          product_id: item.productId,
          size: item.type === 'pizza' ? item.size : 'standard',
          quantity: item.quantity,
          unit_price: item.type === 'supplement' ? supplementMap.get(item.productId)?.price : getPrice(product, item.size as any),
          options: item.options,
          type: item.type || 'supplement'
        })
        .select()
        .single();

      if (mainItemError) throw mainItemError;

      // Si l'item a des suppléments, insérer chaque supplément avec le parent_item_id
      if (item.supplements && item.supplements.length > 0) {
        for (const supplement of item.supplements) {
          const supplementProduct = supplementMap.get(supplement.supplementId);
          const { error: supplementItemError } = await supabase
            .from('order_items')
            .insert({
              order_id: orderResult.id,
              product_id: supplement.supplementId,
              size: 'standard',
              quantity: supplement.quantity,
              unit_price: supplementProduct?.price || 0,
              type: 'supplement',
              parent_item_id: mainItemResult.id
            });

          if (supplementItemError) throw supplementItemError;
        }
      }
    }

    // Return the full order
    return this.getOrderById(orderResult.id);
  },

  // Update order status
  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    console.log('🔄 Début mise à jour status dans Supabase:', { orderId, status });
    
    const { error } = await supabase
      .rpc('update_order_status_direct', {
        p_order_id: orderId,
        p_status: status
      });

    console.log('📦 Réponse Supabase:', { error });

    if (error) {
      console.error('❌ Erreur Supabase:', error);
      throw error;
    }
    
    console.log('✅ Status mis à jour avec succès');
  }
};