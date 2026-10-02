package inventory.model;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private double price;
    private int quantity;
    private Long userId; // Added to resolve repository property lookup

    public Product() {}

    public Product(String name, String category, double price, int quantity, Long userId) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
        this.userId = userId;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}