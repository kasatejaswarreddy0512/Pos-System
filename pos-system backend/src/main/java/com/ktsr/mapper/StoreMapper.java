package com.ktsr.mapper;

import com.ktsr.domain.StoreStatus;
import com.ktsr.entity.Store;
import com.ktsr.entity.User;
import com.ktsr.payload.DTO.StoreDto;

public class StoreMapper {

    public static StoreDto toDto(Store store){
        StoreDto storeDto= new StoreDto();
        storeDto.setId(store.getId());
        storeDto.setBrand(store.getBrand());
        storeDto.setDescription(store.getDescription());
        storeDto.setStoreAdmin(UserMapper.toDto(store.getStoreAdmin()));
        storeDto.setStoreType(store.getStoreType());
        storeDto.setContact(store.getContact());
        storeDto.setCreatedAt(store.getCreatedAt());
        storeDto.setUpdatedAt(store.getUpdatedAt());
        storeDto.setStatus(store.getStatus());

        return storeDto;
    }

    public static Store toEntity(StoreDto storeDto, User storeAmin){
        Store store= new Store();
        store.setId(storeDto.getId());
        store.setBrand(storeDto.getBrand());
        store.setDescription(storeDto.getDescription());
        store.setStoreAdmin(storeAmin);
        store.setStoreType(storeDto.getStoreType());
        store.setContact(storeDto.getContact());
        store.setCreatedAt(storeDto.getCreatedAt());
        store.setUpdatedAt(storeDto.getUpdatedAt());
        store.setStatus(StoreStatus.ACTIVE);

        return store;
    }
}
