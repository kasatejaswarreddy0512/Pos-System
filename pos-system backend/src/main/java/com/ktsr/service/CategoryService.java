package com.ktsr.service;


import com.ktsr.exceptions.UserException;
import com.ktsr.payload.DTO.CategoryDto;

import java.util.List;

public interface CategoryService {

    CategoryDto createCategory( CategoryDto categoryDto) throws UserException;
    List<CategoryDto> getCategoriesByStore(Long storeId);

    CategoryDto updateCategory(Long id, CategoryDto categoryDto) throws UserException;

    void deleteCategory(Long id) throws UserException;
}
