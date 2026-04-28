package com.ktsr.service.impl;

import com.ktsr.entity.Category;
import com.ktsr.entity.Product;
import com.ktsr.entity.Store;
import com.ktsr.entity.User;
import com.ktsr.mapper.ProductMapper;
import com.ktsr.payload.DTO.ProductDto;
import com.ktsr.repository.CategoryRepository;
import com.ktsr.repository.ProductRepository;
import com.ktsr.repository.StoreRepository;
import com.ktsr.service.ProductService;
import com.ktsr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final StoreRepository storeRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public ProductDto createProduct(ProductDto productDto, User user) {
        Store store=storeRepository.findById(
                productDto.getStoreId()
        ).orElseThrow(()-> new RuntimeException("Store Not Found"));

        Category category= categoryRepository.findById(productDto.getCategoryId()).orElseThrow(
                ()-> new RuntimeException("Category Not Found...!") );

        Product product=ProductMapper.toEntity(productDto,store, category);
        Product saveProduct=productRepository.save(product);
        return ProductMapper.toDto(saveProduct);
    }

    @Override
    public ProductDto getProductById(Long id) {
        Product product=productRepository.findById(id).orElseThrow(()-> new RuntimeException("Product Not Found"));
        return ProductMapper.toDto(product);
    }

    @Override
    public ProductDto updateProduct(Long id, ProductDto productDto, User user) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));

        if (productDto.getName() != null) {
            product.setName(productDto.getName());
        }

        if (productDto.getBrand() != null) {
            product.setBrand(productDto.getBrand());
        }

        if (productDto.getSku() != null) {
            product.setSku(productDto.getSku());
        }

        if (productDto.getDescription() != null) {
            product.setDescription(productDto.getDescription());
        }

        if (productDto.getMrp() != null) {
            product.setMrp(productDto.getMrp());
        }

        if (productDto.getSellingPrice() != null) {
            product.setSellingPrice(productDto.getSellingPrice());
        }

        if (productDto.getImage() != null) {
            product.setImage(productDto.getImage());
        }

        if (productDto.getCategoryId() != null) {
            Category category = categoryRepository.findById(productDto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category Not Found...!"));

            product.setCategory(category);
        }

        product.setUpdatedAt(LocalDateTime.now());

        Product savedProduct = productRepository.save(product);
        return ProductMapper.toDto(savedProduct);
    }

    @Override
    public List<ProductDto> getProductByStoreId(Long storeId) {

        List<Product> product= productRepository.findByStoreId(storeId);
        return product.stream()
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> searchByKeyword(Long storeId, String keyword) {

        List<Product> product= productRepository.searchByKeyword(storeId, keyword);
        return product.stream()
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteProduct(Long id) {
        Product product=productRepository.findById(id).orElseThrow(()-> new RuntimeException("Product Not Found"));

        productRepository.delete(product);
    }
}
