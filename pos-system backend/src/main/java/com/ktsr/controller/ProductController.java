package com.ktsr.controller;

import com.ktsr.entity.User;
import com.ktsr.exceptions.UserException;
import com.ktsr.payload.DTO.ProductDto;
import com.ktsr.payload.response.ApiResponse;
import com.ktsr.service.ProductService;
import com.ktsr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto,
                                                    @RequestHeader("Authorization") String jwt) throws UserException {
        User user = userService.getUserFromJwtToken(jwt);
        return new ResponseEntity<>(productService.createProduct(productDto, user), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id,
                                                     @RequestHeader("Authorization") String jwt) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/my-store")
    public ResponseEntity<List<ProductDto>> getMyStoreProducts(
            @RequestHeader("Authorization") String jwt
    ) throws UserException {

        User user = userService.getUserFromJwtToken(jwt);

        return ResponseEntity.ok(
                productService.getProductsForCurrentStoreAdmin(user)
        );
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<ProductDto>> getProductByStoreId(@PathVariable Long storeId,
                                                                @RequestHeader("Authorization") String jwt) {
        return ResponseEntity.ok(productService.getProductByStoreId(storeId));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long id,
                                                    @RequestBody ProductDto productDto,
                                                    @RequestHeader("Authorization") String jwt) throws UserException {
        User user = userService.getUserFromJwtToken(jwt);
        return new ResponseEntity<>(productService.updateProduct(id, productDto, user), HttpStatus.CREATED);
    }

    @GetMapping("/store/{storeId}/search")
    public ResponseEntity<List<ProductDto>> searchByKeyword(@PathVariable Long storeId,
                                                            @RequestParam String keyword,
                                                            @RequestHeader("Authorization") String jwt) {
        return ResponseEntity.ok(productService.searchByKeyword(storeId, keyword));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProductById(@PathVariable Long id,
                                                         @RequestHeader("Authorization") String jwt) {
        productService.deleteProduct(id);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Product Deleted Successfully...!");
        return ResponseEntity.ok(apiResponse);
    }

}
