package com.ktsr.mapper;

import com.ktsr.entity.Category;
import com.ktsr.payload.DTO.CategoryDto;

public class CategoryMapper {

    public static CategoryDto toDto(Category category){
        return CategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .storeId(category.getStore() !=null ? category.getStore().getId() : null)
                .build();
    }


}
