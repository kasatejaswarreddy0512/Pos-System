import GenericCrudPage from "../crud/GenericCrudPage.jsx";

import {
    categoryFields,
    schemas,
    tableColumns,
} from "../crud/entityConfigs.jsx";

import { categoryService } from "../../services/categoryService.js";
import { useAuth } from "../../hooks/useAuth.js";
import { useAppState } from "../../hooks/useAppState.js";

import { ROLES } from "../../constants/roles.js";

const toNumberOrNull = (value) => {
    if (value === null || value === undefined || value === "") {
        return null;
    }

    const num = Number(value);
    return Number.isNaN(num) ? null : num;
};

const isStoreAdminRole = (role) => {
    return role === ROLES.STORE_ADMIN || role === "ROLE_STORE_ADMIN";
};

export default function CategoriesPage() {
    const { user, role } = useAuth();
    const { selectedStoreId } = useAppState();

    const loggedInRole = role || user?.role;

    const isStoreAdmin = isStoreAdminRole(loggedInRole);

    const storeId = toNumberOrNull(
        selectedStoreId ||
        user?.store?.id ||
        user?.storeId
    );

    const loadCategories = () => {
        if (isStoreAdmin) {
            return categoryService.getMyStoreCategories();
        }

        if (storeId) {
            return categoryService.getByStore(storeId);
        }

        return [];
    };

    const createCategory = (payload) => {
        if (isStoreAdmin) {
            return categoryService.create(payload);
        }

        if (!storeId) {
            throw new Error("Store ID is required to create category.");
        }

        return categoryService.create({
            ...payload,
            storeId,
        });
    };

    return (
        <GenericCrudPage
            title="Category"
            subtitle="Manage product categories"
            columns={tableColumns.categories}
            fields={categoryFields}
            initialValues={{ name: "" }}
            validationSchema={schemas.category}
            loadData={loadCategories}
            createData={createCategory}
            updateData={categoryService.update}
            deleteData={categoryService.remove}
        />
    );
}