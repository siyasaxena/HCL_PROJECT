package inventory.repository;

import inventory.model.InventoryStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface InventoryStockRepository extends JpaRepository<InventoryStock, Long> {
    Optional<InventoryStock> findBySkuAndWarehouseCode(String sku, String warehouseCode);
}