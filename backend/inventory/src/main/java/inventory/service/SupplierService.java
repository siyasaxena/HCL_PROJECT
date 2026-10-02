package inventory.service;

import inventory.model.Supplier;
import inventory.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierService {

    private final SupplierRepository supplierRepository;

    @Autowired
    public SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    // Retrieve all suppliers
    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    // Retrieve a single supplier by ID
    public Optional<Supplier> getSupplierById(Long id) {
        return supplierRepository.findById(id);
    }

    // Save a new supplier
    public Supplier saveSupplier(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    // Update an existing supplier
    public Supplier updateSupplier(Long id, Supplier supplierDetails) {
        return supplierRepository.findById(id).map(existingSupplier -> {
            existingSupplier.setName(supplierDetails.getName());
            existingSupplier.setContactPerson(supplierDetails.getContactPerson());
            existingSupplier.setEmail(supplierDetails.getEmail());
            existingSupplier.setPhone(supplierDetails.getPhone());
            existingSupplier.setAddress(supplierDetails.getAddress());
            return supplierRepository.save(existingSupplier);
        }).orElseThrow(() -> new RuntimeException("Supplier not found with id: " + id));
    }

    // Delete a supplier by ID
    public void deleteSupplier(Long id) {
        if (!supplierRepository.existsById(id)) {
            throw new RuntimeException("Supplier not found with id: " + id);
        }
        supplierRepository.deleteById(id);
    }
}