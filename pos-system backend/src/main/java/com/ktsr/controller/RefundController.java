package com.ktsr.controller;

import com.ktsr.exceptions.UserException;
import com.ktsr.payload.DTO.RefundDto;
import com.ktsr.payload.response.ApiResponse;
import com.ktsr.service.RefundService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/refund")
public class RefundController {

    private  final RefundService refundService;

    @PostMapping
    public ResponseEntity<RefundDto> createRefund(@RequestBody RefundDto refundDto) throws UserException {
        return new ResponseEntity<>(refundService.createRefund(refundDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<RefundDto>> getAllRefunds(){
        return ResponseEntity.ok(refundService.getAllRefunds());
    }

    @GetMapping("/cashier/{cashierId}")
    public ResponseEntity<List<RefundDto>> getRefundsCashier(@PathVariable Long cashierId){
        return ResponseEntity.ok(refundService.getRefundByCashier(cashierId));
    }

    @GetMapping("/shift/{shiftReportId}")
    public ResponseEntity<List<RefundDto>> getRefundByShiftReport(@PathVariable Long shiftReportId){
        return ResponseEntity.ok(refundService.getRefundByShiftReport(shiftReportId));
    }

    @GetMapping("/cashier/{cashierId}/range")
    public ResponseEntity<List<RefundDto>> getRefundByCashierAndDateRange(@PathVariable Long cashierId,
                                                                          @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
                                                                          @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate){
        return ResponseEntity.ok(refundService.getRefundByCashierAndDateRange(cashierId,startDate,endDate));
    }


    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<RefundDto>> getRefundByBranch(@PathVariable Long branchId){
        return ResponseEntity.ok(refundService.getRefundByBranch(branchId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RefundDto> getRefundById(@PathVariable Long id){
        return ResponseEntity.ok(refundService.getRefundById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteRefund(@PathVariable Long id){
        refundService.deleteRefund(id);
        ApiResponse apiResponse= new ApiResponse();
        apiResponse.setMessage("Refund Deleted Successfully...!");
        return ResponseEntity.ok(apiResponse);
    }


}
