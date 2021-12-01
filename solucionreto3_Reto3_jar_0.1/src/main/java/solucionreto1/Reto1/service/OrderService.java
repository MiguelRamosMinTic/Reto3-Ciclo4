package solucionreto1.Reto1.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import solucionreto1.Reto1.model.Clone;
import solucionreto1.Reto1.model.Order;
import solucionreto1.Reto1.repository.CloneRepository;
import solucionreto1.Reto1.repository.OrderRepository;

/**
 *
 * @author Miguel Ramos
 */

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository repository;

    public List<Order> getAll() {
        return repository.getAll();
    }

    public Optional<Order> getOrderById(int id) {
        return repository.getOrderById(id);
    }
    
    public Order save(Order o) {
        if(c.getBrand() == null || c.getProcesor() == null ||
        c.getOs() == null || c.getDescription() == null ||
        c.getMemory() == null || c.getHardDrive() == null || 
        c.getPhotography() == null){
            return c;
        }else{
            Optional<Clone> cloneExists = repository.getCloneById(c.getId());
            if(cloneExists.isEmpty()){
                return repository.save(o);
            }else{
                return o;
            }
        }
    }

    /**
     *
     * @param Actualizar
     * @return
     */
    public Order update(Order o) {
        if (o.getId() != null) {
            Optional<Order> orderExist = repository.getOrderById(o.getId());
            if (orderExist.isPresent()) {
                if (c.getBrand()!= null) {
                    cloneExist.get().setBrand(c.getBrand());
                }
                if (c.getProcesor()!= null) {
                    cloneExist.get().setProcesor(c.getProcesor());
                }
                if (c.getOs()!= null) {
                    cloneExist.get().setOs(c.getOs());
                }
                if (c.getDescription()!= null) {
                    cloneExist.get().setDescription(c.getDescription());
                }
                if (c.getMemory()!= null) {
                    cloneExist.get().setMemory(c.getMemory());
                }
                if (c.getHardDrive()!= null) {
                    cloneExist.get().setHardDrive(c.getHardDrive());
                }
                if (c.getPrice()!= 0.0) {
                    cloneExist.get().setPrice(c.getPrice());
                }
                if (c.getQuantity()!= 0) {
                    cloneExist.get().setQuantity(c.getQuantity());
                }
                if (c.getPhotography()!= null) {
                    cloneExist.get().setPhotography(c.getPhotography());
                }
                return repository.save(orderExist.get());
            } else {
                return o;
            }
        } else {
            return o;
        }
    }

    public boolean deleteById(Integer id) {
        boolean aBoolean = repository.getOrderById(id).map(order -> {
            repository.deleteById(id);
            return true;
        }).orElse(false);
        return false;
    }
    
}
