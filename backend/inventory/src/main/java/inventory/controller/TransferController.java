package inventory.controller;

import inventory.model.TransferOrder;
import inventory.service.TransferService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transfers")
@CrossOrigin(origins = "http://localhost:4200")
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
    public ResponseEntity<Void> createTransfer(@RequestBody TransferOrder transfer) {
        try {
            transferService.createTransfer(transfer);
            return ResponseEntity.ok().build(); // Returns 200 OK without JSON serialization loops
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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