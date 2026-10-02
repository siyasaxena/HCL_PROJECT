package inventory.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import inventory.service.InventoryService;
import inventory.model.InventoryStock;

@RestController
@RequestMapping("/api/inventory") // <-- Change this from /api/products to /api/inventory
@CrossOrigin(origins = "http://localhost:4200")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping
    public ResponseEntity<List<InventoryStock>> getAllInventory() {
        return ResponseEntity.ok(inventoryService.getAllItems());
    }
}