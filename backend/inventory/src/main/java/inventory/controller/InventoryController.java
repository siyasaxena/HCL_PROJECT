package inventory.controller;

import inventory.model.InventoryStock;
import inventory.model.StockMovement;
import inventory.repository.InventoryStockRepository;
import inventory.repository.StockMovementRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "http://localhost:4200")
public class InventoryController {

    private final InventoryStockRepository inventoryStockRepository;
    private final StockMovementRepository stockMovementRepository;

    public InventoryController(InventoryStockRepository inventoryStockRepository, 
                               StockMovementRepository stockMovementRepository) {
        this.inventoryStockRepository = inventoryStockRepository;
        this.stockMovementRepository = stockMovementRepository;
    }

    @GetMapping
    public ResponseEntity<List<InventoryStock>> getAllInventory() {
        return ResponseEntity.ok(inventoryStockRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Void> createInventory(@RequestBody InventoryStock stock) {
        try {
            inventoryStockRepository.save(stock);
            return ResponseEntity.ok().build(); // Prevents 500 serialization error loops
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/adjustments")
    public ResponseEntity<Void> adjustInventory(@RequestBody StockMovement movement) {
        try {
            if (movement.getType() == null) {
                movement.setType("ADJUSTMENT");
            }
            stockMovementRepository.save(movement);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}