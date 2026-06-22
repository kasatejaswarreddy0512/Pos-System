import { useEffect, useMemo, useState } from "react";

import GenericCrudPage from "../crud/GenericCrudPage.jsx";

import {
    productFields,
    schemas,
    tableColumns,
} from "../crud/entityConfigs.jsx";

import { categoryService } from "../../services/categoryService.js";
import { productService } from "../../services/productService.js";

import { useAuth } from "../../hooks/useAuth.js";
import { useAppState } from "../../hooks/useAppState.js";

import { toOptions } from "../../utils/formatters.js";

const initialValues = {
    name: "",
    sku: "",
    description: "",
    mrp: "",
    sellingPrice: "",
    brand: "",
    image: "",
    categoryId: "",
};

export default function ProductsPage() {
    const { user } = useAuth();
    const { selectedStoreId } = useAppState();

    const storeId =
        selectedStoreId ||
        user?.store?.id ||
        user?.storeId;

    const [cats, setCats] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = storeId
                    ? await categoryService.getByStore(storeId)
                    : await categoryService.getMyStoreCategories();

                setCats(data || []);
            } catch (error) {
                console.error("Category Load Error:", error);
                setCats([]);
            }
        };

        loadCategories();
    }, [storeId]);

    const fields = useMemo(
        () => productFields(toOptions(cats)),
        [cats]
    );

    const loadProducts = () => {
        if (storeId) {
            return productService.getByStore(storeId);
        }

        return productService.getMyStoreProducts();
    };

    const normalize = (v) => ({
        ...v,
        mrp: Number(v.mrp),
        sellingPrice: Number(v.sellingPrice),
        storeId: storeId || v.storeId,
        categoryId: Number(v.categoryId || v.category?.id),
    });

    return (
        <GenericCrudPage
            title="Product"
            subtitle="Product management with SKU, category, image and pricing"
            columns={tableColumns.products}
            fields={fields}
            initialValues={initialValues}
            validationSchema={schemas.product}
            loadData={loadProducts}
            createData={productService.create}
            updateData={productService.update}
            deleteData={productService.remove}
            normalizePayload={normalize}
        />
    );
}