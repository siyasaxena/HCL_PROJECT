package inventory.model;

import jakarta.persistence.*;

@Entity
@Table(name = "inventory_stock")
public class InventoryStock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sku;
    private String productName;
    private String warehouseCode;
    private Integer quantity;
    private Integer reservedQuantity;

    public InventoryStock() {}

    public InventoryStock(String sku, String productName, String warehouseCode, Integer quantity, Integer reservedQuantity) {
        this.sku = sku;
        this.productName = productName;
        this.warehouseCode = warehouseCode;
        this.quantity = quantity;
        this.reservedQuantity = reservedQuantity;
    }

    public Integer getAvailableQuantity() {
        return (quantity != null ? quantity : 0) - (reservedQuantity != null ? reservedQuantity : 0);
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getWarehouseCode() { return warehouseCode; }
    public void setWarehouseCode(String warehouseCode) { this.warehouseCode = warehouseCode; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Integer getReservedQuantity() { return reservedQuantity; }
    public void setReservedQuantity(Integer reservedQuantity) { this.reservedQuantity = reservedQuantity; }
}