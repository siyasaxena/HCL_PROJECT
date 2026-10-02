package inventory.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "transfer_orders")
public class TransferOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String transferNumber;

    private String sourceWarehouse;
    private String targetWarehouse;
    private Integer itemCount;
    private String status; // DRAFT, DISPATCHED, RECEIVED

    private LocalDateTime createdAt;

    public TransferOrder() {
        this.createdAt = LocalDateTime.now();
    }

    public TransferOrder(String transferNumber, String sourceWarehouse, String targetWarehouse, Integer itemCount, String status) {
        this.transferNumber = transferNumber;
        this.sourceWarehouse = sourceWarehouse;
        this.targetWarehouse = targetWarehouse;
        this.itemCount = itemCount;
        this.status = status;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTransferNumber() { return transferNumber; }
    public void setTransferNumber(String transferNumber) { this.transferNumber = transferNumber; }

    public String getSourceWarehouse() { return sourceWarehouse; }
    public void setSourceWarehouse(String sourceWarehouse) { this.sourceWarehouse = sourceWarehouse; }

    public String getTargetWarehouse() { return targetWarehouse; }
    public void setTargetWarehouse(String targetWarehouse) { this.targetWarehouse = targetWarehouse; }

    public Integer getItemCount() { return itemCount; }
    public void setItemCount(Integer itemCount) { this.itemCount = itemCount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}