package com.ktsr.service;

import com.ktsr.entity.User;
import com.ktsr.payload.DTO.ProductDto;

import java.util.List;

public interface ProductService {

    ProductDto createProduct(ProductDto productDto, User user);

    ProductDto getProductById(Long id);

    ProductDto updateProduct(Long id, ProductDto productDto, User user);
    List<ProductDto> getProductByStoreId( Long storeId);

    List<ProductDto> getProductsForCurrentStoreAdmin(User user);

    List<ProductDto> searchByKeyword(Long storeId,String keyword);

    void deleteProduct(Long id);
}
