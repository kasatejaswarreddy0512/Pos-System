import { useEffect, useMemo, useState } from "react";

import GenericCrudPage from "../crud/GenericCrudPage.jsx";
import {
    inventoryFields,
    schemas,
    tableColumns,
} from "../crud/entityConfigs.jsx";

import { branchService } from "../../services/branchService.js";
import { inventoryService } from "../../services/inventoryService.js";
import { productService } from "../../services/productService.js";

import { useAppState } from "../../hooks/useAppState.js";
import { useAuth } from "../../hooks/useAuth.js";
import { toOptions } from "../../utils/formatters.js";

export default function InventoryPage() {
    const { user } = useAuth();

    const { selectedBranchId, selectedStoreId } = useAppState();

    const branchId =
        selectedBranchId ||
        user?.branch?.id ||
        user?.branchId;

    const storeId =
        selectedStoreId ||
        user?.store?.id ||
        user?.storeId;

    const [branches, setBranches] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!storeId) {
            if (user?.branch?.id) {
                setBranches([user.branch]);
            } else {
                setBranches([]);
            }

            setProducts([]);
            return;
        }

        branchService
            .getByStore(storeId)
            .then(setBranches)
            .catch(() => {
                if (user?.branch?.id) {
                    setBranches([user.branch]);
                } else {
                    setBranches([]);
                }
            });

        productService
            .getByStore(storeId)
            .then(setProducts)
            .catch(() => setProducts([]));
    }, [storeId, user]);

    const branchNameMap = useMemo(() => {
        const map = {};

        branches.forEach((branch) => {
            map[branch.id] = branch.name;
        });

        return map;
    }, [branches]);

    const currentBranchName =
        user?.branch?.name ||
        user?.branchName ||
        branchNameMap[branchId] ||
        "-";

    const fields = useMemo(
        () =>
            inventoryFields(
                toOptions(branches),
                toOptions(products)
            ),
        [branches, products]
    );

    const loadInventoryData = async () => {
        if (!branchId) return [];

        const data = await inventoryService.getByBranch(branchId);

        return data.map((item) => {
            const itemBranchId =
                item.branch?.id ||
                item.branchId ||
                branchId;

            return {
                ...item,
                branchId: itemBranchId,
                branchName:
                    item.branch?.name ||
                    item.branchName ||
                    branchNameMap[itemBranchId] ||
                    currentBranchName,
            };
        });
    };

    return (
        <GenericCrudPage
            key={`${branchId}-${branches.length}`}
            title="Inventory"
            subtitle="Branch-wise stock quantity"
            columns={tableColumns.inventory}
            fields={fields}
            initialValues={{
                branchId: branchId || "",
                productId: "",
                quantity: 0,
            }}
            validationSchema={schemas.inventory}
            loadData={loadInventoryData}
            createData={(p) =>
                inventoryService.create({
                    ...p,
                    branchId: Number(p.branchId || branchId),
                    productId: Number(p.productId),
                    quantity: Number(p.quantity),
                })
            }
            updateData={(id, p) =>
                inventoryService.update(id, {
                    ...p,
                    branchId: Number(p.branchId || branchId),
                    productId: Number(p.productId),
                    quantity: Number(p.quantity),
                })
            }
            deleteData={inventoryService.remove}
        />
    );
}