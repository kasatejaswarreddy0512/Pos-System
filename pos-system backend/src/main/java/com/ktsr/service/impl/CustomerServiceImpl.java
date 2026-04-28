package com.ktsr.service.impl;

import com.ktsr.entity.Customer;
import com.ktsr.repository.CustomerRepository;
import com.ktsr.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    @Override
    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public Customer updateCustomer(Long id, Customer customer) {
        Customer updateCustomer=customerRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("Customer Not Found..!"));
        updateCustomer.setFullName(customer.getFullName());
        updateCustomer.setEmail(customer.getEmail());
        updateCustomer.setPhone(customer.getPhone());
        updateCustomer.setUpdatedAt(LocalDateTime.now());
        return customerRepository.save(updateCustomer);
    }

    @Override
    public void deleteCustomer(Long id) {
        Customer customer=customerRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("Customer Not Found..!"));
        customerRepository.delete(customer);
    }

    @Override
    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("Customer Not Found..!"));
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public List<Customer> searchCustomer(String keyword) {
        return customerRepository.findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(keyword, keyword);
    }
}
