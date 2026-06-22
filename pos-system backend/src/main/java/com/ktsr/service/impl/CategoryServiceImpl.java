package com.ktsr.service.impl;

import com.ktsr.domain.UserRole;
import com.ktsr.entity.Category;
import com.ktsr.entity.Store;
import com.ktsr.entity.User;
import com.ktsr.exceptions.UserException;
import com.ktsr.mapper.CategoryMapper;
import com.ktsr.payload.DTO.CategoryDto;
import com.ktsr.repository.CategoryRepository;
import com.ktsr.repository.StoreRepository;
import com.ktsr.service.CategoryService;
import com.ktsr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserService userService;
    private final StoreRepository storeRepository;

    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) throws UserException {
        User user = userService.getCurrentUser();

        Store store = getStoreForCurrentUser(categoryDto.getStoreId(), user);

        checkAuthority(user, store);

        Category category = Category.builder()
                .store(store)
                .name(categoryDto.getName())
                .build();

        Category savedCategory = categoryRepository.save(category);

        return CategoryMapper.toDto(savedCategory);
    }

    @Override
    public List<CategoryDto> getCategoriesByStore(Long storeId) {
        List<Category> categories = categoryRepository.findByStoreId(storeId);

        return categories.stream()
                .map(CategoryMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CategoryDto> getCategoriesForCurrentStoreAdmin() throws UserException {
        User user = userService.getCurrentUser();

        Store store = getStoreForCurrentUser(null, user);

        List<Category> categories = categoryRepository.findByStoreId(store.getId());

        return categories.stream()
                .map(CategoryMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryDto updateCategory(Long id, CategoryDto categoryDto) throws UserException {
        Category category = categoryRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Category Not Found...!"));

        User user = userService.getCurrentUser();

        checkAuthority(user, category.getStore());

        category.setName(categoryDto.getName());

        Category updatedCategory = categoryRepository.save(category);

        return CategoryMapper.toDto(updatedCategory);
    }

    @Override
    public void deleteCategory(Long id) throws UserException {
        Category category = categoryRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Category Not Found...!"));

        User user = userService.getCurrentUser();

        checkAuthority(user, category.getStore());

        categoryRepository.delete(category);
    }

    private Store getStoreForCurrentUser(Long storeId, User user) {
        Store store = null;

        if (storeId != null) {
            store = storeRepository.findById(storeId).orElseThrow(
                    () -> new RuntimeException("Store not found with id: " + storeId));
        }

        if (store == null && user.getStore() != null) {
            store = user.getStore();
        }

        if (store == null) {
            store = storeRepository.findByStoreAdminId(user.getId());
        }

        if (store == null) {
            throw new RuntimeException("Store not found for current user");
        }

        return store;
    }

    private void checkAuthority(User user, Store store) {
        boolean isStoreAdmin = user.getRole() == UserRole.ROLE_STORE_ADMIN;
        boolean isStoreManager = user.getRole() == UserRole.ROLE_STORE_MANAGER;

        Long loggedInUserId = user.getId();

        Long storeAdminId = store.getStoreAdmin() != null
                ? store.getStoreAdmin().getId()
                : null;

        boolean isSameStoreAdmin = isStoreAdmin &&
                storeAdminId != null &&
                Objects.equals(loggedInUserId, storeAdminId);

        boolean isSameStoreManager = false;

        if (isStoreManager && user.getStore() != null) {
            isSameStoreManager = Objects.equals(
                    user.getStore().getId(),
                    store.getId()
            );
        }

        if (!isSameStoreAdmin && !isSameStoreManager) {
            throw new RuntimeException("You don't have permission to manage this category...!");
        }
    }
}