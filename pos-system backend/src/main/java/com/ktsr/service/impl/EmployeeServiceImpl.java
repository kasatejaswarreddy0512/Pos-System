package com.ktsr.service.impl;

import com.ktsr.domain.UserRole;
import com.ktsr.entity.Branch;
import com.ktsr.entity.Store;
import com.ktsr.entity.User;
import com.ktsr.exceptions.UserException;
import com.ktsr.mapper.UserMapper;
import com.ktsr.payload.DTO.UserDto;
import com.ktsr.repository.BranchRepository;
import com.ktsr.repository.StoreRepository;
import com.ktsr.repository.UserRepository;
import com.ktsr.service.EmployeeService;
import com.ktsr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final UserRepository userRepository;
    private final StoreRepository storeRepository;
    private final BranchRepository branchRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    @Override
    public UserDto createStoreEmployee(UserDto employee, Long storeId) {
        Store store= storeRepository.findById(storeId).orElseThrow(
                ()-> new RuntimeException("Store Not Found...!"));

        Branch branch=null;

        if(employee.getRole()==UserRole.ROLE_BRANCH_MANAGER){
            if(employee.getBranchId()==null){
                throw new RuntimeException("Branch Id is Required to create Branch Manager");
            }
            branch=branchRepository.findById(employee.getBranchId()).orElseThrow(
                    ()->new RuntimeException("branch Not Found...!"));
        }
        User  user= UserMapper.toEntity(employee);
        user.setStore(store);
        user.setBranch(branch);
        user.setPassword(passwordEncoder.encode(employee.getPassword()));

        User savedEmployee= userRepository.save(user);

        if(employee.getRole() == UserRole.ROLE_BRANCH_MANAGER && branch!=null){
            branch.setManager(savedEmployee);
            branchRepository.save(branch);
        }

        return UserMapper.toDto(savedEmployee);
    }

    @Override
    public UserDto createBranchEmployee(UserDto employee, Long branchId) {

        Branch branch=branchRepository.findById(branchId).orElseThrow(
                ()->new RuntimeException("Branch Not Found...!"));

        if(employee.getRole()==UserRole.ROLE_BRANCH_CASHIER || employee.getRole()==UserRole.ROLE_BRANCH_MANAGER){
            User user=UserMapper.toEntity(employee);
            user.setStore(branch.getStore());
            user.setBranch(branch);
            user.setPassword(passwordEncoder.encode(employee.getPassword()));
            return UserMapper.toDto(userRepository.save(user));

        }
        throw  new RuntimeException("Branch Role Not Supported..!");
    }

    @Override
    public List<UserDto> getMyStoreEmployees(UserRole role) throws UserException {
        Store store = getCurrentUserStore();

        return userRepository.findByStore(store)
                .stream()
                .filter(user -> role == null || user.getRole() == role)
                .map(UserMapper::toDto)
                .collect(Collectors.toList());
    }

    private Store getCurrentUserStore() throws UserException {
        User currentUser = userService.getCurrentUser();

        Store store = currentUser.getStore();

        if (store == null) {
            store = storeRepository.findByStoreAdminId(currentUser.getId());
        }

        if (store == null) {
            throw new RuntimeException("Store not found for current Store Admin");
        }

        return store;
    }

    @Override
    public User updateEmployee(Long employeeId, UserDto employeeDetails) {
        User existingEmployee= userRepository.findById(employeeId).orElseThrow(
                ()-> new RuntimeException("Employee nit exist with id...!" + employeeId));

        Branch branch=branchRepository.findById(employeeDetails.getBranchId()).orElseThrow(
                ()->new RuntimeException("Branch Not Found...!"));

        existingEmployee.setEmail(employeeDetails.getEmail());
        existingEmployee.setFullName(employeeDetails.getFullName());
        existingEmployee.setPassword(employeeDetails.getPassword());
        existingEmployee.setRole(employeeDetails.getRole());
        existingEmployee.setBranch(branch);

        return userRepository.save(existingEmployee);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        User employee= userRepository.findById(employeeId).orElseThrow(
                ()-> new RuntimeException("Employee nit exist with id...!" + employeeId));
        userRepository.delete(employee);
    }

    @Override
    public List<UserDto> getStoreEmployees(Long storeId, UserRole role) {

        Store store= storeRepository.findById(storeId).orElseThrow(
                ()-> new RuntimeException("Store Not Found...!"));


        return userRepository.findByStore(store)
                .stream().filter(
                user -> role==null || user.getRole()==role)
                .map(UserMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserDto> getBranchEmployees(Long branchId, UserRole role) {

        Branch branch=branchRepository.findById(branchId).orElseThrow(
                ()->new RuntimeException("Branch Not Found...!"));

        return userRepository.findByBranchId(branchId)
                .stream().filter(
                        user ->role==null || user.getRole()==role)
                .map(UserMapper::toDto)
                .collect(Collectors.toList());
    }
}
