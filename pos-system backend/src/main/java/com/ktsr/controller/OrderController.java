package com.ktsr.controller;

import com.ktsr.domain.OrderStatus;
import com.ktsr.domain.PaymentType;
import com.ktsr.exceptions.UserException;
import com.ktsr.payload.DTO.OrderDto;
import com.ktsr.payload.response.ApiResponse;
import com.ktsr.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/order")
public class OrderController {

    private  final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@RequestBody OrderDto orderDto) throws UserException {
        return new ResponseEntity<>(orderService.createOrder(orderDto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id){
        return ResponseEntity.ok(orderService.getOrderById(id));
    }


    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<OrderDto>> getOrderByBranch(@PathVariable Long branchId,
                                                           @RequestParam(required = false) Long customerId,
                                                           @RequestParam(required = false) Long cashierId,
                                                           @RequestParam(required = false)PaymentType paymentType,
                                                           @RequestParam(required = false)OrderStatus status
                                                           ){
        return ResponseEntity.ok(orderService.getOrderByBranch(branchId,
                customerId,cashierId,paymentType, status));
    }

    @GetMapping("/cashier/{cashierId}")
    public ResponseEntity<List<OrderDto>> getOrderByCashier(@PathVariable Long cashierId){
        return ResponseEntity.ok(orderService.getOrderByCashier(cashierId));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteOrder(@PathVariable Long id){
        orderService.deleteOrder(id);
        ApiResponse apiResponse= new ApiResponse();
        apiResponse.setMessage("Order Deleted Successfully...!");
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/today/{branchId}")
    public ResponseEntity<List<OrderDto>> getTodayOrderByBranch(@PathVariable Long branchId){
        return ResponseEntity.ok(orderService.getTodayOrdersByBranch(branchId));
    }


    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<OrderDto>> getOrderByCustomerId(@PathVariable Long customerId){
        return ResponseEntity.ok(orderService.getOrdersByCustomerId(customerId));
    }

    @GetMapping("/top5order/{branchId}")
    public ResponseEntity<List<OrderDto>> getTop5RecentOrdersByBranchId(@PathVariable Long branchId){
        return ResponseEntity.ok(orderService.getTop5RecentOrdersByBranchId(branchId));
    }

}
