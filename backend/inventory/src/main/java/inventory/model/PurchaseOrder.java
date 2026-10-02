package inventory.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "purchase_orders")
public class PurchaseOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String poNumber;

    private String supplierName;
    private LocalDate expectedDate;
    private String status; // DRAFT, SUBMITTED, RECEIVED, CANCELLED

    public PurchaseOrder() {}

    public PurchaseOrder(String poNumber, String supplierName, LocalDate expectedDate, String status) {
        this.poNumber = poNumber;
        this.supplierName = supplierName;
        this.expectedDate = expectedDate;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPoNumber() { return poNumber; }
    public void setPoNumber(String poNumber) { this.poNumber = poNumber; }

    public String getSupplierName() { return supplierName; }
    public void setSupplierName(String supplierName) { this.supplierName = supplierName; }

    public LocalDate getExpectedDate() { return expectedDate; }
    public void setExpectedDate(LocalDate expectedDate) { this.expectedDate = expectedDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}