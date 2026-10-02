package inventory.service; // Ensure this matches your project structure

import inventory.model.Product; // Replace with your actual Product Entity class
import inventory.repository.ProductRepository; // Replace with your actual Product Repository interface
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // 1. Create / Save a new product
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    // 2. Fetch all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 3. Fetch product by ID
    public List<Product> getProductsByUserId(Long userId) {
    return productRepository.findByUserId(userId);
}
public Optional<Product> getProductById(Long id) {
    return productRepository.findById(id);
}

    // 4. Update product details
    public Product updateProduct(Long id, Product updatedProduct) {
        return productRepository.findById(id).map(existingProduct -> {
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setCategory(updatedProduct.getCategory());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setQuantity(updatedProduct.getQuantity());
            
            // Add any additional fields here if your entity has them (e.g., sku, description)
            return productRepository.save(existingProduct);
        }).orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    // 5. Delete product by ID
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    // 6. Custom Business Logic: Update stock level
    public Product updateStock(Long id, int quantityChange) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        int newQuantity = product.getQuantity() + quantityChange;
        if (newQuantity < 0) {
            throw new IllegalArgumentException("Insufficient stock available!");
        }

        product.setQuantity(newQuantity);
        return productRepository.save(product);
    }
}