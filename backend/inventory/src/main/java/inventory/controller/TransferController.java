package inventory.controller;

import inventory.model.TransferOrder;
import inventory.service.TransferService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transfers")
@CrossOrigin(origins = "*")
public class TransferController {

    private final TransferService transferService;

    public TransferController(TransferService transferService) {
        this.transferService = transferService;
    }

    @GetMapping
    public ResponseEntity<List<TransferOrder>> getTransfers() {
        return ResponseEntity.ok(transferService.getAllTransfers());
    }

    @PostMapping
    public ResponseEntity<TransferOrder> createTransfer(@RequestBody TransferOrder transfer) {
        return ResponseEntity.ok(transferService.createTransfer(transfer));
    }

    @PostMapping("/{id}/dispatch")
    public ResponseEntity<TransferOrder> dispatchTransfer(@PathVariable Long id) {
        return ResponseEntity.ok(transferService.updateStatus(id, "DISPATCHED"));
    }

    @PostMapping("/{id}/receive")
    public ResponseEntity<TransferOrder> receiveTransfer(@PathVariable Long id) {
        return ResponseEntity.ok(transferService.updateStatus(id, "RECEIVED"));
    }
}