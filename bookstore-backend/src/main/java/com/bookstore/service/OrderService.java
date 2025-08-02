package com.bookstore.service;

import com.bookstore.model.Order;
import com.bookstore.model.OrderItem;
import com.bookstore.model.CartItem;
import com.bookstore.repository.CartItemRepository;
import com.bookstore.repository.OrderRepository;
import com.bookstore.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;
@Transactional
public Order placeOrder(Long userId, double totalAmount) {
    List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
    if (cartItems.isEmpty()) {
        throw new RuntimeException("Cart is empty");
    }

    Order order = new Order();
    order.setUserId(userId);
    order.setTotalAmount(BigDecimal.valueOf(totalAmount));
    order.setOrderDate(LocalDateTime.now());

    orderRepository.save(order); // Save so ID is generated

    for (CartItem cartItem : cartItems) {
        OrderItem orderItem = new OrderItem();
        orderItem.setBook(cartItem.getBook());
        orderItem.setQuantity(cartItem.getQuantity());
        orderItem.setUserId(userId);
        orderItem.setOrder(order);
        orderItemRepository.save(orderItem);
    }

    cartItemRepository.deleteByUserId(userId);

    // 🔹 Reload with items and books
    return orderRepository.findWithItemsAndBooksByUserId(userId)
            .stream()
            .filter(o -> o.getId().equals(order.getId()))
            .findFirst()
            .orElse(order);
}



    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findWithItemsAndBooksByUserId(userId);
    }
}
