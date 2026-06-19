package com.ktsr.service.impl;

import com.ktsr.domain.StoreStatus;
import com.ktsr.entity.Store;
import com.ktsr.entity.StoreContact;
import com.ktsr.entity.User;
import com.ktsr.exceptions.UserException;
import com.ktsr.mapper.StoreMapper;
import com.ktsr.payload.DTO.StoreDto;
import com.ktsr.repository.StoreRepository;
import com.ktsr.service.StoreService;
import com.ktsr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreRepository storeRepository;
    private final UserService userService;


    @Override
    public StoreDto createStore(StoreDto storeDto, User user) {

        Store store= StoreMapper.toEntity(storeDto,user);

        return StoreMapper.toDto(storeRepository.save(store));
    }

    @Override
    public StoreDto getStoreById(Long id) {
        Store store= storeRepository.findById(id).orElseThrow(()-> new RuntimeException("Store Not found...!"));
        return StoreMapper.toDto(store);
    }

    @Override
    public List<StoreDto> getAllStores() {
        List<Store> store= storeRepository.findAll();
        return store.stream().map(
                StoreMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public Store getStoreByAdmin() throws UserException {
        User admin= userService.getCurrentUser();
        return storeRepository.findByStoreAdminId(admin.getId());
    }

    @Override
    public StoreDto updateStore(Long id, StoreDto storeDto) throws UserException {

        User currentUser= userService.getCurrentUser();

        Store existing= storeRepository.findByStoreAdminId(currentUser.getId());

        if (existing==null){
            throw  new RuntimeException("Store Not Found...!");
        }

        existing.setBrand(storeDto.getBrand());
        existing.setDescription(storeDto.getDescription());
        if(storeDto.getStoreType()!=null){
            existing.setStoreType(storeDto.getStoreType());
        }
        if(storeDto.getContact()!=null){
            StoreContact storeContact= StoreContact.builder()
                    .address(storeDto.getContact().getAddress())
                    .phone(storeDto.getContact().getPhone())
                    .email(storeDto.getContact().getEmail())
                    .build();
            existing.setContact(storeContact);
        }
        Store store= storeRepository.save(existing);
        return StoreMapper.toDto(store);
    }

    @Override
    public void deleteStore(Long id) throws UserException {
        Store store= getStoreByAdmin();
        storeRepository.delete(store);
    }

    @Override
    public StoreDto getStoreByEmployee() throws UserException {
        User user= userService.getCurrentUser();
        if(user==null){
            throw  new RuntimeException("You don't Have permission to access store..!");
        }
        return StoreMapper.toDto(user.getStore());
    }

    @Override
    public StoreDto moderateStore(Long id, StoreStatus storeStatus) {
        Store store= storeRepository.findById(id).orElseThrow(()-> new RuntimeException("Store not found"));

        store.setStatus(storeStatus);
        Store updatedStore=storeRepository.save(store);
        return StoreMapper.toDto(updatedStore);
    }
}
