package com.ktsr.controller;

import com.ktsr.exceptions.UserException;
import com.ktsr.payload.DTO.ShiftReportDto;
import com.ktsr.service.ShiftReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/shift-report")
public class ShiftReportController {

    private  final ShiftReportService shiftReportService;

    @PostMapping("/start")
    public ResponseEntity<ShiftReportDto> startShift() throws UserException {
        return ResponseEntity.ok(shiftReportService.startShift());
    }

    @PatchMapping("/end")
    public ResponseEntity<ShiftReportDto> endShift() throws UserException {
        return ResponseEntity.ok(shiftReportService.endShift());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShiftReportDto> getShiftReportById(@PathVariable Long id){
        return ResponseEntity.ok(shiftReportService.getShiftReportById(id));
    }

    @GetMapping
    public ResponseEntity<List<ShiftReportDto>> getAllShiftReport(){
        return ResponseEntity.ok(shiftReportService.getAllShiftReports());
    }

    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<ShiftReportDto>> getShiftReportByBranchId(@PathVariable Long branchId){
        return ResponseEntity.ok(shiftReportService.getShiftReportByBranchId(branchId));
    }

    @GetMapping("/cashier/{cashierId}")
    public ResponseEntity<List<ShiftReportDto>> getShiftReportByCashierId(@PathVariable Long cashierId){
        return ResponseEntity.ok(shiftReportService.getShiftReportByCashierId(cashierId));
    }

    @GetMapping("/current")
    public ResponseEntity<ShiftReportDto> getCurrentShiftProgress() throws UserException {
        return ResponseEntity.ok(shiftReportService.getCurrentShiftProgress(null));
    }

    @GetMapping("/cashier/{cashierId}/by-date")
    public ResponseEntity<ShiftReportDto> getShiftByCashierAndDate(@PathVariable Long cashierId,
                                                                   @RequestParam @DateTimeFormat
                                                                           (iso=DateTimeFormat.ISO.DATE)LocalDateTime date){
        return ResponseEntity.ok(shiftReportService.getShiftByCashierAndDate(cashierId,date));
    }


}
