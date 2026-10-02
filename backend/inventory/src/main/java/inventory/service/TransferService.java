package inventory.service;

import inventory.model.TransferOrder;
import inventory.repository.TransferOrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransferService {

    private final TransferOrderRepository transferRepository;

    public TransferService(TransferOrderRepository transferRepository) {
        this.transferRepository = transferRepository;
    }

    public List<TransferOrder> getAllTransfers() {
        return transferRepository.findAll();
    }

    public TransferOrder createTransfer(TransferOrder transfer) {
        if (transfer.getTransferNumber() == null || transfer.getTransferNumber().isEmpty()) {
            transfer.setTransferNumber("TR-" + (System.currentTimeMillis() % 10000));
        }
        transfer.setStatus("DRAFT");
        return transferRepository.save(transfer);
    }

    public TransferOrder updateStatus(Long id, String status) {
        TransferOrder transfer = transferRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transfer order not found with ID: " + id));
        transfer.setStatus(status);
        return transferRepository.save(transfer);
    }
}