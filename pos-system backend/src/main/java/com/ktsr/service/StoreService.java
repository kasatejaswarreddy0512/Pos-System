package com.ktsr.service;

import com.ktsr.domain.StoreStatus;
import com.ktsr.entity.Store;
import com.ktsr.entity.User;
import com.ktsr.exceptions.UserException;
import com.ktsr.payload.DTO.StoreDto;
import com.ktsr.payload.DTO.UserDto;

import java.util.List;

public interface StoreService {

    StoreDto createStore(StoreDto storeDto, User user);
    StoreDto getStoreById(Long id);
    List<StoreDto> getAllStores();
    Store getStoreByAdmin() throws UserException;
    StoreDto updateStore(Long id, StoreDto storeDto) throws UserException;
    void deleteStore(Long id) throws UserException;
    StoreDto getStoreByEmployee() throws UserException;

    StoreDto moderateStore(Long id, StoreStatus storeStatus);


}
