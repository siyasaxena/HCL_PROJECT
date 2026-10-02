package inventory.service;

import inventory.model.SalesOrder;
import inventory.repository.SalesOrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalesOrderService {

    private final SalesOrderRepository orderRepository;

    public SalesOrderService(SalesOrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<SalesOrder> getAllOrders() {
        return orderRepository.findAll();
    }

    public SalesOrder createOrder(SalesOrder order) {
        if (order.getOrderNumber() == null || order.getOrderNumber().isEmpty()) {
            order.setOrderNumber("SO-" + (System.currentTimeMillis() % 100000));
        }
        order.setStatus("PENDING");
        return orderRepository.save(order);
    }

    public SalesOrder updateOrderStatus(Long id, String status) {
        SalesOrder order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sales Order not found with ID: " + id));
        order.setStatus(status);
        return orderRepository.save(order);
    }
}