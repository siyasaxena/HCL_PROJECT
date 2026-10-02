package inventory.service;

import inventory.model.PurchaseOrder;
import inventory.model.Supplier;
import inventory.repository.PurchaseOrderRepository;
import inventory.repository.SupplierRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcurementService {

    private final SupplierRepository supplierRepository;
    private final PurchaseOrderRepository poRepository;

    public ProcurementService(SupplierRepository supplierRepository, PurchaseOrderRepository poRepository) {
        this.supplierRepository = supplierRepository;
        this.poRepository = poRepository;
    }

    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    public Supplier createSupplier(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    public List<PurchaseOrder> getAllPurchaseOrders() {
        return poRepository.findAll();
    }

    public PurchaseOrder createPurchaseOrder(PurchaseOrder po) {
        if (po.getPoNumber() == null || po.getPoNumber().isEmpty()) {
            po.setPoNumber("PO-" + (System.currentTimeMillis() % 100000));
        }
        po.setStatus("SUBMITTED");
        return poRepository.save(po);
    }

    public PurchaseOrder receivePurchaseOrder(Long id) {
        PurchaseOrder po = poRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase Order not found with ID: " + id));
        po.setStatus("RECEIVED");
        return poRepository.save(po);
    }
}