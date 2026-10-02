package inventory.controller;

import inventory.model.SalesOrder;
import inventory.service.SalesOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class SalesOrderController {

    private final SalesOrderService orderService;

    public SalesOrderController(SalesOrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<List<SalesOrder>> getOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PostMapping
    public ResponseEntity<SalesOrder> createOrder(@RequestBody SalesOrder order) {
        return ResponseEntity.ok(orderService.createOrder(order));
    }

    @PostMapping("/{id}/ship")
    public ResponseEntity<SalesOrder> shipOrder(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, "SHIPPED"));
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<SalesOrder> cancelOrder(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, "CANCELLED"));
    }
}