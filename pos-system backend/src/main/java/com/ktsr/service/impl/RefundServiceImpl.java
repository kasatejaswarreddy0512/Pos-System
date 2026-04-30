package com.ktsr.service.impl;

import com.ktsr.entity.Branch;
import com.ktsr.entity.Order;
import com.ktsr.entity.Refund;
import com.ktsr.entity.User;
import com.ktsr.exceptions.UserException;
import com.ktsr.mapper.RefundMapper;
import com.ktsr.payload.DTO.RefundDto;
import com.ktsr.repository.OrderRepository;
import com.ktsr.repository.RefundRepository;
import com.ktsr.service.RefundService;
import com.ktsr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RefundServiceImpl implements RefundService {

    private final RefundRepository refundRepository;
    private final UserService userService;
    private final OrderRepository orderRepository;

    @Override
    public RefundDto createRefund(RefundDto refundDto) throws UserException {
        User cashier= userService.getCurrentUser();

        Order order= orderRepository.findById(refundDto.getOrderId())
                .orElseThrow(()->new RuntimeException("Order Not Found"));

        Branch branch= cashier.getBranch();

        Refund createdRefund = Refund.builder()
                .order(order)
                .cashier(cashier)
                .branch(branch)
                .reason(refundDto.getReason())
                .amount(refundDto.getAmount())
                .createdAt(refundDto.getCreatedAt())
                .build();

        Refund savedRefund= refundRepository.save(createdRefund);

        return RefundMapper.toDto(savedRefund);
    }

    @Override
    public List<RefundDto> getAllRefunds() {
        return refundRepository.findAll().stream()
                .map(RefundMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<RefundDto> getRefundByCashier(Long cashierId) {
        return refundRepository.findByCashierId(cashierId).stream()
                .map(RefundMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<RefundDto> getRefundByShiftReport(Long shiftReportId) {
        return refundRepository.findByShiftReportId(shiftReportId).stream()
                .map(RefundMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<RefundDto> getRefundByCashierAndDateRange(Long cashierId, LocalDateTime startDate, LocalDateTime endDate) {
        return refundRepository.findByCashierIdAndCreatedAtBetween(cashierId,startDate,endDate).stream()
                .map(RefundMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<RefundDto> getRefundByBranch(Long branchId) {
        return refundRepository.findByBranchId(branchId).stream()
                .map(RefundMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public RefundDto getRefundById(Long id) {
        return refundRepository.findById(id).map(RefundMapper::toDto)
                .orElseThrow(()-> new RuntimeException("Refund Not Found...!"));
    }

    @Override
    public void deleteRefund(Long id) {
        Refund refund=refundRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Refund Not Found...!"));
        refundRepository.delete(refund);
    }
}
