package com.ktsr.service;

import com.ktsr.entity.ShiftReport;
import com.ktsr.exceptions.UserException;
import com.ktsr.payload.DTO.ShiftReportDto;

import java.time.LocalDateTime;
import java.util.List;

public interface ShiftReportService {

    ShiftReportDto startShift() throws UserException;

    ShiftReportDto endShift() throws UserException;

    ShiftReportDto getShiftReportById(Long id);

    List<ShiftReportDto> getAllShiftReports();

    List<ShiftReportDto> getShiftReportByBranchId(Long branchId);

    List<ShiftReportDto> getShiftReportByCashierId(Long cashierId);

    ShiftReportDto getCurrentShiftProgress(Long cashierId) throws UserException;

    ShiftReportDto getShiftByCashierAndDate(Long cashierId, LocalDateTime date);


}
