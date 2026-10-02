package inventory.service;

import inventory.model.Order;
import inventory.model.OrderItem;
import inventory.model.Product;
import inventory.repository.OrderRepository;
import inventory.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    // Retrieve all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Retrieve order by ID
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    // Find orders by customer email
    public List<Order> getOrdersByCustomerEmail(String email) {
        return orderRepository.findByCustomerEmail(email);
    }

    // Create a new order with stock validation and automatic deduction
    @Transactional
    public Order createOrder(Order order) {
        order.setOrderDate(LocalDateTime.now());
        if (order.getStatus() == null || order.getStatus().isEmpty()) {
            order.setStatus("PENDING");
        }

        // Link parent reference and reduce inventory stock for each order item
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                item.setOrder(order);

                // Check product availability and deduct stock
                if (item.getProduct() != null && item.getProduct().getId() != null) {
                    Product product = productRepository.findById(item.getProduct().getId())
                            .orElseThrow(() -> new RuntimeException("Product not found with ID: " + item.getProduct().getId()));

                    if (product.getQuantity() < item.getQuantity()) {
                        throw new IllegalArgumentException("Insufficient stock for product: " + product.getName());
                    }

                    product.setQuantity(product.getQuantity() - item.getQuantity());
                    productRepository.save(product);
                    item.setProduct(product);
                }
            }
        }

        return orderRepository.save(order);
    }

    // Update order status (e.g., PENDING -> COMPLETED / CANCELLED)
    @Transactional
    public Order updateOrderStatus(Long id, String newStatus) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + id));

        // Restore product quantities if order is cancelled
        if ("CANCELLED".equalsIgnoreCase(newStatus) && !"CANCELLED".equalsIgnoreCase(order.getStatus())) {
            if (order.getItems() != null) {
                for (OrderItem item : order.getItems()) {
                    Product product = item.getProduct();
                    if (product != null) {
                        product.setQuantity(product.getQuantity() + item.getQuantity());
                        productRepository.save(product);
                    }
                }
            }
        }

        order.setStatus(newStatus.toUpperCase());
        return orderRepository.save(order);
    }

    // Delete an order
    public void deleteOrder(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found with ID: " + id);
        }
        orderRepository.deleteById(id);
    }
}