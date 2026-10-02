package inventory.repository;

import inventory.model.TransferOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferOrderRepository extends JpaRepository<TransferOrder, Long> {
}