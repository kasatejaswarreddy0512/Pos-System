import GenericCrudPage from "../crud/GenericCrudPage.jsx";

import {
    branchFields,
    schemas,
    tableColumns,
} from "../crud/entityConfigs.jsx";

import { branchService } from "../../services/branchService.js";
import { useAuth } from "../../hooks/useAuth.js";
import { useAppState } from "../../hooks/useAppState.js";

import { ROLES } from "../../constants/roles.js";

const initialValues = {
    name: "",
    address: "",
    phone: "",
    email: "",
    workingDays: [],
    openTime: "09:00",
    closeTime: "21:00",
};

const toNumberOrNull = (value) => {
    if (value === null || value === undefined || value === "") {
        return null;
    }

    return Number(value);
};

const isStoreAdminRole = (role) => {
    return role === ROLES.STORE_ADMIN || role === "ROLE_STORE_ADMIN";
};

export default function BranchesPage() {
    const { user, role } = useAuth();
    const { selectedStoreId } = useAppState();

    const loggedInRole = role || user?.role;

    const isStoreAdmin = isStoreAdminRole(loggedInRole);

    const storeId = toNumberOrNull(
        selectedStoreId ||
        user?.store?.id ||
        user?.storeId
    );

    const loadBranches = () => {
        if (isStoreAdmin) {
            return branchService.getMyStoreBranches();
        }

        if (storeId) {
            return branchService.getByStore(storeId);
        }

        return [];
    };

    const createBranch = (payload) => {
        if (isStoreAdmin) {
            return branchService.create(payload);
        }

        if (!storeId) {
            throw new Error("Store ID is required to create branch.");
        }

        return branchService.create({
            ...payload,
            storeId,
        });
    };

    return (
        <GenericCrudPage
            title="Branch"
            subtitle="Create and manage branches"
            columns={tableColumns.branches}
            fields={branchFields}
            initialValues={initialValues}
            validationSchema={schemas.branch}
            loadData={loadBranches}
            createData={createBranch}
            updateData={branchService.update}
            deleteData={branchService.remove}
        />
    );
}