package com.ktsr.controller;

import com.ktsr.domain.StoreStatus;
import com.ktsr.entity.Store;
import com.ktsr.entity.User;
import com.ktsr.exceptions.UserException;
import com.ktsr.mapper.StoreMapper;
import com.ktsr.payload.DTO.StoreDto;
import com.ktsr.payload.response.ApiResponse;
import com.ktsr.service.StoreService;
import com.ktsr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/store")
public class StoreController {

    private final StoreService storeService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<StoreDto> createStore(@RequestBody StoreDto storeDto,
                                                @RequestHeader("Authorization") String jwt) throws UserException {
        User user= userService.getUserFromJwtToken(jwt);
        return new ResponseEntity<>(storeService.createStore(storeDto,user), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StoreDto> getStoreById(@PathVariable Long id,
                                                 @RequestHeader("Authorization") String jwt) throws UserException {

        return ResponseEntity.ok(storeService.getStoreById(id));
    }

    @GetMapping
    public ResponseEntity<List<StoreDto>> getAllStore(@RequestHeader("Authorization") String jwt) throws UserException {
        return ResponseEntity.ok(storeService.getAllStores());
    }

    @GetMapping("/admin")
    public ResponseEntity<StoreDto> getStoreByAdmin(@RequestHeader("Authorization") String jwt) throws UserException {

        return ResponseEntity.ok(StoreMapper.toDto(storeService.getStoreByAdmin()));
    }

    @GetMapping("/employee")
    public ResponseEntity<StoreDto> getStoreByEmployee(@RequestHeader("Authorization") String jwt) throws UserException {

        return ResponseEntity.ok(storeService.getStoreByEmployee());
    }


    @PutMapping("/{id}")
    public ResponseEntity<StoreDto> updateStore(@PathVariable Long id, @RequestBody StoreDto storeDto) throws UserException {

        return ResponseEntity.ok(storeService.updateStore(id, storeDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteStore(@PathVariable Long id) throws UserException {

        storeService.deleteStore(id);
        ApiResponse apiResponse=new ApiResponse();
        apiResponse.setMessage("Store Deleted Successfully.....!");
        return ResponseEntity.ok(apiResponse);
    }


    @PutMapping("/{id}/moderate")
    public ResponseEntity<StoreDto> moderateStore(@PathVariable Long id,
                                                  @RequestParam StoreStatus storeStatus) throws UserException {

        return ResponseEntity.ok(storeService.moderateStore(id, storeStatus));
    }



}
