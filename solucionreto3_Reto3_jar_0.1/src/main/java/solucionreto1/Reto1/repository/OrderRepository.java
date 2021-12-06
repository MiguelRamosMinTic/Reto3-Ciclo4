package solucionreto1.Reto1.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import solucionreto1.Reto1.model.Order;
import solucionreto1.Reto1.repository.crud.OrderCrudRepository;


/**
 *
 * @author Miguel Ramos
 */

@Repository
public class OrderRepository {
    
    @Autowired
    private OrderCrudRepository repository;

    public List<Order> getAll() {
        return repository.findAll();
    }

    public Order save(Order o) {
        return repository.save(o);
    }

    public Optional<Order> getOrderById(Integer id){
        return repository.findById(id);
    }
    
    /**
     * 
     * @param id
     */
    public void deleteById (Integer id){
        repository.deleteById(id);
    }
    
    /**
     * 
     * @param zona
     * @return
     */
    public List<Order> getOrderByZone(String zona){
        return repository.findByZone(zona);
    }
    
    public List<Order> getOrderByStatus(String status){
        return repository.findByStatus(status);
    }
    
    public List<Order> getOrderByQuantities(String quantities){
        return repository.findByStatus(quantities);
    }

}
