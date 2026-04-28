package com.ktsr.controller;

import com.ktsr.entity.Customer;
import com.ktsr.payload.response.ApiResponse;
import com.ktsr.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customer")
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer){
        return new ResponseEntity<>(customerService.createCustomer(customer), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id,@RequestBody Customer customer){
        return ResponseEntity.ok(customerService.updateCustomer(id,customer));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id){
        return ResponseEntity.ok(customerService.getCustomerById(id));
    }
    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomer(){
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCustomer(@PathVariable Long id){
        customerService.deleteCustomer(id);
        ApiResponse apiResponse= new ApiResponse();
        apiResponse.setMessage("Customer Deleted Successfully...!");
        return ResponseEntity.ok(apiResponse);
    }


    @GetMapping("/search")
    public ResponseEntity<List<Customer>> searchCustomer(@RequestParam String q){
        return ResponseEntity.ok(customerService.searchCustomer(q));
    }



}
