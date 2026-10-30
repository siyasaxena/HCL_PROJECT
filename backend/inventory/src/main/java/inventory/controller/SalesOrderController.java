package inventory.controller;

import inventory.model.SalesOrder;
import inventory.service.SalesOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales-orders") // ✅ Changed to a unique path
@CrossOrigin(origins = "http://localhost:4200")
public class SalesOrderController {

    private final SalesOrderService salesOrderService;

    public SalesOrderController(SalesOrderService salesOrderService) {
        this.salesOrderService = salesOrderService;
    }

    @GetMapping
    public ResponseEntity<List<SalesOrder>> getOrders() {
        return ResponseEntity.ok(salesOrderService.getAllOrders());
    }

    @PostMapping
    public ResponseEntity<SalesOrder> createOrder(@RequestBody SalesOrder order) {
        return ResponseEntity.ok(salesOrderService.createOrder(order));
    }
}