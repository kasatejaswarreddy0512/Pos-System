package com.ktsr.service;


import com.ktsr.domain.UserRole;
import com.ktsr.entity.User;
import com.ktsr.exceptions.UserException;
import com.ktsr.payload.DTO.UserDto;

import java.util.List;

public interface EmployeeService {

    UserDto createStoreEmployee(UserDto employee, Long storeId);

    UserDto createBranchEmployee(UserDto employee, Long branchId);

    User updateEmployee(Long employeeId, UserDto employeeDetails);

    void deleteEmployee(Long employeeId);

    List<UserDto> getStoreEmployees(Long storeId, UserRole role);

    List<UserDto> getMyStoreEmployees(UserRole role) throws UserException;

    List<UserDto> getBranchEmployees(Long branchId, UserRole role);

}
