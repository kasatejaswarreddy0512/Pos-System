package com.ktsr.controller;

import com.ktsr.domain.UserRole;
import com.ktsr.entity.User;
import com.ktsr.payload.DTO.UserDto;
import com.ktsr.payload.response.ApiResponse;
import com.ktsr.service.EmployeeService;
import com.ktsr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
public class EmployeeController {

    private  final EmployeeService employeeService;
    private final UserService userService;

    @PostMapping("/store/{storeId}")
    public ResponseEntity<UserDto> createStoreEmployee(@PathVariable Long storeId, @RequestBody UserDto userDto){
        UserDto employee=employeeService.createStoreEmployee(userDto,storeId);
        return new ResponseEntity<>(employee, HttpStatus.CREATED);
    }

    @PostMapping("/branch/{branchId}")
    public ResponseEntity<UserDto> createBranchEmployee(@PathVariable Long branchId, @RequestBody UserDto userDto){
        UserDto employee=employeeService.createBranchEmployee(userDto,branchId);
        return new ResponseEntity<>(employee, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateEmployee(@PathVariable Long id, @RequestBody UserDto userDto){
        User employee=employeeService.updateEmployee(id,userDto);
        return new ResponseEntity<>(employee, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteEmployee(@PathVariable Long id){
        employeeService.deleteEmployee(id);
        ApiResponse apiResponse= new ApiResponse();
        apiResponse.setMessage("Employee Deleted Successfully...!");
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<UserDto>> getStoreEmployees(@PathVariable Long storeId,
                                                        @RequestParam(required = false)UserRole role){
        List<UserDto> employee= employeeService.getStoreEmployees(storeId,role);
        return ResponseEntity.ok(employee);
    }

    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<UserDto>> getBranchEmployees(@PathVariable Long branchId,
                                                        @RequestParam(required = false)UserRole role){
        List<UserDto> employee= employeeService.getBranchEmployees(branchId,role);
        return ResponseEntity.ok(employee);
    }


}
