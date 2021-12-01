/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package solucionreto1.Reto1.repository.crud;

import org.springframework.data.mongodb.repository.MongoRepository;
import solucionreto1.Reto1.model.Order;

/**
 *
 * @author Administrador
 */
public interface OrderCrudRepository extends MongoRepository<Order, Integer>{
    
}
