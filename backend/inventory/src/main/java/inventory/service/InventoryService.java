package inventory.service;

import inventory.model.InventoryStock;
import inventory.repository.InventoryStockRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    private final InventoryStockRepository inventoryStockRepository;

    public InventoryService(InventoryStockRepository inventoryStockRepository) {
        this.inventoryStockRepository = inventoryStockRepository;
    }
 
    public List<InventoryStock> getAllItems() {
        return inventoryStockRepository.findAll();
    }
}