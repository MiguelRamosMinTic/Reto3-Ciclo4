package solucionreto1.Reto1.repository.crud;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import solucionreto1.Reto1.model.Order;

/**
 *
 * @author Miguel Ramos
 */
public interface OrderCrudRepository extends MongoRepository<Order, Integer>{
    
    @Query("{'salesMan.zone':?0}")
    public List<Order> findByZone(String country);
    
    public List<Order> findByStatus(String status);
    
    public List<Order> findByQuantities(String quantities);
}
