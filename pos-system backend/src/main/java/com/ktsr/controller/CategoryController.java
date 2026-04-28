package com.ktsr.controller;

import com.ktsr.exceptions.UserException;
import com.ktsr.payload.DTO.CategoryDto;
import com.ktsr.payload.response.ApiResponse;
import com.ktsr.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryDto> createCategory(@RequestBody CategoryDto categoryDto) throws UserException {
        return  new ResponseEntity<>(categoryService.createCategory(categoryDto), HttpStatus.CREATED);
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<CategoryDto>> getCategoriesByStore(@PathVariable Long storeId){
        return ResponseEntity.ok(categoryService.getCategoriesByStore(storeId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDto> updateCategory(@PathVariable Long id, @RequestBody CategoryDto categoryDto) throws UserException {
        return ResponseEntity.ok(categoryService.updateCategory(id,categoryDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCategory(@PathVariable Long id) throws UserException {
        categoryService.deleteCategory(id);
        ApiResponse apiResponse= new ApiResponse();
        apiResponse.setMessage("Category Deleted Successfully...!");
        return ResponseEntity.ok(apiResponse);
    }

}
