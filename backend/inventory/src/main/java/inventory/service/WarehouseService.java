package inventory.service;

import inventory.model.Warehouse;
import inventory.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WarehouseService {

    private final WarehouseRepository warehouseRepository;

    @Autowired
    public WarehouseService(WarehouseRepository warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }

    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }

    public Optional<Warehouse> getWarehouseById(Long id) {
        return warehouseRepository.findById(id);
    }

    public Warehouse saveWarehouse(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    public Warehouse updateWarehouse(Long id, Warehouse warehouseDetails) {
        return warehouseRepository.findById(id).map(existing -> {
            existing.setName(warehouseDetails.getName());
            existing.setLocation(warehouseDetails.getLocation());
            existing.setCapacity(warehouseDetails.getCapacity());
            existing.setManagerName(warehouseDetails.getManagerName());
            existing.setContactPhone(warehouseDetails.getContactPhone());
            return warehouseRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Warehouse not found with id: " + id));
    }

    public void deleteWarehouse(Long id) {
        if (!warehouseRepository.existsById(id)) {
            throw new RuntimeException("Warehouse not found with id: " + id);
        }
        warehouseRepository.deleteById(id);
    }
}